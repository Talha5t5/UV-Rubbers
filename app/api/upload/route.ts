import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session as any).user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file received." }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize filename and add timestamp to avoid overwrites
        const originalName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
        const filename = `${Date.now()}-${originalName}`;

        // Save to public/uploads directory
        const uploadDir = path.join(process.cwd(), "public/uploads");
        const filePath = path.join(uploadDir, filename);

        await writeFile(filePath, buffer);

        // Return the public URL to the file
        return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 });
    } catch (error: any) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Error uploading file" }, { status: 500 });
    }
}
