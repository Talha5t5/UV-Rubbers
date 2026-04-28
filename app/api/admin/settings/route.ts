import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SiteSettings from "@/lib/models/SiteSettings";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// GET — returns current settings (public — needed for product pages)
export async function GET() {
    try {
        await dbConnect();
        const settings = await (SiteSettings as any).findOne({ key: "global" }).lean();
        if (!settings) {
            // Return defaults if no settings doc exists yet
            return NextResponse.json({
                globalSaleActive: false,
                globalSalePercent: 0,
                globalSaleLabel: "",
            });
        }
        return NextResponse.json(settings);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT — update settings (admin only)
export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session as any).user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const data = await req.json();

        const settings = await (SiteSettings as any).findOneAndUpdate(
            { key: "global" },
            {
                $set: {
                    globalSaleActive: data.globalSaleActive,
                    globalSalePercent: data.globalSalePercent,
                    globalSaleLabel: data.globalSaleLabel || "",
                },
            },
            { upsert: true, new: true }
        );

        return NextResponse.json(settings);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
