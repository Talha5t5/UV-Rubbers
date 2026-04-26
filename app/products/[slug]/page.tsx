"use client";

import { Minus, Plus, ShoppingBag, Star, Check, ArrowLeft, ShieldCheck, Award, Truck } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { formatCurrency } from "@/components/uvrubbers/productData";
import SiteFooter from "@/components/uvrubbers/SiteFooter";
import SiteHeader from "@/components/uvrubbers/SiteHeader";
import { useStore } from "@/components/uvrubbers/StoreContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;
    const [product, setProduct] = useState<any>(null);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useStore();
    const { toast } = useToast();
    const [quantity, setQuantity] = useState(1);
    const [variantId, setVariantId] = useState("");

    useEffect(() => {
        fetch("/api/products?activeOnly=true")
            .then(res => res.json())
            .then(data => {
                const found = data.find((p: any) => p.slug === slug);
                setProduct(found);
                if (found) {
                    setVariantId(found.variants?.[0]?.id || found.variants?.[0]?._id);
                    setRelatedProducts(data.filter((p: any) => p.slug !== slug).slice(0, 2));
                }
                setLoading(false);
            })
            .catch((e) => {
                console.error(e);
                setLoading(false);
            });
    }, [slug]);

    const selectedVariant = useMemo(
        () => product?.variants?.find((variant: any) => variant.id === variantId || variant._id === variantId) ?? product?.variants?.[0],
        [product, variantId],
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
            </div>
        );
    }

    if (!product || !selectedVariant) {
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

    const handleAddToCart = () => {
        addItem({
            productSlug: product.slug,
            productName: product.name,
            variantId: selectedVariant.id || selectedVariant._id,
            variantName: selectedVariant.name,
            sku: selectedVariant.sku,
            price: selectedVariant.price,
            image: selectedVariant.image,
            quantity,
        });

        toast({
            title: "Added to cart",
            description: `${selectedVariant.name} has been added to your order list.`,
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
                            {/* IMAGE GALLERY SIDE */}
                            <div className="space-y-8 sticky top-[160px]">
                                <div className="group relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-border aspect-[4/3] bg-muted/20">
                                    {selectedVariant.image ? (
                                        <img
                                            src={selectedVariant.image}
                                            alt={selectedVariant.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                                            <ShoppingBag className="w-16 h-16" />
                                        </div>
                                    )}
                                    <div className="absolute top-8 left-8">
                                        <Badge className="bg-brand text-white font-black uppercase tracking-[0.2em] text-xs px-5 py-2 rounded-full shadow-brand border-none">
                                            {product.category}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6">
                                    {product.variants.slice(0, 3).map((variant: any) => {
                                        const vId = variant.id || variant._id;
                                        return (
                                            <button
                                                key={vId}
                                                type="button"
                                                onClick={() => setVariantId(vId)}
                                                className={`group relative rounded-2xl overflow-hidden aspect-square border-2 transition-all duration-300 ${vId === (selectedVariant?.id || selectedVariant?._id)
                                                    ? "border-brand shadow-brand/20 shadow-lg scale-[1.02]"
                                                    : "border-transparent hover:border-brand/40 shadow-sm"
                                                    }`}
                                            >
                                                {variant.image ? (
                                                    <img src={variant.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                                                        <ShoppingBag className="w-6 h-6" />
                                                    </div>
                                                )}
                                                <div className={`absolute inset-0 transition-colors ${vId === (selectedVariant?.id || selectedVariant?._id) ? "bg-brand/5" : "bg-black/10 group-hover:bg-black/0"}`} />
                                            </button>
                                        )
                                    })}
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
                                        <div className="text-[10px] font-black tracking-[0.2em] text-brand uppercase opacity-60 bg-brand/5 px-3 py-1 rounded-full border border-brand/10">SKU: {selectedVariant.sku}</div>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3 h-3 fill-brand text-brand" />)}
                                        </div>
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">(25+ Reviews)</span>
                                    </div>

                                    <h1 className="text-4xl md:text-6xl font-black text-dark tracking-tighter uppercase leading-[0.9]">{product.name}</h1>
                                    <p className="text-lg text-muted-foreground leading-relaxed font-medium">{product.description}</p>
                                </div>

                                <div className="bg-secondary/50 rounded-[2.5rem] p-10 space-y-8 border border-border shadow-sm">
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-brand leading-none">Selected Configuration</div>
                                        <h2 className="text-3xl font-black text-dark tracking-tight">{selectedVariant.name}</h2>
                                        <p className="text-sm text-muted-foreground font-medium">{selectedVariant.blurb}</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8 pt-4">
                                        <div className="space-y-3">
                                            <label className="text-[11px] font-black uppercase tracking-widest text-dark/60 ml-4">Choose Option</label>
                                            <Select value={selectedVariant?.id || selectedVariant?._id} onValueChange={setVariantId}>
                                                <SelectTrigger className="rounded-full bg-white border-border h-14 px-6 text-sm font-bold uppercase tracking-widest focus:ring-brand shadow-sm">
                                                    <SelectValue placeholder="Choose option" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-2xl border-border">
                                                    {product.variants.map((variant: any) => (
                                                        <SelectItem key={variant.id || variant._id} value={variant.id || variant._id} className="font-bold text-xs uppercase tracking-widest py-3">
                                                            {variant.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[11px] font-black uppercase tracking-widest text-dark/60 ml-4">Quantity</label>
                                            <div className="flex h-14 items-center rounded-full border border-border bg-white shadow-sm overflow-hidden">
                                                <button
                                                    type="button"
                                                    className="w-14 h-full flex items-center justify-center hover:bg-brand/5 group border-r border-border transition-colors"
                                                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                                                >
                                                    <Minus className="w-4 h-4 text-dark/40 group-hover:text-brand transition-colors" />
                                                </button>
                                                <div className="flex-1 text-center text-sm font-black text-dark">{quantity}</div>
                                                <button
                                                    type="button"
                                                    className="w-14 h-full flex items-center justify-center hover:bg-brand/5 group border-l border-border transition-colors"
                                                    onClick={() => setQuantity((value) => value + 1)}
                                                >
                                                    <Plus className="w-4 h-4 text-dark/40 group-hover:text-brand transition-colors" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-8 pt-6 border-t border-muted-foreground/10">
                                        <div className="space-y-1">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Price (ex. GST)</div>
                                            <div className="flex items-baseline gap-3">
                                                <div className="text-5xl font-black text-brand leading-none">{formatCurrency(selectedVariant.price)}</div>
                                                <div className="text-xs font-black uppercase tracking-widest text-brand opacity-60">AUD</div>
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
                                        <p className="text-sm font-bold text-dark">{selectedVariant.quantityLabel || "Standard Professional Pack"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Manufacturer Warranty</span>
                                        <p className="text-sm font-bold text-dark">{selectedVariant.warranty || "25 Years"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Product Barcode</span>
                                        <p className="text-sm font-bold text-dark">{selectedVariant.barcode || "9312345678901"}</p>
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
