"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Users, ShoppingCart, TrendingUp, Package, AlertTriangle, Loader2, ArrowRight, Layers, Percent, Tag, Sparkles, Save } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [savingSettings, setSavingSettings] = useState(false);
    const [saleSettings, setSaleSettings] = useState({
        globalSaleActive: false,
        globalSalePercent: 0,
        globalSaleLabel: ""
    });

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
                    if (data.settings) {
                        setSaleSettings({
                            globalSaleActive: data.settings.globalSaleActive,
                            globalSalePercent: data.settings.globalSalePercent,
                            globalSaleLabel: data.settings.globalSaleLabel || ""
                        });
                    }
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

    const handleUpdateSaleSettings = async () => {
        try {
            setSavingSettings(true);
            const res = await fetch("/api/admin/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(saleSettings),
            });

            if (!res.ok) throw new Error("Failed to update settings");

            const updated = await res.json();
            setStats((prev: any) => ({ ...prev, settings: updated }));
            toast({ title: "Success", description: "Sale settings updated successfully!" });
        } catch (error) {
            toast({ title: "Error", description: "There was an error updating settings.", variant: "destructive" });
        } finally {
            setSavingSettings(false);
        }
    };

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
                    {/* SALE BANNER */}
                    {stats.settings?.globalSaleActive && (
                        <div className="bg-brand rounded-[2rem] p-8 text-white relative overflow-hidden shadow-brand-lg animate-pulse-slow">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />
                            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                                        <Sparkles className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Storewide Event Active</div>
                                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                                            {stats.settings.globalSaleLabel || "Mega Sale"} is LIVE!
                                        </h2>
                                        <p className="text-sm font-bold opacity-90">Customer sees {stats.settings.globalSalePercent}% OFF across the entire catalogue.</p>
                                    </div>
                                </div>
                                <div className="bg-white text-brand px-10 py-4 rounded-2xl font-black text-2xl uppercase shadow-xl tracking-tighter">
                                    {stats.settings.globalSalePercent}% OFF
                                </div>
                            </div>
                        </div>
                    )}
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
                            <div className="text-3xl font-black text-dark tracking-tight">{stats.products.total}</div>
                            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Total Products</div>
                            <div className="absolute top-6 right-6 text-xs font-bold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-full">
                                Catalogue
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

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-8">
                        {/* RECENT PRODUCTS */}
                        <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100">
                            {/* ... Content ... */}
                        </div>

                        {/* GLOBAL SALE SETTINGS */}
                        <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100 flex flex-col h-fit sticky top-28">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                                    <Tag className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-black uppercase tracking-tight">Global Sale</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <div className="space-y-1">
                                        <div className="text-xs font-black uppercase tracking-wider text-dark">Activate Sale</div>
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase">Enable discount site-wide</div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={saleSettings.globalSaleActive}
                                            onChange={(e) => setSaleSettings(prev => ({ ...prev, globalSaleActive: e.target.checked }))}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                                    </label>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Sale Percentage (%)</label>
                                    <div className="relative">
                                        <Percent className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            type="number"
                                            value={saleSettings.globalSalePercent || ''}
                                            onChange={(e) => setSaleSettings(prev => ({ ...prev, globalSalePercent: parseInt(e.target.value) || 0 }))}
                                            className="pl-12 h-14 bg-gray-50 border-gray-200 rounded-xl font-black text-lg"
                                            placeholder="20"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Sale Label (Optional)</label>
                                    <Input
                                        value={saleSettings.globalSaleLabel}
                                        onChange={(e) => setSaleSettings(prev => ({ ...prev, globalSaleLabel: e.target.value }))}
                                        className="h-14 bg-gray-50 border-gray-200 rounded-xl font-bold text-sm"
                                        placeholder="e.g. FLASH SALE, WINTER DEAL"
                                    />
                                </div>

                                <Button
                                    className="w-full h-14 rounded-2xl bg-dark hover:bg-black text-white font-black uppercase tracking-widest text-xs shadow-lg mt-4 flex items-center gap-2"
                                    onClick={handleUpdateSaleSettings}
                                    disabled={savingSettings}
                                >
                                    {savingSettings ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Save className="w-4 h-4" />}
                                    Save Sale Configuration
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* RECENT PRODUCTS (moved below) */}
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
                                                    {product.category}{product.sku ? ` · SKU: ${product.sku}` : ""}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {product.salePrice && <span className="bg-orange-100 text-orange-700 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">Sale</span>}
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
                            {/* ... Content ... */}
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
