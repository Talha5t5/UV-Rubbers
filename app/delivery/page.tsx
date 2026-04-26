"use client";

import { useState } from "react";
import { MapPin, Truck, Package, Clock, Check, ArrowRight, Loader2, Star, ShieldCheck } from "lucide-react";
import Link from "next/link";
import SiteHeader from "@/components/uvrubbers/SiteHeader";
import SiteFooter from "@/components/uvrubbers/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SHIPPING_ZONES, FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";

export default function DeliveryPage() {
    const [postcode, setPostcode] = useState("");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCalculate = async () => {
        if (!postcode || postcode.length !== 4) {
            setError("Please enter a valid 4-digit Australian postcode.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const res = await fetch(`/api/shipping?postcode=${postcode}&weight=2&orderTotal=0`);
            const data = await res.json();

            if (res.ok) {
                setResult(data);
            } else {
                setError(data.error || "Could not calculate shipping for this postcode.");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(val);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SiteHeader />
            <main>
                {/* PAGE HERO */}
                <section className="relative bg-dark py-24 md:py-32 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-brand rounded-full blur-[200px]" />
                        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[150px]" />
                    </div>
                    <div className="container relative z-10 px-6 text-center">
                        <div className="max-w-4xl mx-auto space-y-6 animate-fadeInUp">
                            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-black uppercase tracking-[0.2em] mx-auto">
                                <Truck className="w-3.5 h-3.5" />
                                Australia-Wide Delivery
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase">
                                Delivery &<br />
                                <span className="text-brand">Shipping</span>
                            </h1>
                            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                                We ship from our warehouse in <strong className="text-white/80">Thomastown, Melbourne</strong> to every corner of Australia. Enter your postcode below for an instant quote.
                            </p>
                            <nav className="flex items-center justify-center gap-2 mt-8 text-xs font-black uppercase tracking-widest text-brand/80">
                                <Link href="/" className="text-white/40 hover:text-white transition-colors">Home</Link>
                                <span className="text-white/20">›</span>
                                <span>Delivery</span>
                            </nav>
                        </div>
                    </div>
                </section>

                {/* SHIPPING CALCULATOR */}
                <section className="py-24 bg-white">
                    <div className="container px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center space-y-4 mb-16">
                                <span className="section-label">Instant Quote</span>
                                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Calculate Your Shipping</h2>
                                <p className="text-muted-foreground max-w-xl mx-auto">Enter your postcode to see delivery time and cost from our Thomastown warehouse.</p>
                                <div className="divider mx-auto" />
                            </div>

                            {/* CALCULATOR CARD */}
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-gray-100">
                                <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                                    <div className="relative flex-1">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand" />
                                        <Input
                                            value={postcode}
                                            onChange={(e) => {
                                                setPostcode(e.target.value.replace(/\D/g, "").slice(0, 4));
                                                setError("");
                                            }}
                                            onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
                                            placeholder="Enter your postcode (e.g. 2000)"
                                            className="pl-12 h-16 text-lg font-bold bg-white border-2 border-gray-200 rounded-2xl focus:border-brand focus:ring-brand"
                                            maxLength={4}
                                        />
                                    </div>
                                    <Button
                                        onClick={handleCalculate}
                                        disabled={loading}
                                        className="h-16 px-10 bg-brand hover:bg-brand-dark text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-brand"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                            <>
                                                Calculate
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </>
                                        )}
                                    </Button>
                                </div>

                                {error && (
                                    <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-bold text-center">
                                        {error}
                                    </div>
                                )}

                                {/* RESULT */}
                                {result && (
                                    <div className="mt-10 animate-fadeInUp">
                                        <div className="grid md:grid-cols-3 gap-6">
                                            {/* Zone */}
                                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-soft text-center space-y-3">
                                                <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center" style={{ backgroundColor: result.zone.color + "15", color: result.zone.color }}>
                                                    <MapPin className="w-6 h-6" />
                                                </div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Delivery Zone</div>
                                                <div className="text-xl font-black text-dark">{result.zone.name}</div>
                                                <div className="text-xs text-muted-foreground font-medium">{result.zone.description}</div>
                                            </div>

                                            {/* Cost */}
                                            <div className="bg-white p-6 rounded-2xl border-2 border-brand shadow-brand/10 shadow-lg text-center space-y-3 relative overflow-hidden">
                                                {result.isFreeShipping && (
                                                    <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest py-1">
                                                        Free Shipping!
                                                    </div>
                                                )}
                                                <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand mx-auto flex items-center justify-center">
                                                    <Truck className="w-6 h-6" />
                                                </div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Shipping Cost</div>
                                                <div className="text-4xl font-black text-brand">
                                                    {result.isFreeShipping ? "FREE" : formatCurrency(result.shippingCost)}
                                                </div>
                                                <div className="text-xs text-muted-foreground font-medium">Standard parcel (~2kg)</div>
                                            </div>

                                            {/* Delivery Time */}
                                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-soft text-center space-y-3">
                                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 mx-auto flex items-center justify-center">
                                                    <Clock className="w-6 h-6" />
                                                </div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Estimated Delivery</div>
                                                <div className="text-xl font-black text-dark">{result.zone.estimatedDays}</div>
                                                <div className="text-xs text-muted-foreground font-medium">~{result.distanceKm.toLocaleString()} km from warehouse</div>
                                            </div>
                                        </div>

                                        {!result.isFreeShipping && (
                                            <div className="mt-6 p-4 rounded-xl bg-brand/5 border border-brand/20 text-center">
                                                <p className="text-sm font-bold text-dark">
                                                    💡 Spend <span className="text-brand">{formatCurrency(FREE_SHIPPING_THRESHOLD)}</span> or more for <span className="text-green-600 font-black">FREE shipping</span> Australia-wide!
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* SHIPPING ZONES MAP / TABLE */}
                <section className="py-24 bg-secondary/30">
                    <div className="container px-6">
                        <div className="text-center space-y-4 mb-16">
                            <span className="section-label">Delivery Zones</span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Shipping Across Australia</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                We deliver from our warehouse in <strong>Thomastown, Melbourne VIC 3074</strong> to all states and territories across Australia.
                            </p>
                            <div className="divider mx-auto" />
                        </div>

                        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start max-w-6xl mx-auto">
                            {/* VISUAL MAP */}
                            <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100 relative">
                                <h3 className="text-lg font-black uppercase tracking-tight mb-6 text-center">Australia Delivery Map</h3>
                                <div className="relative">
                                    <svg viewBox="0 0 600 500" className="w-full h-auto">
                                        {/* Simplified Australia outline */}
                                        {/* WA */}
                                        <path d="M50,100 L200,80 L200,350 L50,350 Z" fill={SHIPPING_ZONES.find(z => z.id === "wa")?.color + "20"} stroke={SHIPPING_ZONES.find(z => z.id === "wa")?.color} strokeWidth="2" className="hover:opacity-80 cursor-pointer transition-opacity" />
                                        <text x="125" y="220" textAnchor="middle" className="fill-current text-xs font-black" fill={SHIPPING_ZONES.find(z => z.id === "wa")?.color}>WA</text>

                                        {/* NT */}
                                        <path d="M200,80 L350,80 L350,200 L200,200 Z" fill={SHIPPING_ZONES.find(z => z.id === "nt")?.color + "20"} stroke={SHIPPING_ZONES.find(z => z.id === "nt")?.color} strokeWidth="2" className="hover:opacity-80 cursor-pointer transition-opacity" />
                                        <text x="275" y="145" textAnchor="middle" className="fill-current text-xs font-black" fill={SHIPPING_ZONES.find(z => z.id === "nt")?.color}>NT</text>

                                        {/* SA */}
                                        <path d="M200,200 L350,200 L350,350 L200,350 Z" fill={SHIPPING_ZONES.find(z => z.id === "sa")?.color + "20"} stroke={SHIPPING_ZONES.find(z => z.id === "sa")?.color} strokeWidth="2" className="hover:opacity-80 cursor-pointer transition-opacity" />
                                        <text x="275" y="280" textAnchor="middle" className="fill-current text-xs font-black" fill={SHIPPING_ZONES.find(z => z.id === "sa")?.color}>SA</text>

                                        {/* QLD */}
                                        <path d="M350,80 L530,80 L530,230 L350,230 Z" fill={SHIPPING_ZONES.find(z => z.id === "qld")?.color + "20"} stroke={SHIPPING_ZONES.find(z => z.id === "qld")?.color} strokeWidth="2" className="hover:opacity-80 cursor-pointer transition-opacity" />
                                        <text x="440" y="160" textAnchor="middle" className="fill-current text-xs font-black" fill={SHIPPING_ZONES.find(z => z.id === "qld")?.color}>QLD</text>

                                        {/* NSW */}
                                        <path d="M350,230 L530,230 L530,320 L350,320 Z" fill={SHIPPING_ZONES.find(z => z.id === "nsw-act")?.color + "20"} stroke={SHIPPING_ZONES.find(z => z.id === "nsw-act")?.color} strokeWidth="2" className="hover:opacity-80 cursor-pointer transition-opacity" />
                                        <text x="440" y="280" textAnchor="middle" className="fill-current text-xs font-black" fill={SHIPPING_ZONES.find(z => z.id === "nsw-act")?.color}>NSW</text>

                                        {/* VIC */}
                                        <path d="M350,320 L530,320 L530,380 L350,380 Z" fill={SHIPPING_ZONES.find(z => z.id === "regional-vic")?.color + "20"} stroke={SHIPPING_ZONES.find(z => z.id === "regional-vic")?.color} strokeWidth="2" className="hover:opacity-80 cursor-pointer transition-opacity" />
                                        <text x="440" y="355" textAnchor="middle" className="fill-current text-xs font-black" fill={SHIPPING_ZONES.find(z => z.id === "regional-vic")?.color}>VIC</text>

                                        {/* TAS */}
                                        <path d="M420,400 L510,400 L510,460 L420,460 Z" fill={SHIPPING_ZONES.find(z => z.id === "tas")?.color + "20"} stroke={SHIPPING_ZONES.find(z => z.id === "tas")?.color} strokeWidth="2" className="hover:opacity-80 cursor-pointer transition-opacity" />
                                        <text x="465" y="435" textAnchor="middle" className="fill-current text-xs font-black" fill={SHIPPING_ZONES.find(z => z.id === "tas")?.color}>TAS</text>

                                        {/* Warehouse pin */}
                                        <circle cx="460" cy="355" r="8" fill="#f97316" stroke="white" strokeWidth="3" />
                                        <circle cx="460" cy="355" r="4" fill="white" />
                                        <text x="460" y="345" textAnchor="middle" className="text-[9px] font-black" fill="#f97316">📍 WAREHOUSE</text>
                                    </svg>
                                </div>
                                <div className="flex items-center justify-center gap-2 mt-4 text-xs font-bold text-muted-foreground">
                                    <MapPin className="w-3.5 h-3.5 text-brand" />
                                    Thomastown, Melbourne VIC 3074
                                </div>
                            </div>

                            {/* ZONES TABLE */}
                            <div className="space-y-4">
                                {SHIPPING_ZONES.map((zone) => (
                                    <div
                                        key={zone.id}
                                        className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 flex items-center gap-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
                                    >
                                        <div
                                            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                                            style={{ backgroundColor: zone.color + "15", color: zone.color }}
                                        >
                                            <Truck className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-black text-dark text-lg">{zone.name}</div>
                                            <div className="text-xs text-muted-foreground font-medium">{zone.description}</div>
                                        </div>
                                        <div className="text-right shrink-0 space-y-1">
                                            <div className="text-xl font-black" style={{ color: zone.color }}>
                                                {formatCurrency(zone.baseRate)}
                                            </div>
                                            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                                {zone.estimatedDays}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FREE SHIPPING BANNER */}
                <section className="py-16 bg-brand-gradient relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-white rounded-full blur-[120px]" />
                    </div>
                    <div className="container px-6 relative z-10 text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-widest">
                            <Package className="w-4 h-4" />
                            Special Offer
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                            FREE Delivery on Orders Over {formatCurrency(FREE_SHIPPING_THRESHOLD)}
                        </h2>
                        <p className="text-xl text-white/70 max-w-xl mx-auto">
                            No matter where you are in Australia — metro or regional — enjoy free standard shipping on qualifying orders.
                        </p>
                        <Button asChild size="xl" className="rounded-full bg-white text-brand hover:scale-105 h-16 px-12 font-black uppercase tracking-widest transition-all">
                            <Link href="/products">Shop Now</Link>
                        </Button>
                    </div>
                </section>

                {/* DELIVERY INFO */}
                <section className="py-24 bg-white">
                    <div className="container px-6">
                        <div className="text-center space-y-4 mb-16">
                            <span className="section-label">Delivery Information</span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight">How We Ship</h2>
                            <div className="divider mx-auto" />
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            <div className="card-feature group text-center">
                                <div className="w-16 h-16 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                    <Package className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-black mb-3">Secure Packaging</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Every order is carefully packed at our Thomastown warehouse to ensure your kits arrive in perfect condition.
                                </p>
                            </div>
                            <div className="card-feature group text-center">
                                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                    <Truck className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-black mb-3">Australia-Wide</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    We deliver to every state and territory across Australia, from metro cities to regional and rural areas.
                                </p>
                            </div>
                            <div className="card-feature group text-center">
                                <div className="w-16 h-16 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                    <ShieldCheck className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-black mb-3">Tracked & Insured</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    All orders include tracking details sent via email. Full insurance coverage on every shipment.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-dark">
                    <div className="container px-6">
                        <div className="bg-gradient-to-r from-brand/20 to-brand/5 rounded-[3rem] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 border border-brand/20">
                            <div className="space-y-4 text-center md:text-left max-w-xl">
                                <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Need a Custom Quote?</h2>
                                <p className="text-white/60 font-medium">
                                    Ordering in bulk or need special delivery arrangements? Contact us for a tailored shipping quote.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Button asChild className="rounded-full bg-brand hover:bg-brand-dark h-14 px-10 font-black uppercase tracking-widest shadow-brand">
                                    <Link href="/contact">Contact Us</Link>
                                </Button>
                                <Button asChild variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 h-14 px-10 font-black uppercase tracking-widest">
                                    <Link href="/products">Shop Products</Link>
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
