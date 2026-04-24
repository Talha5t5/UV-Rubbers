"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit3, Trash2, Loader2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { formatCurrency } from "@/components/uvrubbers/productData";

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (e) {
            console.error("Failed to fetch products", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete ${name}?`)) return;
        try {
            const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchProducts(); // refresh
            } else {
                alert("Failed to delete product.");
            }
        } catch (e) {
            console.error(e);
            alert("Error deleting product.");
        }
    };

    const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fadeInUp">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black text-dark uppercase tracking-tight">Products Menu</h1>
                    <p className="text-muted-foreground mt-2 font-medium">Manage your catalog, stock levels, and variants.</p>
                </div>
                <Button className="bg-brand hover:bg-brand-dark text-white rounded-xl h-12 shadow-brand flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    <span className="font-bold uppercase tracking-widest text-[11px]">Add Product</span>
                </Button>
            </div>

            <div className="bg-white rounded-3xl shadow-soft border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="pl-12 bg-white border-gray-200 rounded-xl"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="flex justify-center items-center p-20 text-brand">
                            <Loader2 className="w-8 h-8 animate-spin" />
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-[10px] uppercase tracking-widest font-black text-muted-foreground">
                                    <th className="p-4 pl-6">Product Image</th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Variants</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right pr-6">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filtered.map(product => (
                                    <tr key={product._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4 pl-6">
                                            <div className="w-16 h-16 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                                                {product.heroImage ? (
                                                    <img src={product.heroImage} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Package className="w-6 h-6 text-gray-300" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-dark">{product.name}</div>
                                            <div className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">{product.slug}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">{product.category}</span>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm font-bold">{product.variants?.length || 0}</div>
                                        </td>
                                        <td className="p-4">
                                            {product.isActive ? (
                                                <span className="bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">Active</span>
                                            ) : (
                                                <span className="bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">Hidden</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right pr-6 space-x-2">
                                            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg text-brand border-brand/20 hover:bg-brand/10">
                                                <Edit3 className="w-4 h-4" />
                                            </Button>
                                            <Button onClick={() => handleDelete(product._id, product.name)} variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg text-red-500 border-red-200 hover:bg-red-50">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="p-10 text-center text-muted-foreground font-medium">
                                            No products found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
