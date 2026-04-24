import ContactForm from "@/components/uvrubbers/ContactForm";
import SiteFooter from "@/components/uvrubbers/SiteFooter";
import SiteHeader from "@/components/uvrubbers/SiteHeader";
import { contactDetails } from "@/components/uvrubbers/siteData";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone, Star, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
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
                                Get In Touch
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase font-display">
                                Contact<br />
                                <span className="text-brand">UV Rubbers</span>
                            </h1>
                            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                                Australia's leading trade specialists. Contact us for bulk orders, stockist enquiries, or technical installation support.
                            </p>
                            <nav className="flex items-center justify-center gap-2 mt-8 text-xs font-black uppercase tracking-widest text-brand/80">
                                <Link href="/" className="text-white/40 hover:text-white transition-colors">Home</Link>
                                <span className="text-white/20">›</span>
                                <span>Contact Us</span>
                            </nav>
                        </div>
                    </div>
                </section>

                {/* CONTACT CONTENT */}
                <section className="py-24 bg-white">
                    <div className="container px-6 grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
                        {/* CONTACT INFO SIDE */}
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <span className="section-label">Connect With Us</span>
                                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[1.1]">We'd Love to Hear From You</h2>
                                <div className="divider" />
                            </div>
                            <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                                Whether you're an installer wanting to learn more, or a retailer interested in stocking the Elephant range, our team is ready to help.
                            </p>

                            <div className="grid gap-6">
                                {contactDetails.map(({ href, icon: Icon, title, value }) => (
                                    <a key={title} href={href} className="flex gap-6 p-8 rounded-3xl border border-border bg-secondary/20 group hover:border-brand/40 hover:bg-brand/5 transition-all duration-300">
                                        <div className="w-14 h-14 rounded-2xl bg-brand flex items-center justify-center text-white shadow-brand group-hover:scale-110 transition-transform">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none mb-1">{title}</div>
                                            <div className="text-xl font-black text-dark group-hover:text-brand transition-colors">{value}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <div className="bg-dark rounded-[2.5rem] p-10 text-white space-y-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full blur-[80px]" />
                                <h3 className="text-2xl font-black uppercase tracking-tight relative z-10">Trade & Wholesale</h3>
                                <p className="text-white/60 relative z-10 leading-relaxed">
                                    Interested in becoming an official stockist or placing a high-volume bulk order for your commercial project?
                                </p>
                                <div className="pt-4 relative z-10">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-brand mb-2">Dedicated Trade Support</div>
                                    <div className="text-xl font-black text-white">trade@uvrubbers.com.au</div>
                                </div>
                            </div>
                        </div>

                        {/* CONTACT FORM SIDE */}
                        <div className="sticky top-[160px]">
                            <Card className="rounded-[3rem] border border-border bg-white shadow-2xl p-4 overflow-hidden">
                                <CardContent className="p-10 space-y-8">
                                    <div className="space-y-3">
                                        <h3 className="text-4xl font-black uppercase tracking-tight text-dark leading-none">Send a Message</h3>
                                        <p className="text-sm font-medium text-muted-foreground">All professional enquiries are welcomed. We typically respond within 1-2 business hours.</p>
                                    </div>
                                    <ContactForm />
                                    <div className="pt-6 border-t border-border flex items-center gap-2 justify-center text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                        Your data is secure and protected
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
}
