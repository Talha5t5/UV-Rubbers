import SiteFooter from "@/components/uvrubbers/SiteFooter";
import SiteHeader from "@/components/uvrubbers/SiteHeader";
import Link from "next/link";
import { Clock, Mail } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <SiteHeader />
            <main>
                <section className="bg-dark py-24 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand/5 opacity-50" />
                    <div className="container relative z-10 px-6">
                        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase">Privacy Policy</h1>
                        <p className="text-white/60 text-lg mt-4 max-w-xl mx-auto">How UV Rubbers Pty Ltd collects, uses, and protects your personal information.</p>
                        <div className="flex items-center justify-center gap-2 mt-8 text-xs font-black uppercase tracking-widest text-brand/80">
                            <Link href="/" className="text-white/40 hover:text-white transition-colors">Home</Link>
                            <span className="text-white/20">›</span>
                            <span>Privacy Policy</span>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-white">
                    <div className="container px-6 max-w-4xl">
                        <div className="space-y-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/5 border border-brand/20 text-brand text-[10px] font-black uppercase tracking-widest">
                                <Clock className="w-3.5 h-3.5" />
                                Last Updated: October 16, 2020
                            </div>

                            <div className="prose prose-brand max-w-none space-y-8 text-muted-foreground leading-relaxed">
                                <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
                                <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</p>

                                <div className="bg-muted/30 border border-border p-8 rounded-2xl space-y-6">
                                    <h3 className="text-dark font-black text-lg uppercase tracking-wider">Table of Contents</h3>
                                    <ol className="grid gap-2 text-sm font-bold uppercase tracking-widest list-decimal pl-5">
                                        <li><a href="#interpretation" className="text-brand hover:underline">Interpretation and Definitions</a></li>
                                        <li><a href="#collecting-data" className="text-brand hover:underline">Collecting and Using Your Personal Data</a></li>
                                        <li><a href="#use-of-data" className="text-brand hover:underline">Use of Your Personal Data</a></li>
                                        <li><a href="#retention" className="text-brand hover:underline">Retention of Your Personal Data</a></li>
                                        <li><a href="#disclosure" className="text-brand hover:underline">Disclosure of Your Personal Data</a></li>
                                        <li><a href="#security" className="text-brand hover:underline">Security of Your Personal Data</a></li>
                                    </ol>
                                </div>

                                <div id="interpretation" className="space-y-4 pt-8 border-t border-border">
                                    <h2 className="text-3xl font-black text-dark uppercase tracking-tight">Interpretation and Definitions</h2>
                                    <h3 className="text-xl font-black text-dark/80">Interpretation</h3>
                                    <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
                                    <h3 className="text-xl font-black text-dark/80">Definitions</h3>
                                    <p>For the purposes of this Privacy Policy:</p>
                                    <ul className="list-disc pl-5 space-y-4">
                                        <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
                                        <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to UV Rubbers Pty Ltd, Melbourne.</li>
                                        <li><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website.</li>
                                        <li><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
                                    </ul>
                                </div>

                                <div id="collecting-data" className="space-y-4 pt-8 border-t border-border">
                                    <h2 className="text-3xl font-black text-dark uppercase tracking-tight">Collecting and Using Your Personal Data</h2>
                                    <h3 className="text-xl font-black text-dark/80">Types of Data Collected</h3>
                                    <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Email address</li>
                                        <li>First name and last name</li>
                                        <li>Phone number</li>
                                        <li>Address, State, City</li>
                                        <li>Usage Data</li>
                                    </ul>
                                </div>

                                <div id="use-of-data" className="space-y-4 pt-8 border-t border-border">
                                    <h2 className="text-3xl font-black text-dark uppercase tracking-tight">Use of Your Personal Data</h2>
                                    <p>The Company may use Personal Data for providing and maintaining our Service, managing Your Account, performance of a contract, and contacting You.</p>
                                </div>

                                <div id="contact-privacy" className="bg-dark p-10 rounded-3xl text-white space-y-6">
                                    <h2 className="text-3xl font-black uppercase tracking-tight">Contact Us</h2>
                                    <p className="text-white/60">If you have any questions about this Privacy Policy, You can contact us:</p>
                                    <div className="flex flex-wrap gap-4">
                                        <a href="mailto:info@uvrubbers.com.au" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-brand text-white font-black uppercase tracking-widest text-xs hover:bg-brand-dark transition-colors">
                                            <Mail className="w-4 h-4" />
                                            Email Us
                                        </a>
                                    </div>
                                    <div className="pt-6 border-t border-white/10 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                                        This policy applies to UV Rubbers Pty Ltd, Melbourne, Victoria, Australia. ABN 12 345 678 901.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
}
