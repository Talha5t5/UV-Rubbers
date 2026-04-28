import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import User from "@/lib/models/User";
import SiteSettings from "@/lib/models/SiteSettings";
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

        // Get all products to compute stock stats
        const allProducts = await Product.find().lean() as any[];

        let totalStockUnits = 0;
        let lowStockProducts: any[] = [];
        let totalCatalogValue = 0;

        allProducts.forEach((product: any) => {
            const stock = product.stock || 0;
            const price = product.price || 0;
            totalStockUnits += stock;
            totalCatalogValue += price * stock;

            if (stock <= 10) {
                lowStockProducts.push({
                    productName: product.name,
                    stock,
                    sku: product.sku || "",
                });
            }
        });

        // Users stats
        const totalUsers = await User.countDocuments();

        // Recent products (last 5 added)
        const recentProducts = await Product.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select("name slug category heroImage sku price salePrice stock isActive createdAt")
            .lean();

        // Site settings (sale)
        const siteSettings = await SiteSettings.findOne({ key: "global" }).lean() as any;
        const settings = siteSettings ?? {
            globalSaleActive: false,
            globalSalePercent: 0,
            globalSaleLabel: "",
        };

        return NextResponse.json({
            products: {
                total: totalProducts,
                active: activeProducts,
                inactive: inactiveProducts,
            },
            stock: {
                totalUnits: totalStockUnits,
                lowStockProducts: lowStockProducts.slice(0, 10),
            },
            catalogValue: totalCatalogValue,
            users: {
                total: totalUsers,
            },
            recentProducts: recentProducts.map((p: any) => ({
                ...p,
                _id: p._id.toString(),
            })),
            settings,
        });
    } catch (error: any) {
        console.error("Stats error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
