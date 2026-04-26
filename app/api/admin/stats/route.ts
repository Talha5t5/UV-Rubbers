import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import User from "@/lib/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session as any).user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        // Products stats
        const totalProducts = await Product.countDocuments();
        const activeProducts = await Product.countDocuments({ isActive: true });
        const inactiveProducts = totalProducts - activeProducts;

        // Get all products to compute variant & stock stats
        const allProducts = await Product.find().lean() as any[];

        let totalVariants = 0;
        let totalStockUnits = 0;
        let lowStockVariants: any[] = [];
        let totalCatalogValue = 0;

        allProducts.forEach((product: any) => {
            if (product.variants && Array.isArray(product.variants)) {
                product.variants.forEach((v: any) => {
                    totalVariants++;
                    totalStockUnits += v.stock || 0;
                    totalCatalogValue += (v.price || 0) * (v.stock || 0);

                    if ((v.stock || 0) <= 10) {
                        lowStockVariants.push({
                            productName: product.name,
                            variantName: v.name,
                            stock: v.stock || 0,
                            sku: v.sku,
                        });
                    }
                });
            }
        });

        // Users stats
        const totalUsers = await User.countDocuments();

        // Recent products (last 5 added)
        const recentProducts = await Product.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select("name slug category heroImage variants isActive createdAt")
            .lean();

        return NextResponse.json({
            products: {
                total: totalProducts,
                active: activeProducts,
                inactive: inactiveProducts,
            },
            variants: {
                total: totalVariants,
            },
            stock: {
                totalUnits: totalStockUnits,
                lowStockVariants: lowStockVariants.slice(0, 10),
            },
            catalogValue: totalCatalogValue,
            users: {
                total: totalUsers,
            },
            recentProducts: recentProducts.map((p: any) => ({
                ...p,
                _id: p._id.toString(),
            })),
        });
    } catch (error: any) {
        console.error("Stats error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
