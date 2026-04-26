"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Users, ShoppingCart, TrendingUp, Package, AlertTriangle, Loader2, ArrowRight, Layers } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

    useEffect(() => {
        if (status === "authenticated") {
            fetch("/api/admin/stats")
                .then(res => res.json())
                .then(data => {
                    setStats(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch stats:", err);
                    setLoading(false);
                });
        }
    }, [status]);

    if (status === "loading" || !session) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
            </div>
        );
    }

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(val);

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fadeInUp">
            <div>
                <h1 className="text-4xl font-black text-dark uppercase tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground mt-2 font-medium">Welcome back, {session.user?.name}. Here's what's happening today.</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-brand" />
                </div>
            ) : stats ? (
                <>
                    {/* STAT CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex flex-col pt-8 relative overflow-hidden group">
                            <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Box className="w-6 h-6" />
                            </div>
                            <div className="text-3xl font-black text-dark tracking-tight">{stats.products.active}</div>
                            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Active Products</div>
                            <div className="absolute top-6 right-6 text-xs font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-full">
                                {stats.products.total} total
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex flex-col pt-8 relative overflow-hidden group">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Layers className="w-6 h-6" />
                            </div>
                            <div className="text-3xl font-black text-dark tracking-tight">{stats.variants.total}</div>
                            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Total Variants</div>
                            <div className="absolute top-6 right-6 text-xs font-bold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-full">
                                SKUs
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex flex-col pt-8 relative overflow-hidden group">
                            <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Package className="w-6 h-6" />
                            </div>
                            <div className="text-3xl font-black text-dark tracking-tight">{stats.stock.totalUnits.toLocaleString()}</div>
                            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Total Stock Units</div>
                            <div className="absolute top-6 right-6 text-xs font-bold text-green-500 bg-green-50 px-2.5 py-1 rounded-full">
                                {formatCurrency(stats.catalogValue)}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex flex-col pt-8 relative overflow-hidden group">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6" />
                            </div>
                            <div className="text-3xl font-black text-dark tracking-tight">{stats.users.total}</div>
                            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Admin Users</div>
                            <div className="absolute top-6 right-6 text-xs font-bold text-purple-500 bg-purple-50 px-2.5 py-1 rounded-full">
                                Active
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* RECENT PRODUCTS */}
                        <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-black uppercase tracking-tight">Recent Products</h2>
                                <Button asChild variant="outline" size="sm" className="rounded-xl text-[10px] font-bold uppercase tracking-widest border-brand text-brand hover:bg-brand/5">
                                    <Link href="/admin/products">
                                        View All <ArrowRight className="w-3 h-3 ml-1" />
                                    </Link>
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {stats.recentProducts && stats.recentProducts.length > 0 ? (
                                    stats.recentProducts.map((product: any) => (
                                        <div key={product._id} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-brand/20 transition-colors">
                                            <div className="w-12 h-12 rounded-xl bg-gray-200 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                                                {product.heroImage ? (
                                                    <img src={product.heroImage} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Box className="w-5 h-5 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-bold text-dark text-sm truncate">{product.name}</div>
                                                <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                                                    {product.category} · {product.variants?.length || 0} variants
                                                </div>
                                            </div>
                                            <div>
                                                {product.isActive ? (
                                                    <span className="bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">Active</span>
                                                ) : (
                                                    <span className="bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">Hidden</span>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground font-medium text-sm text-center py-6">No products yet. Add your first product!</p>
                                )}
                            </div>
                        </div>

                        {/* LOW STOCK ALERTS */}
                        <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-black uppercase tracking-tight">Low Stock Alerts</h2>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                                    ≤ 10 units
                                </div>
                            </div>
                            <div className="space-y-3">
                                {stats.stock.lowStockVariants && stats.stock.lowStockVariants.length > 0 ? (
                                    stats.stock.lowStockVariants.map((item: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-amber-50/50 border border-amber-100 hover:border-amber-200 transition-colors">
                                            <div className="min-w-0 flex-1">
                                                <div className="font-bold text-dark text-sm truncate">{item.variantName}</div>
                                                <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest truncate">
                                                    {item.productName} · SKU: {item.sku}
                                                </div>
                                            </div>
                                            <div className={`text-sm font-black px-3 py-1 rounded-full ${item.stock === 0 ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                                                {item.stock === 0 ? "OUT" : `${item.stock} left`}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 space-y-2">
                                        <div className="w-12 h-12 mx-auto rounded-full bg-green-50 flex items-center justify-center">
                                            <Package className="w-6 h-6 text-green-500" />
                                        </div>
                                        <p className="text-green-600 font-bold text-sm">All stock levels are healthy!</p>
                                        <p className="text-muted-foreground text-xs">No variants are below the 10-unit threshold.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100 mt-8">
                    <p className="text-red-500 font-medium text-sm">Failed to load dashboard data. Please refresh the page.</p>
                </div>
            )}
        </div>
    );
}
