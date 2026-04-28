"use client";

import { Minus, Plus, ShoppingBag, Star, ArrowLeft, ShieldCheck, Award, Truck } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { formatCurrency } from "@/components/uvrubbers/productData";
import SiteFooter from "@/components/uvrubbers/SiteFooter";
import SiteHeader from "@/components/uvrubbers/SiteHeader";
import { useStore } from "@/components/uvrubbers/StoreContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const [product, setProduct] = useState<any>(null);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState<any>(null);
    const { addItem } = useStore();
    const { toast } = useToast();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const loadPageData = async () => {
            try {
                const [productsRes, settingsRes] = await Promise.all([
                    fetch("/api/products?activeOnly=true"),
                    fetch("/api/admin/settings")
                ]);

                const products = await productsRes.json();
                const siteSettings = await settingsRes.json();

                setSettings(siteSettings);
                const found = products.find((p: any) => p.slug === slug);
                setProduct(found);

                if (found) {
                    setRelatedProducts(products.filter((p: any) => p.slug !== slug).slice(0, 2));
                }
                setLoading(false);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        };

        loadPageData();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="text-center space-y-6">
                    <div className="text-8xl font-black text-brand/10">404</div>
                    <h1 className="text-4xl font-black uppercase tracking-tight">Product Not Found</h1>
                    <Button asChild className="rounded-full bg-brand hover:bg-brand-dark px-10 h-14 font-black uppercase tracking-widest">
                        <Link href="/products">Back to Products</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const getEffectivePrice = (prod: any) => {
        if (!prod) return 0;
        let basePrice = prod.price;

        // Priority 1: Per-product sale price
        if (prod.salePrice && prod.salePrice > 0) {
            return prod.salePrice;
        }

        // Priority 2: Global sale
        if (settings?.globalSaleActive && settings?.globalSalePercent > 0) {
            return basePrice * (1 - settings.globalSalePercent / 100);
        }

        return basePrice;
    };

    const effectivePrice = getEffectivePrice(product);
    const isSale = effectivePrice < product?.price;

    const handleAddToCart = () => {
        addItem({
            productSlug: product.slug,
            productName: product.name,
            sku: product.sku || "",
            price: effectivePrice,
            image: product.heroImage || "",
            quantity,
        });

        toast({
            title: isSale ? "Sale item added!" : "Added to cart",
            description: `${product.name} has been added to your order list.`,
        });
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SiteHeader />
            <main>
                {/* PRODUCT HERO / DETAIL */}
                <section className="py-24 bg-white relative overflow-hidden">
                    <div className="container px-6">
                        {/* BREADCRUMB */}
                        <div className="flex items-center gap-2 mb-12 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                            <Link href="/products" className="hover:text-brand transition-colors">Products</Link>
                            <span className="opacity-30">›</span>
                            <span className="text-brand">{product.category}</span>
                            <span className="opacity-30">›</span>
                            <span className="text-dark line-clamp-1">{product.name}</span>
                        </div>

                        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-16 items-start">
                            {/* IMAGE SIDE */}
                            <div className="space-y-8 sticky top-[160px]">
                                <div className="group relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-border aspect-[4/3] bg-muted/20">
                                    {product.heroImage ? (
                                        <img
                                            src={product.heroImage}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                                            <ShoppingBag className="w-16 h-16" />
                                        </div>
                                    )}
                                    <div className="absolute top-8 left-8 flex flex-col gap-2">
                                        <Badge className="bg-brand text-white font-black uppercase tracking-[0.2em] text-xs px-5 py-2 rounded-full shadow-brand border-none">
                                            {product.category}
                                        </Badge>
                                        {isSale && (
                                            <Badge className="bg-orange-600 text-white font-black uppercase tracking-widest text-[10px] px-4 py-1.5 rounded-full shadow-xl border-none animate-bounce-slow">
                                                {settings?.globalSaleActive ? `${settings.globalSalePercent}% OFF` : 'SALE'}
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                                    <div className="text-center space-y-2">
                                        <div className="w-12 h-12 rounded-full bg-brand/5 mx-auto flex items-center justify-center text-brand">
                                            <ShieldCheck className="w-6 h-6" />
                                        </div>
                                        <div className="text-[10px] font-black uppercase tracking-widest leading-none">VBA Approved</div>
                                    </div>
                                    <div className="text-center space-y-2">
                                        <div className="w-12 h-12 rounded-full bg-brand/5 mx-auto flex items-center justify-center text-brand">
                                            <Award className="w-6 h-6" />
                                        </div>
                                        <div className="text-[10px] font-black uppercase tracking-widest leading-none">BAL Rated</div>
                                    </div>
                                    <div className="text-center space-y-2">
                                        <div className="w-12 h-12 rounded-full bg-brand/5 mx-auto flex items-center justify-center text-brand">
                                            <Truck className="w-6 h-6" />
                                        </div>
                                        <div className="text-[10px] font-black uppercase tracking-widest leading-none">Fast Shipping</div>
                                    </div>
                                </div>
                            </div>

                            {/* INFO SIDE */}
                            <div className="space-y-10">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        {product.sku && (
                                            <div className="text-[10px] font-black tracking-[0.2em] text-brand uppercase opacity-60 bg-brand/5 px-3 py-1 rounded-full border border-brand/10">SKU: {product.sku}</div>
                                        )}
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3 h-3 fill-brand text-brand" />)}
                                        </div>
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">(25+ Reviews)</span>
                                    </div>

                                    <h1 className="text-4xl md:text-6xl font-black text-dark tracking-tighter uppercase leading-[0.9]">{product.name}</h1>
                                    {product.tagline && <p className="text-xl font-bold text-brand">{product.tagline}</p>}
                                    <p className="text-lg text-muted-foreground leading-relaxed font-medium">{product.description || product.summary}</p>
                                </div>

                                <div className="bg-secondary/50 rounded-[2.5rem] p-10 space-y-8 border border-border shadow-sm">
                                    {/* Quantity selector */}
                                    <div className="space-y-3">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-dark/60 ml-4">Quantity</label>
                                        <div className="flex h-14 items-center rounded-full border border-border bg-white shadow-sm overflow-hidden w-fit">
                                            <button
                                                type="button"
                                                className="w-14 h-full flex items-center justify-center hover:bg-brand/5 group border-r border-border transition-colors"
                                                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                                            >
                                                <Minus className="w-4 h-4 text-dark/40 group-hover:text-brand transition-colors" />
                                            </button>
                                            <div className="w-16 text-center text-sm font-black text-dark">{quantity}</div>
                                            <button
                                                type="button"
                                                className="w-14 h-full flex items-center justify-center hover:bg-brand/5 group border-l border-border transition-colors"
                                                onClick={() => setQuantity((value) => value + 1)}
                                            >
                                                <Plus className="w-4 h-4 text-dark/40 group-hover:text-brand transition-colors" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-8 pt-6 border-t border-muted-foreground/10">
                                        <div className="space-y-1">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Price (ex. GST)</div>
                                            <div className="flex flex-col">
                                                {isSale && (
                                                    <div className="text-base font-bold text-muted-foreground/60 line-through decoration-orange-600 decoration-2 mb-1">
                                                        {formatCurrency(product.price)}
                                                    </div>
                                                )}
                                                <div className="flex items-baseline gap-3">
                                                    <div className={`text-6xl font-black leading-none ${isSale ? 'text-orange-600' : 'text-brand'}`}>
                                                        {formatCurrency(effectivePrice)}
                                                    </div>
                                                    <div className={`text-sm font-black uppercase tracking-widest ${isSale ? 'text-orange-600/60' : 'text-brand/60'}`}>AUD</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right space-y-1">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Availability</div>
                                            <div className="inline-flex items-center gap-2 text-green-600">
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                <span className="text-xs font-black uppercase tracking-widest">In Stock</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                        <Button size="xl" className="flex-1 rounded-full bg-brand hover:bg-brand-dark h-16 text-white font-black uppercase tracking-widest shadow-brand text-base group" onClick={handleAddToCart}>
                                            <ShoppingBag className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform" />
                                            Add to Cart
                                        </Button>
                                        <Button asChild variant="outline" size="xl" className="flex-1 rounded-full border-brand text-brand hover:bg-brand/5 h-16 font-black uppercase tracking-widest text-base">
                                            <Link href="/checkout">Go to Checkout</Link>
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-x-12 gap-y-8 px-8">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Pack Dimensions</span>
                                        <p className="text-sm font-bold text-dark">{product.quantityLabel || "Standard Professional Pack"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Manufacturer Warranty</span>
                                        <p className="text-sm font-bold text-dark">{product.warranty || "25 Years"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Product Barcode</span>
                                        <p className="text-sm font-bold text-dark">{product.barcode || "9312345678901"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Compliance</span>
                                        <p className="text-sm font-bold text-brand uppercase tracking-tighter">VBA Approved & BAL Rated</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* RELATED PRODUCTS */}
                <section className="py-24 bg-secondary/20">
                    <div className="container px-6">
                        <div className="flex items-center justify-between mb-16">
                            <div className="space-y-2">
                                <span className="section-label">More From Range</span>
                                <h2 className="text-4xl font-black uppercase tracking-tighter">Related Solutions</h2>
                            </div>
                            <Button asChild variant="ghost" className="rounded-full text-xs font-black uppercase tracking-widest text-brand hover:bg-brand/10">
                                <Link href="/products" className="flex items-center gap-2">View All Products <ArrowLeft className="w-4 h-4 rotate-180" /></Link>
                            </Button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-10">
                            {relatedProducts.map((item: any) => (
                                <Card key={item.slug} className="group rounded-3xl overflow-hidden border-border bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col md:flex-row h-full">
                                    <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto overflow-hidden">
                                        {item.heroImage ? (
                                            <img
                                                src={item.heroImage}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                                                <ShoppingBag className="w-12 h-12" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <Badge className="bg-brand/90 backdrop-blur-sm text-white font-black uppercase tracking-widest text-[9px] px-3 py-1 rounded-full border-none shadow-sm">
                                                {item.category}
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardContent className="p-10 flex-col md:w-1/2 justify-center space-y-6">
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-black text-dark leading-tight group-hover:text-brand transition-colors">{item.name}</h3>
                                            <p className="text-sm text-muted-foreground font-medium line-clamp-3">{item.summary}</p>
                                        </div>
                                        {item.price > 0 && (
                                            <div className="text-2xl font-black text-brand">{formatCurrency(item.price)}</div>
                                        )}
                                        <Button asChild className="rounded-full bg-brand-light/10 text-brand hover:bg-brand hover:text-white border border-brand/20 w-fit font-black h-12 uppercase tracking-widest text-[10px] px-8">
                                            <Link href={`/products/${item.slug}`}>
                                                Open Details
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
}
