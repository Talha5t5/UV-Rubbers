"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function ProductForm({ initialData = null }: { initialData?: any }) {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        slug: initialData?.slug || "",
        name: initialData?.name || "",
        category: initialData?.category || "Seal Kits",
        tagline: initialData?.tagline || "",
        summary: initialData?.summary || "",
        description: initialData?.description || "",
        heroImage: initialData?.heroImage || "",
        sku: initialData?.sku || "",
        price: initialData?.price ?? 0,
        stock: initialData?.stock ?? 0,
        size: initialData?.size || "",
        quantityLabel: initialData?.quantityLabel || "",
        barcode: initialData?.barcode || "",
        warranty: initialData?.warranty || "",
        salePrice: initialData?.salePrice ?? null,
        isActive: initialData?.isActive ?? true,
    });

    const uploadImage = async (file: File) => {
        const data = new FormData();
        data.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: data,
        });

        if (!res.ok) throw new Error("Upload failed");

        const resData = await res.json();
        return resData.url;
    };

    const handleHeroImageUpload = async (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            setLoading(true);
            const url = await uploadImage(file);
            setFormData(prev => ({ ...prev, heroImage: url }));
            toast({ title: "Success", description: "Image uploaded successfully!" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to upload image", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const isEditing = !!initialData;
            const url = isEditing ? `/api/products/${initialData._id}` : `/api/products`;
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to save product");

            toast({ title: "Success", description: "Product saved successfully!" });
            router.push("/admin/products");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: "There was an error saving the product." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button asChild variant="outline" size="icon" className="rounded-xl border-gray-200">
                        <Link href="/admin/products"><ArrowLeft className="w-5 h-5" /></Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-black text-dark uppercase tracking-tight">
                            {initialData ? "Edit Product" : "New Product"}
                        </h1>
                    </div>
                </div>
                <Button disabled={loading} type="submit" className="bg-brand hover:bg-brand-dark text-white rounded-xl h-12 px-8 font-bold uppercase tracking-widest text-xs shadow-brand flex items-center gap-2">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Product
                </Button>
            </div>

            <div className="grid md:grid-cols-[2fr_1fr] gap-8">
                <div className="space-y-8">
                    {/* Basic Info */}
                    <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100 space-y-6">
                        <h2 className="text-xl font-black uppercase tracking-tight">Basic Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Product Name</label>
                                <Input required name="name" value={formData.name} onChange={handleChange} className="h-12 bg-gray-50 border-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">URL Slug</label>
                                <Input required name="slug" value={formData.slug} onChange={handleChange} className="h-12 bg-gray-50 border-gray-200" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tagline (Optional)</label>
                            <Input name="tagline" value={formData.tagline} onChange={handleChange} className="h-12 bg-gray-50 border-gray-200" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Summary</label>
                            <Textarea required name="summary" value={formData.summary} onChange={handleChange} className="bg-gray-50 border-gray-200 min-h-[100px]" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Description</label>
                            <Textarea name="description" value={formData.description} onChange={handleChange} className="bg-gray-50 border-gray-200 min-h-[150px]" />
                        </div>
                    </div>

                    {/* Pricing & Stock */}
                    <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100 space-y-6">
                        <h2 className="text-xl font-black uppercase tracking-tight">Pricing & Stock</h2>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Original Price (AUD)</label>
                                <Input required type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="h-12 bg-gray-50 border-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Sale Price (Optional)</label>
                                <Input type="number" step="0.01" name="salePrice" value={formData.salePrice || ''} onChange={(e) => setFormData(prev => ({ ...prev, salePrice: e.target.value ? parseFloat(e.target.value) : null }))} className="h-12 bg-orange-50 border-orange-200 text-orange-900 font-bold" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Stock Qty</label>
                                <Input type="number" name="stock" value={formData.stock} onChange={handleChange} className="h-12 bg-gray-50 border-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">SKU Code</label>
                                <Input name="sku" value={formData.sku} onChange={handleChange} className="h-12 bg-gray-50 border-gray-200" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Size / Dimensions</label>
                                <Input name="size" value={formData.size} onChange={handleChange} className="h-12 bg-gray-50 border-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Quantity Label</label>
                                <Input name="quantityLabel" value={formData.quantityLabel} onChange={handleChange} className="h-12 bg-gray-50 border-gray-200" placeholder="e.g. x 1 kit" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Barcode</label>
                                <Input name="barcode" value={formData.barcode} onChange={handleChange} className="h-12 bg-gray-50 border-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Warranty</label>
                                <Input name="warranty" value={formData.warranty} onChange={handleChange} className="h-12 bg-gray-50 border-gray-200" placeholder="e.g. 25 Years" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Organisation */}
                    <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100 space-y-6">
                        <h2 className="text-xl font-black uppercase tracking-tight">Organization</h2>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 font-bold text-sm outline-none focus:ring-2 focus:ring-brand"
                            >
                                <option value="Seal Kits">Seal Kits</option>
                                <option value="Pipes & Cables">Pipes & Cables</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleChange}
                                id="isActive"
                                className="w-5 h-5 text-brand rounded focus:ring-brand border-gray-300"
                            />
                            <label htmlFor="isActive" className="text-sm font-bold text-dark cursor-pointer">
                                Product is Active (Visible to everyone)
                            </label>
                        </div>
                    </div>

                    {/* Media */}
                    <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100 space-y-6">
                        <h2 className="text-xl font-black uppercase tracking-tight">Media</h2>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Product Image</label>
                            <div className="flex gap-4">
                                <Input name="heroImage" value={formData.heroImage} onChange={handleChange} className="h-12 flex-1 bg-gray-50 border-gray-200" placeholder="/products/uv5001.jpg" />
                                <div className="relative w-32">
                                    <Input type="file" accept="image/*" onChange={handleHeroImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                    <Button type="button" variant="outline" className="w-full h-12 bg-white">Upload File</Button>
                                </div>
                            </div>
                            {formData.heroImage && (
                                <div className="mt-4 aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 w-64 h-auto">
                                    <img src={formData.heroImage} className="w-full h-full object-cover" alt="Preview" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
