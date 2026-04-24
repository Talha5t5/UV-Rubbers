"use client";

import { useState, useMemo } from "react";
import { ArrowRight, Star, SlidersHorizontal, Search } from "lucide-react";
import Link from "next/link";
import { productCatalog, formatCurrency } from "@/components/uvrubbers/productData";
import { reasons } from "@/components/uvrubbers/siteData";
import SiteFooter from "@/components/uvrubbers/SiteFooter";
import SiteHeader from "@/components/uvrubbers/SiteHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All Products");

    const categories = ["All Products", "Seal Kits", "Pipes & Cables", "Accessories"];

    const filteredProducts = useMemo(() => {
        return productCatalog.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.summary.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "All Products" || product.category === activeCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SiteHeader />
            <main>
                {/* PAGE HERO */}
                <section className="relative bg-dark py-24 md:py-32 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
                        style={{ backgroundImage: "url('https://uvrubbers.com.au/wp-content/uploads/2020/10/uvrubbers-elephant-roof-seal-kit-final.jpg')" }}
                    />
                    <div className="container relative z-10 px-6 text-center">
                        <div className="max-w-4xl mx-auto space-y-6 animate-fadeInUp">
                            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-black uppercase tracking-[0.2em] mx-auto">
                                <Star className="w-3.5 h-3.5 fill-current" />
                                Professional Catalog
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase">
                                The Elephant<br />
                                <span className="text-brand">Range</span>
                            </h1>
                            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                                Australia's most trusted waterfront sealing solution for air conditioning installations. Choose by size, variant, and application.
                            </p>
                            <nav className="flex items-center justify-center gap-2 mt-8 text-xs font-black uppercase tracking-widest text-brand/80">
                                <Link href="/" className="text-white/40 hover:text-white transition-colors">Home</Link>
                                <span className="text-white/20">›</span>
                                <span>Products</span>
                            </nav>
                        </div>
                    </div>
                </section>

                {/* FILTER BAR */}
                <section className="bg-white border-b border-border sticky top-[104px] z-30 shadow-sm">
                    <div className="container px-6 py-4 md:h-24 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mr-4 shrink-0">Filter:</span>
                            {categories.map((cat) => (
                                <Button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    variant="ghost"
                                    className={`rounded-full px-6 text-[11px] font-black uppercase tracking-widest h-10 transition-all shrink-0 ${activeCategory === cat ? "bg-brand text-white shadow-brand" : "text-dark/60 hover:text-brand hover:bg-brand/5"}`}
                                >
                                    {cat}
                                </Button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-80 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-brand transition-colors" />
                            <Input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search catalog..."
                                className="rounded-full pl-12 border-border focus-visible:ring-brand h-12 text-xs font-bold uppercase tracking-widest bg-secondary/10"
                            />
                        </div>
                    </div>
                </section>

                {/* PRODUCTS GRID */}
                <section className="py-24 bg-secondary/10 min-h-[60vh]">
                    <div className="container px-6">
                        {filteredProducts.length > 0 ? (
                            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                                {filteredProducts.map((product) => {
                                    const fromPrice = Math.min(...product.variants.map((v) => v.price));

                                    return (
                                        <Card key={product.slug} className="group rounded-3xl overflow-hidden border-border bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
                                            <div className="relative aspect-[1.3/1] overflow-hidden">
                                                <img
                                                    src={product.heroImage}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute top-6 right-6 flex flex-col gap-2 items-end">
                                                    <Badge className="bg-brand text-white font-black uppercase tracking-widest text-[10px] px-4 py-1.5 rounded-full border-none shadow-brand">
                                                        {product.category}
                                                    </Badge>
                                                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-dark font-black text-[10px] uppercase px-4 py-1.5 rounded-full border border-border shadow-sm">
                                                        {product.variants.length} Options
                                                    </Badge>
                                                </div>
                                            </div>
                                            <CardContent className="p-10 flex-1 flex flex-col space-y-6">
                                                <div className="space-y-2">
                                                    <div className="text-[10px] font-black tracking-widest text-brand uppercase opacity-60">Professional Range</div>
                                                    <h3 className="text-3xl font-black tracking-tighter leading-none text-dark group-hover:text-brand transition-colors">{product.name}</h3>
                                                </div>
                                                <div className="space-y-4 flex-1">
                                                    <p className="text-muted-foreground leading-relaxed text-sm font-medium line-clamp-2">{product.summary}</p>
                                                    <ul className="grid gap-2">
                                                        {reasons.slice(0, 3).map((reason) => (
                                                            <li key={reason} className="flex items-center gap-3 text-[11px] font-bold text-dark/70 uppercase tracking-tight">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                                                                {reason}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="pt-6 border-t border-muted-foreground/10 flex items-center justify-between mt-auto">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none mb-1">Starting At</span>
                                                        <span className="text-3xl font-black text-brand leading-none">{formatCurrency(fromPrice)}</span>
                                                    </div>
                                                    <Button asChild className="rounded-full bg-brand hover:bg-brand-dark h-14 w-14 p-0 shadow-brand transition-all flex items-center justify-center">
                                                        <Link href={`/products/${product.slug}`} className="flex items-center justify-center h-full w-full">
                                                            <ArrowRight className="w-6 h-6 text-white" />
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-20 space-y-6">
                                <Search className="w-16 h-16 text-muted-foreground mx-auto opacity-20" />
                                <h2 className="text-2xl font-black text-dark uppercase tracking-tight">No products found</h2>
                                <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
                                <Button onClick={() => { setSearchQuery(""); setActiveCategory("All Products"); }} variant="outline" className="rounded-full border-brand text-brand font-bold uppercase tracking-widest">
                                    Reset Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </section>

                {/* TROUBLE FINDING SECTION */}
                <section className="py-24 bg-white">
                    <div className="container px-6">
                        <div className="bg-dark rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 group overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-brand/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                            <div className="space-y-6 relative z-10 text-center md:text-left max-w-2xl">
                                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-[0.9]">Trouble Finding<br /><span className="text-brand">The Right Seal?</span></h2>
                                <p className="text-white/60 text-lg font-medium leading-relaxed">
                                    Our trade specialists are ready to help you find the exact Elephant Kit for your specific installation needs.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4 relative z-10">
                                <Button asChild size="xl" className="rounded-full bg-brand hover:bg-brand-dark text-white font-black uppercase tracking-widest h-16 px-10 shadow-brand">
                                    <Link href="/contact">Talk to a Specialist</Link>
                                </Button>
                                <Button asChild variant="outline" size="xl" className="rounded-full border-white/20 text-white hover:bg-white/10 h-16 px-10 font-black uppercase tracking-widest">
                                    <Link href="/about">View Applications</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
}
