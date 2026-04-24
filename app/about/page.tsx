import { Clock, ShieldCheck, Star, Users, Zap, Award, Check, Play, Hammer, Globe, Rocket, Recycle, MapPin, Store, ShoppingCart, Wrench } from "lucide-react";
import Link from "next/link";
import SiteFooter from "@/components/uvrubbers/SiteFooter";
import SiteHeader from "@/components/uvrubbers/SiteHeader";
import VideoModal from "@/components/uvrubbers/VideoModal";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <SiteHeader />
            <main>
                {/* HERO SECTION */}
                <section className="relative bg-dark py-24 md:py-32 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
                        style={{ backgroundImage: "url('https://uvrubbers.com.au/wp-content/uploads/2020/10/uvrubbers-elephant-roof-seal-kit-final.jpg')" }}
                    />
                    <div className="container relative z-10 px-6">
                        <div className="max-w-3xl space-y-6 animate-fadeInUp">
                            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-black uppercase tracking-[0.2em]">
                                <Star className="w-3.5 h-3.5 fill-current" />
                                Our Story
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase">
                                Proudly Australian.<br />
                                <span className="text-brand">Built to Last.</span>
                            </h1>
                            <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed">
                                UV Rubbers was born from a simple frustration — there had to be a better, cleaner way to seal air conditioning roof penetrations in Australia.
                            </p>
                            <div className="flex items-center gap-2 mt-8 text-xs font-black uppercase tracking-widest text-brand/80">
                                <Link href="/" className="text-white/40 hover:text-white transition-colors">Home</Link>
                                <span className="text-white/20">›</span>
                                <span>About Us</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* STATS SECTION */}
                <section className="bg-white border-b border-border">
                    <div className="container px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 -translate-y-12">
                            {[
                                { num: "10+", label: "Years in the Industry" },
                                { num: "10yr", label: "Product Warranty" },
                                { num: "7", label: "Product Range" },
                                { num: "🇦🇺", label: "100% Australian Made" }
                            ].map((stat) => (
                                <div key={stat.label} className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-brand text-center group hover:-translate-y-2 transition-transform">
                                    <div className="text-4xl md:text-5xl font-black text-brand mb-2 group-hover:scale-110 transition-transform">{stat.num}</div>
                                    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* STORY SECTION */}
                <section className="py-24 bg-white">
                    <div className="container px-6 grid md:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8 animate-reveal">
                            <div className="space-y-4">
                                <span className="section-label">Our Story</span>
                                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[1.1]">From Frustration<br />to Innovation</h2>
                                <div className="divider" />
                            </div>
                            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                                <p>UV Rubbers was founded by air conditioning professionals who were fed up with the messy, unreliable methods traditionally used to seal roof penetrations. Silicone, makeshift covers, and flimsy flashing — none of it was good enough for a trade that demands precision and longevity.</p>
                                <p>So we set out to build the perfect solution: a single, all-in-one waterproof sealing kit that's fast to install, looks professional, and is built to withstand Australia's brutal climate.</p>
                                <p>The result was <strong>The Elephant Roof Seal Kit</strong> — engineered from premium EPDM rubber, approved by the Victorian Building Authority and BAL-rated, and now trusted by air conditioning installers right across Australia.</p>
                            </div>
                            <div className="flex flex-wrap gap-4 pt-4">
                                {[
                                    { label: "VBA Approved", color: "brand" },
                                    { label: "BAL Approved", color: "brand" },
                                    { label: "EPDM Rubber", color: "brand" },
                                    { label: "Made in Australia", color: "brand" }
                                ].map((cert) => (
                                    <div key={cert.label} className="flex items-center gap-3 bg-brand/5 border border-brand/20 px-4 py-2.5 rounded-xl text-dark text-xs font-black uppercase tracking-widest">
                                        <div className="w-2.5 h-2.5 rounded-full bg-brand" />
                                        {cert.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative group">
                            <VideoModal
                                title="Innovation in the Trade"
                                description="See how the Elephant Kit was developed to solve real-world installation challenges."
                                videoSrc="/video/UVRubbers-Elephant-How-To-Video.mp4"
                                poster="https://uvrubbers.com.au/wp-content/uploads/2020/10/uvrubbers-installation-elephant-roof-seal-kit-768x432.jpg"
                            />
                            <div className="absolute top-8 -right-8 bg-brand-gradient text-white p-10 rounded-[2rem] shadow-brand hidden lg:block pointer-events-none">
                                <ShieldCheck className="w-12 h-12 mb-4 opacity-50" />
                                <div className="text-4xl font-black leading-none">100%</div>
                                <div className="text-[10px] font-bold uppercase tracking-widest opacity-80 mt-1">Waterproof</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* MISSION SECTION */}
                <section className="py-24 bg-secondary/30">
                    <div className="container px-6">
                        <div className="text-center space-y-4 mb-20 max-w-3xl mx-auto">
                            <span className="section-label text-brand">What We Aim to Do</span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Our Mission</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                We want to provide all air conditioning installers with an easy-to-use waterproof sealing kit, and continue developing waterproofing products for numerous trade applications.
                            </p>
                            <div className="divider mx-auto" />
                        </div>
                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                { icon: <Hammer className="w-8 h-8" />, title: "Trade-First Design", desc: "Designed by tradies, for tradies. We understand what installers need on the job." },
                                { icon: <Globe className="w-8 h-8" />, title: "Built for Australia", desc: "Engineered for Australia's extreme UV exposure, heat, and weather variability." },
                                { icon: <Recycle className="w-8 h-8" />, title: "Quality Focus", desc: "We use only premium EPDM rubber because we refuse to compromise on longevity." },
                                { icon: <Rocket className="w-8 h-8" />, title: "Always Innovating", desc: "Expanding our range with new waterproofing solutions for different trade apps." }
                            ].map((item) => (
                                <div key={item.title} className="bg-white p-8 rounded-3xl shadow-soft border-t-4 border-brand text-center space-y-4 hover:-translate-y-2 transition-transform">
                                    <div className="w-14 h-14 rounded-full bg-brand/5 flex items-center justify-center text-brand mx-auto mb-2">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-black text-xl text-dark tracking-tight leading-none uppercase">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* VALUES SECTION */}
                <section className="py-24 bg-white">
                    <div className="container px-6 grid lg:grid-cols-[1fr_0.8fr] gap-20 items-start">
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <span className="section-label">Our Values</span>
                                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[1.1]">What Drives Everything We Do</h2>
                                <div className="divider" />
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                {[
                                    { icon: <ShieldCheck className="w-6 h-6" />, title: "Integrity", desc: "We back every product with a real warranty and stand behind our claims." },
                                    { icon: <Award className="w-6 h-6" />, title: "Excellence", desc: "Only the best materials. Only the best results. No shortcuts allowed." },
                                    { icon: <Users className="w-6 h-6" />, title: "Community", desc: "Supporting Australian tradies and the broader HVAC industry." },
                                    { icon: <Zap className="w-6 h-6" />, title: "Innovation", desc: "Always looking for smarter, cleaner, faster solutions for the trade." }
                                ].map((val) => (
                                    <div key={val.title} className="bg-brand/5 border border-brand/10 p-8 rounded-3xl space-y-4 group hover:bg-brand transition-colors duration-300">
                                        <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white group-hover:bg-white group-hover:text-brand transition-colors">
                                            {val.icon}
                                        </div>
                                        <h4 className="font-black text-xl text-dark group-hover:text-white transition-colors uppercase tracking-tight leading-none pt-2">{val.title}</h4>
                                        <p className="text-sm text-muted-foreground group-hover:text-white/80 transition-colors leading-relaxed font-medium">{val.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-dark rounded-[3rem] p-12 md:p-16 text-white space-y-10 relative overflow-hidden group">
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand/20 rounded-full blur-[80px]" />
                            <div className="space-y-4 relative z-10">
                                <h3 className="text-4xl font-black uppercase tracking-tight leading-none text-brand">Why "Elephant"?</h3>
                                <p className="text-white/70 text-lg leading-relaxed">
                                    The elephant is one of nature's most resilient, powerful, and long-lasting creatures. It's the perfect symbol for a product built to endure — tough enough to handle Australian conditions.
                                </p>
                                <p className="text-white/70 text-lg leading-relaxed">
                                    Just like the elephant, our kits are strong, dependable, and designed for the long haul.
                                </p>
                            </div>
                            <div className="bg-brand/10 border-l-4 border-brand p-8 rounded-2xl relative z-10 group-hover:bg-brand/20 transition-colors">
                                <p className="text-xl italic font-black text-white/90 leading-relaxed">
                                    "An elephant never forgets — and once installed, the Elephant Roof Seal Kit never leaks."
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4 relative z-10">
                                <Button asChild className="rounded-full bg-brand hover:bg-brand-dark h-14 px-8 font-black uppercase tracking-widest">
                                    <Link href="/products">Shop Kits</Link>
                                </Button>
                                <Button asChild className="rounded-full border-2 border-white/30 bg-transparent text-white hover:bg-white/10 h-14 px-8 font-black uppercase tracking-widest">
                                    <Link href="/contact">Contact Us</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TIMELINE SECTION */}
                <section className="py-24 bg-secondary/20">
                    <div className="container px-6 max-w-4xl">
                        <div className="text-center space-y-4 mb-20">
                            <span className="section-label">Our Journey</span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[1.1]">How We Got Here</h2>
                            <div className="divider mx-auto" />
                        </div>
                        <div className="relative pl-12 space-y-16 py-8">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand via-brand/50 to-brand/10 rounded-full" />
                            {[
                                { year: "2019", title: "The Problem Identified", desc: "Identified widespread frustration with messy, ineffective roof seal methods across Australia." },
                                { year: "2020", title: "The Elephant Born", desc: "First Elephant Roof Seal Kit produced. UV Rubbers Pty Ltd incorporated." },
                                { year: "2021", title: "Official Certification", desc: "VBA and BAL ratings achieved — giving trade professionals total confidence." },
                                { year: "2022", title: "Range Expansion", desc: "Added 70mm and 100mm trunking rolls, completing the professional suite." },
                                { year: "Today", title: "Growing the Range", desc: "Continuing to develop new waterproofing solutions for the trade industry." }
                            ].map((item) => (
                                <div key={item.title} className="relative group">
                                    <div className="absolute -left-12 top-0 w-1 bg-white h-full scale-y-125 z-10" />
                                    <div className="absolute -left-14 top-0 w-6 h-6 rounded-full bg-white border-4 border-brand shadow-brand z-20 group-hover:scale-125 transition-transform" />
                                    <div className="space-y-1">
                                        <div className="text-sm font-black text-brand uppercase tracking-widest leading-none mb-2">{item.year} — {item.title}</div>
                                        <p className="text-lg text-muted-foreground font-medium max-w-2xl">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA BANNER */}
                <section className="py-24 bg-brand-gradient relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-white rounded-full blur-[120px]" />
                        <div className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-black rounded-full blur-[100px]" />
                    </div>
                    <div className="container relative z-10 text-center space-y-8 px-6">
                        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9]">Experience the<br />Elephant Difference</h2>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">Join thousands of AC installers across Australia who have made the switch to the Elephant Roof Seal Kit.</p>
                        <div className="flex flex-wrap justify-center gap-4 pt-4">
                            <Button asChild size="xl" className="rounded-full bg-white text-brand hover:scale-105 h-16 px-12 font-black uppercase tracking-widest transition-all">
                                <Link href="/products">Shop All Products</Link>
                            </Button>
                            <Button asChild className="rounded-full border-2 border-white/30 bg-transparent text-white hover:bg-white/10 h-16 px-12 font-black uppercase tracking-widest transition-all">
                                <Link href="/contact">Get in Touch</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
}
