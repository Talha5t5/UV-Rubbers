import ProductForm from "@/components/admin/ProductForm";
import dbConnect from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await dbConnect();

    // Use lean() to get a plain JSON object and manually serialize the _id
    let product = await Product.findById(id).lean();

    if (!product) {
        notFound();
    }

    // Next.js Server Components require plain objects passed to Client Components
    const serializedProduct = JSON.parse(JSON.stringify(product));

    return <ProductForm initialData={serializedProduct} />;
}
