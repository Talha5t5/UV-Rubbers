import { ArrowRight, Check, Star, ShieldCheck, Truck, Recycle, Award, Play, Store, ShoppingCart, Wrench, MapPin } from "lucide-react";
import Link from "next/link";

import CompareSlider from "@/components/uvrubbers/CompareSlider";
import { formatCurrency } from "@/components/uvrubbers/productData";
import Product from "@/lib/models/Product";
import dbConnect from "@/lib/mongodb";
import SiteFooter from "@/components/uvrubbers/SiteFooter";
import SiteHeader from "@/components/uvrubbers/SiteHeader";
import VideoModal from "@/components/uvrubbers/VideoModal";
import { features, reasons } from "@/components/uvrubbers/siteData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function Home() {
    await dbConnect();
    const dbProducts = await Product.find({ isActive: true }).lean() as any[];
    const featuredProducts = dbProducts.slice(0, 3);
    return (
        <div className="min-h-screen bg-background text-foreground">
            <SiteHeader />
            <main>
                {/* HERO SECTION */}
                <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-dark">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-30"
                        style={{ backgroundImage: "url('https://uvrubbers.com.au/wp-content/uploads/2020/10/uvrubbers-elephant-roof-seal-kit-final.jpg')" }}
                    />
                    <div className="absolute inset-0 bg-hero-gradient" />
                    <div className="container relative z-10 px-6">
                        <div className="max-w-3xl space-y-8 animate-fadeInUp">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/30 text-brand-light text-xs font-bold uppercase tracking-widest">
                                <Star className="w-3.5 h-3.5 fill-current" />
                                #1 Trusted by AC Installers Across Australia
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                                The Elephant<br />
                                <span className="text-brand">Roof Seal Kit</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-white/70 max-w-xl leading-relaxed">
                                Australia's most trusted waterproof sealing solution for air conditioning installations. Fast, professional, and built to last.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Button asChild size="xl" className="rounded-full bg-brand hover:bg-brand-dark text-white font-bold h-16 px-10 text-lg shadow-brand">
                                    <Link href="/products">Shop All Products</Link>
                                </Button>
                                <Button asChild size="xl" className="rounded-full border-2 border-white/30 bg-transparent text-white hover:bg-white/10 h-16 px-10 text-lg font-bold">
                                    <Link href="#features">Learn More</Link>
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-8 pt-8">
                                <div className="flex items-center gap-2.5 text-white/80 font-semibold text-sm">
                                    <div className="w-9 h-9 rounded-full bg-brand/20 border border-brand/40 flex items-center justify-center text-brand">
                                        <Check className="w-5 h-5" />
                                    </div>
                                    VBA & BAL Approved
                                </div>
                                <div className="flex items-center gap-2.5 text-white/80 font-semibold text-sm">
                                    <div className="w-9 h-9 rounded-full bg-brand/20 border border-brand/40 flex items-center justify-center text-brand">
                                        <Award className="w-5 h-5" />
                                    </div>
                                    10 Years Warranty
                                </div>
                                <div className="flex items-center gap-2.5 text-white/80 font-semibold text-sm">
                                    <div className="w-9 h-9 rounded-full bg-brand/20 border border-brand/40 flex items-center justify-center text-brand">
                                        <Star className="w-5 h-5" />
                                    </div>
                                    Made in Australia
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 hidden lg:block opacity-20 pointer-events-none">
                        <img src="/uvrubbers/Elephant-Head-Logo-e1602558904832.png" alt="" className="w-full animate-float" />
                    </div>
                </section>

                {/* BADGES STRIP */}
                <section className="bg-white py-10 border-b border-border">
                    <div className="container px-6">
                        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="w-14 h-14 rounded-full bg-brand/5 flex items-center justify-center text-brand">
                                    <Check className="w-7 h-7" />
                                </div>
                                <span className="font-extrabold text-sm uppercase tracking-tight">Tested & Approved</span>
                                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold opacity-60">VBA & BAL Certified</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="w-14 h-14 rounded-full bg-brand/5 flex items-center justify-center text-brand">
                                    <ShieldCheck className="w-7 h-7" />
                                </div>
                                <span className="font-extrabold text-sm uppercase tracking-tight">10 Years Warranty</span>
                                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold opacity-60">Long-term peace of mind</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="w-14 h-14 rounded-full bg-brand/5 flex items-center justify-center text-brand">
                                    <Award className="w-7 h-7" />
                                </div>
                                <span className="font-extrabold text-sm uppercase tracking-tight">Lifetime Guarantee</span>
                                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold opacity-60">We stand behind our product</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="w-14 h-14 rounded-full bg-brand/5 flex items-center justify-center text-brand text-brand">
                                    <MapPin className="w-7 h-7" />
                                </div>
                                <span className="font-extrabold text-sm uppercase tracking-tight">Melbourne Australia</span>
                                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold opacity-60">Proudly Local</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="w-14 h-14 rounded-full bg-brand/5 flex items-center justify-center text-brand">
                                    <Recycle className="w-7 h-7" />
                                </div>
                                <span className="font-extrabold text-sm uppercase tracking-tight">Made in Australia</span>
                                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold opacity-60">Local quality, global standards</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ABOUT INTRO */}
                <section className="py-24 bg-white" id="about">
                    <div className="container px-6 grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <span className="section-label">What We Aim to Do</span>
                                <h2 className="text-4xl md:text-5xl font-black leading-[1.1]">Australia's #1 Waterproof<br />Sealing Solution</h2>
                                <div className="divider" />
                            </div>
                            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                                <p>We want to provide all air conditioning installers with an easy-to-use waterproof sealing kit. We are also endeavouring to create a range of different waterproofing products for numerous applications in the trade field.</p>
                                <p>The Elephant Roof Seal Kit is designed so everything passes through the one hole — electrics, piping, and all — giving you a clean, professional, waterproof finish every time.</p>
                            </div>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Button asChild className="rounded-full bg-brand hover:bg-brand-dark h-14 px-8 font-bold uppercase tracking-wider">
                                    <Link href="/products">Shop Products</Link>
                                </Button>
                                <Button asChild className="rounded-full border-2 border-brand text-brand bg-transparent hover:bg-brand hover:text-white h-14 px-8 font-bold uppercase tracking-wider transition-all">
                                    <Link href="/about">Our Story</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="relative">
                            <VideoModal
                                title="The Elephant Standard"
                                description="Watch how we achieve a 100% waterproof seal in minutes."
                                videoSrc="/video/UVRubbers-Elephant-How-To-Video.mp4"
                                poster="https://uvrubbers.com.au/wp-content/uploads/2020/10/uvrubbers-elephant-logo-bg-768x432.jpg"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-brand text-white p-6 rounded-2xl shadow-brand pointer-events-none">
                                <div className="text-4xl font-black leading-none">10yr</div>
                                <div className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-80 underline underline-offset-4 decoration-white/30">Product Warranty</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PRODUCT FEATURES */}
                <section className="py-24 bg-secondary/30" id="features">
                    <div className="container px-6">
                        <div className="text-center space-y-4 mb-20">
                            <span className="section-label">Product Features</span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight">A Quick Overview of What The<br />Elephant Roof Seal Kit Can Do</h2>
                            <div className="divider mx-auto" />
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="card-feature group">
                                <div className="flex items-center gap-3 mb-6 text-brand font-black text-xs uppercase tracking-[0.2em] opacity-80">
                                    #1
                                    <div className="h-px flex-1 bg-brand/20" />
                                </div>
                                <div className="w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-8 group-hover:scale-110 transition-transform duration-300">
                                    <Play className="w-6 h-6 ml-0.5" />
                                </div>
                                <h3 className="text-2xl font-black mb-4">Fast & Easy Installation</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    The Elephant Roof Seal Kit makes installation easy and enables you to run all the electrics and piping through the one hole. Once installed, you can have peace of mind knowing it will last.
                                </p>
                            </div>
                            <div className="card-feature group">
                                <div className="flex items-center gap-3 mb-6 text-brand font-black text-xs uppercase tracking-[0.2em] opacity-80">
                                    #2
                                    <div className="h-px flex-1 bg-brand/20" />
                                </div>
                                <div className="w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-8 group-hover:scale-110 transition-transform duration-300">
                                    <Check className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-black mb-4">All-in-One Solution</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    No more messy silicone or other products. We have everything you need to waterproof your air-conditioning installation in one simple, ready-to-go package.
                                </p>
                            </div>
                            <div className="card-feature group">
                                <div className="flex items-center gap-3 mb-6 text-brand font-black text-xs uppercase tracking-[0.2em] opacity-80">
                                    #3
                                    <div className="h-px flex-1 bg-brand/20" />
                                </div>
                                <div className="w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-8 group-hover:scale-110 transition-transform duration-300">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-black mb-4">Top Quality Materials</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Made with premium EPDM rubber, manufactured right here in Australia. Withstands high temperatures, UV exposure, and extreme weather conditions.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* WHY CHOOSE ELEPHANT */}
                <section className="py-24 bg-white">
                    <div className="container px-6 grid md:grid-cols-2 gap-16 items-center">
                        <div className="relative group">
                            <div className="rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://uvrubbers.com.au/wp-content/uploads/2020/10/uvrubbers-elephant-packaging-768x432.jpg"
                                    alt="Packaging"
                                    className="w-full h-[520px] object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="absolute bottom-8 left-8 bg-brand text-white p-6 rounded-2xl shadow-brand">
                                <div className="text-4xl font-black leading-none">10yr</div>
                                <div className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-80">Product Warranty</div>
                            </div>
                        </div>
                        <div className="space-y-10">
                            <div className="space-y-4">
                                <span className="section-label">Why Choose Elephant?</span>
                                <h2 className="text-4xl md:text-5xl font-black leading-[1.1]">Built for Australian<br />Conditions</h2>
                                <div className="divider" />
                            </div>
                            <p className="text-lg text-muted-foreground">The Elephant Roof Seal Kit is engineered specifically for the harsh Australian climate — UV-resistant, temperature-tolerant, and built to outlast the competition.</p>
                            <div className="grid gap-5">
                                {[
                                    "Withstands High Temperatures",
                                    "Premium EPDM Rubber",
                                    "VBA Approved",
                                    "BAL Approved",
                                    "Weather & Waterproof",
                                    "UV Resistant",
                                    "Suitable for All Roof Types"
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-4 font-bold text-dark group">
                                        <div className="w-6 h-6 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-colors duration-200">
                                            <Check className="w-3.5 h-3.5" />
                                        </div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                            <Button asChild className="rounded-full bg-brand hover:bg-brand-dark h-14 px-10 font-bold uppercase tracking-wider pt-0.5">
                                <Link href="/products">Shop Now</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* FEATURED PRODUCTS */}
                <section className="py-24 bg-secondary/30">
                    <div className="container px-6">
                        <div className="text-center space-y-4 mb-16">
                            <span className="section-label">Our Products</span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight">The Elephant Roof Seal Kit Range</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">Professional waterproofing solutions for every roof type and installation size.</p>
                            <div className="divider mx-auto" />
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {featuredProducts.map((product) => (
                                <Card key={product.slug} className="group rounded-2xl overflow-hidden border-border bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
                                    <div className="relative aspect-[1.4/1] overflow-hidden">
                                        <img
                                            src={product.heroImage}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                                            <Badge className="bg-brand text-white font-bold uppercase tracking-widest text-[10px] px-3 py-1 rounded-full border-none shadow-brand">
                                                {product.category}
                                            </Badge>
                                            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-dark font-bold text-[10px] uppercase px-3 py-1 rounded-full">
                                                {product.variants.length} Options
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardContent className="p-8 flex-1 flex flex-col space-y-4">
                                        <div className="space-y-1">
                                            <div className="text-[10px] font-black tracking-widest text-brand uppercase opacity-60">Professional Range</div>
                                            <h3 className="text-2xl font-black leading-tight group-hover:text-brand transition-colors">{product.name}</h3>
                                        </div>
                                        <div className="text-3xl font-black text-brand flex items-baseline gap-2">
                                            {formatCurrency(Math.min(...product.variants.map((v: any) => v.price)))}
                                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Starting At</span>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed text-sm flex-1">{product.summary}</p>
                                        <Button asChild className="rounded-full bg-brand-light/10 text-brand hover:bg-brand hover:text-white border border-brand/20 w-full font-bold h-12 uppercase tracking-wider">
                                            <Link href={`/products/${product.slug}`}>
                                                Open product
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* COMPARE SECTION */}
                <section className="py-24 bg-white overflow-hidden">
                    <div className="container px-6">
                        <div className="text-center space-y-4 mb-20">
                            <span className="section-label">Compare the Difference</span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight">See It for Yourself</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">Compare the Elephant Roof Seal Kit installation versus traditional messy methods.</p>
                            <div className="divider mx-auto" />
                        </div>
                        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-border">
                            <CompareSlider
                                afterAlt="Traditional installation"
                                afterImage="/uvrubbers/image1.jpeg"
                                beforeAlt="UV Rubbers finished installation"
                                beforeImage="/uvrubbers/uvrubbers-elephant-roof-seal-kit-final.jpg"
                            />
                        </div>
                    </div>
                </section>

                {/* CTA BANNER */}
                <section className="py-24 bg-brand-gradient relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-white rounded-full blur-[120px]" />
                        <div className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-black rounded-full blur-[100px]" />
                    </div>
                    <div className="container px-6 relative z-10 text-center space-y-8">
                        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">Ready to Do It the Right Way?</h2>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">Join thousands of AC installers who trust the Elephant Roof Seal Kit for a clean, professional, waterproof finish every time.</p>
                        <div className="flex flex-wrap justify-center gap-4 pt-4">
                            <Button asChild size="xl" className="rounded-full bg-white text-brand hover:scale-105 h-16 px-12 font-black uppercase tracking-widest transition-all">
                                <Link href="/products">Shop All Products</Link>
                            </Button>
                            <Button asChild className="rounded-full border-2 border-white/30 bg-transparent text-white hover:bg-white/10 h-16 px-12 font-black uppercase tracking-widest transition-all">
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* TESTIMONIALS */}
                <section className="py-24 bg-white">
                    <div className="container px-6">
                        <div className="text-center space-y-4 mb-20">
                            <span className="section-label">Trusted by Tradies</span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight">What AC Installers Are Saying</h2>
                            <div className="divider mx-auto" />
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    name: "Jake Mitchell",
                                    role: "AC Installer, Melbourne",
                                    content: "The Elephant Roof Seal Kit has completely changed how we do installations. No more silicone mess, clean professional finish every time. Our customers love it.",
                                    initials: "JM"
                                },
                                {
                                    name: "Sarah Reynolds",
                                    role: "HVAC Contractor, Sydney",
                                    content: "We've been using the Elephant kits for 3 years now. They save us time on every job and the quality is excellent. VBA approved gives our customers confidence too.",
                                    initials: "SR"
                                },
                                {
                                    name: "Tom Clarke",
                                    role: "Air Conditioning Specialist, Brisbane",
                                    content: "I've tried many products, but nothing compares to the Elephant Roof Seal Kit. Installation takes half the time and the result looks so much better than traditional methods.",
                                    initials: "TC"
                                }
                            ].map((test) => (
                                <Card key={test.name} className="p-10 rounded-2xl border-border bg-white shadow-md relative group hover:shadow-xl transition-all duration-300">
                                    <div className="absolute top-8 right-8 text-6xl font-black text-brand/10 group-hover:text-brand/20 transition-colors pointer-events-none">"</div>
                                    <div className="flex gap-1 mb-8">
                                        {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-brand text-brand" />)}
                                    </div>
                                    <p className="text-lg italic text-muted-foreground leading-relaxed mb-10">"{test.content}"</p>
                                    <div className="flex items-center gap-4 border-t border-border pt-8">
                                        <div className="w-14 h-14 rounded-full bg-brand-gradient flex items-center justify-center text-white font-black text-lg">
                                            {test.initials}
                                        </div>
                                        <div>
                                            <div className="font-black text-dark tracking-tight">{test.name}</div>
                                            <div className="text-xs font-bold text-brand uppercase tracking-widest">{test.role}</div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* STOCKISTS LOGOS */}
                <section className="py-20 bg-white border-y border-border">
                    <div className="container px-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="space-y-2 text-center md:text-left">
                                <h2 className="text-4xl font-black tracking-tight text-dark uppercase">Where to buy</h2>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">A list of official stockists</p>
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70 hover:opacity-100 transition-opacity">
                                <img src="https://uvrubbers.com.au/wp-content/uploads/2022/06/cool-chain-header-logo-2-300x80.png" alt="CoolChain" className="h-10 md:h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300" />
                                <img src="https://uvrubbers.com.au/wp-content/uploads/2021/07/logo_1686266_print-6-300x70.png" alt="FA Australia" className="h-10 md:h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300" />
                                <img src="https://uvrubbers.com.au/wp-content/uploads/2022/01/HVAC-BLACK-Text-300x87.png" alt="Hunter HVAC" className="h-10 md:h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300" />
                                <img src="https://uvrubbers.com.au/wp-content/uploads/2025/10/Actrol.jpg" alt="Actrol" className="h-14 md:h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
}
