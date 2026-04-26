"use client";

import { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Truck, Loader2, Check, Package, Info } from "lucide-react";

import { formatCurrency } from "@/components/uvrubbers/productData";
import SiteFooter from "@/components/uvrubbers/SiteFooter";
import SiteHeader from "@/components/uvrubbers/SiteHeader";
import { useStore } from "@/components/uvrubbers/StoreContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";

export default function CheckoutPage() {
    const { items, subtotal, updateQuantity, removeItem, clearCart } = useStore();
    const { toast } = useToast();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        street: "",
        suburb: "",
        state: "VIC",
        postcode: "",
        paymentMethod: "card-request",
        notes: "",
    });

    // Shipping state
    const [shippingResult, setShippingResult] = useState<any>(null);
    const [shippingLoading, setShippingLoading] = useState(false);
    const [shippingError, setShippingError] = useState("");

    // Auto-calculate shipping when postcode changes and is 4 digits
    useEffect(() => {
        if (form.postcode.length === 4) {
            const timer = setTimeout(() => {
                calculateShipping(form.postcode);
            }, 400);
            return () => clearTimeout(timer);
        } else {
            setShippingResult(null);
            setShippingError("");
        }
    }, [form.postcode, subtotal]);

    const calculateShipping = async (postcode: string) => {
        setShippingLoading(true);
        setShippingError("");
        try {
            const res = await fetch(`/api/shipping?postcode=${postcode}&weight=2&orderTotal=${subtotal}`);
            const data = await res.json();
            if (res.ok) {
                setShippingResult(data);
            } else {
                setShippingError(data.error || "Invalid postcode");
                setShippingResult(null);
            }
        } catch {
            setShippingError("Could not calculate shipping");
            setShippingResult(null);
        } finally {
            setShippingLoading(false);
        }
    };

    const shippingCost = shippingResult?.shippingCost || 0;
    const isFreeShipping = shippingResult?.isFreeShipping || false;
    const total = subtotal + shippingCost;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!shippingResult && items.length > 0) {
            toast({ title: "Missing postcode", description: "Please enter your postcode to calculate shipping." });
            return;
        }

        const fullAddress = `${form.street}, ${form.suburb}, ${form.state} ${form.postcode}`;
        const orderLines = items.map((item) => `- ${item.variantName} (${item.sku}) x ${item.quantity} = ${formatCurrency(item.price * item.quantity)}`);
        const body = [
            `Name: ${form.name}`,
            `Email: ${form.email}`,
            `Phone: ${form.phone}`,
            `Company: ${form.company}`,
            `Address: ${fullAddress}`,
            `Preferred payment method: ${form.paymentMethod}`,
            "",
            "Order:",
            ...orderLines,
            "",
            `Subtotal: ${formatCurrency(subtotal)}`,
            `Shipping (${shippingResult?.zone?.name || "N/A"}): ${isFreeShipping ? "FREE" : formatCurrency(shippingCost)}`,
            `Total: ${formatCurrency(total)}`,
            "",
            "Notes:",
            form.notes,
        ]
            .join("\n")
            .trim();

        window.location.href = `mailto:info@uvrubbers.com.au?subject=${encodeURIComponent("UV Rubbers order request")}&body=${encodeURIComponent(body)}`;

        toast({
            title: "Order request ready",
            description: "Your email client has been opened with the cart and checkout details.",
        });
    };

    const australianStates = ["VIC", "NSW", "QLD", "SA", "WA", "TAS", "NT", "ACT"];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SiteHeader />
            <main>
                {/* HERO */}
                <section className="relative bg-dark py-16 md:py-20 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-brand rounded-full blur-[200px]" />
                    </div>
                    <div className="container relative z-10 px-6 text-center">
                        <div className="max-w-3xl mx-auto space-y-4 animate-fadeInUp">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-black uppercase tracking-[0.2em]">
                                <Package className="w-3.5 h-3.5" />
                                Secure Checkout
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase">
                                Review & <span className="text-brand">Order</span>
                            </h1>
                            <p className="text-white/50 text-lg max-w-xl mx-auto">
                                Confirm your items, enter your delivery address, and we'll calculate shipping from our Thomastown warehouse.
                            </p>
                            <nav className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-brand/80">
                                <Link href="/" className="text-white/40 hover:text-white transition-colors">Home</Link>
                                <span className="text-white/20">›</span>
                                <Link href="/products" className="text-white/40 hover:text-white transition-colors">Products</Link>
                                <span className="text-white/20">›</span>
                                <span>Checkout</span>
                            </nav>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24 bg-secondary/10">
                    <div className="container px-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                        {/* LEFT: Order Details */}
                        <div className="space-y-8">
                            <Card className="rounded-3xl border-border bg-white shadow-soft overflow-hidden">
                                <CardContent className="space-y-6 p-8">
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-black uppercase tracking-tight">Order Details</h2>
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Adjust quantities before submitting</p>
                                    </div>

                                    {items.length === 0 ? (
                                        <div className="space-y-4 rounded-2xl border-2 border-dashed border-border bg-secondary/20 p-10 text-center">
                                            <Package className="w-12 h-12 text-muted-foreground/30 mx-auto" />
                                            <p className="text-muted-foreground font-bold">Your cart is empty.</p>
                                            <Button asChild className="rounded-full bg-brand hover:bg-brand-dark text-white font-bold uppercase tracking-widest">
                                                <Link href="/products">Browse Products</Link>
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {items.map((item) => (
                                                <div key={item.id} className="flex gap-4 rounded-2xl border border-border bg-gray-50 p-4 items-center group hover:border-brand/20 transition-colors">
                                                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                                                        {item.image ? (
                                                            <img src={item.image} alt={item.variantName} className="h-full w-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                                <Package className="w-6 h-6" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0 space-y-1">
                                                        <div className="text-[10px] font-black uppercase tracking-widest text-brand opacity-60">{item.sku}</div>
                                                        <h3 className="font-black text-dark text-sm truncate">{item.variantName}</h3>
                                                        <p className="text-sm font-bold text-brand">{formatCurrency(item.price)}</p>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2">
                                                        <Input
                                                            type="number"
                                                            min={1}
                                                            value={item.quantity}
                                                            onChange={(e) => updateQuantity(item.id, Number(e.target.value) || 1)}
                                                            className="w-20 h-10 text-center font-bold bg-white border-gray-200 rounded-xl"
                                                        />
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="text-[10px] font-bold text-red-500 hover:text-red-600 uppercase tracking-widest transition-colors"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* RIGHT: Customer Details + Shipping + Summary */}
                        <div className="space-y-6">
                            <Card className="rounded-3xl border-border bg-white shadow-soft overflow-hidden">
                                <CardContent className="p-8">
                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                        {/* Customer Info */}
                                        <div className="space-y-2">
                                            <h2 className="text-2xl font-black uppercase tracking-tight">Customer Details</h2>
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Your contact information</p>
                                        </div>
                                        <div className="space-y-4">
                                            <Input placeholder="Full name *" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} required className="h-12 bg-gray-50 border-gray-200 rounded-xl font-medium" />
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} required className="h-12 bg-gray-50 border-gray-200 rounded-xl font-medium" />
                                                <Input placeholder="Phone *" value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} required className="h-12 bg-gray-50 border-gray-200 rounded-xl font-medium" />
                                            </div>
                                            <Input placeholder="Company (optional)" value={form.company} onChange={(e) => setForm(f => ({ ...f, company: e.target.value }))} className="h-12 bg-gray-50 border-gray-200 rounded-xl font-medium" />
                                        </div>

                                        {/* Delivery Address */}
                                        <div className="pt-4 border-t border-gray-100 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-brand" />
                                                <h3 className="text-lg font-black uppercase tracking-tight">Delivery Address</h3>
                                            </div>
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Shipping calculated from Thomastown, VIC 3074</p>
                                        </div>
                                        <div className="space-y-4">
                                            <Input placeholder="Street address *" value={form.street} onChange={(e) => setForm(f => ({ ...f, street: e.target.value }))} required className="h-12 bg-gray-50 border-gray-200 rounded-xl font-medium" />
                                            <Input placeholder="Suburb / City *" value={form.suburb} onChange={(e) => setForm(f => ({ ...f, suburb: e.target.value }))} required className="h-12 bg-gray-50 border-gray-200 rounded-xl font-medium" />
                                            <div className="grid grid-cols-2 gap-4">
                                                <select
                                                    value={form.state}
                                                    onChange={(e) => setForm(f => ({ ...f, state: e.target.value }))}
                                                    className="h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 font-bold text-sm outline-none focus:ring-2 focus:ring-brand"
                                                >
                                                    {australianStates.map(s => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                                <div className="relative">
                                                    <Input
                                                        placeholder="Postcode *"
                                                        value={form.postcode}
                                                        onChange={(e) => setForm(f => ({ ...f, postcode: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                                                        required
                                                        maxLength={4}
                                                        className="h-12 bg-gray-50 border-gray-200 rounded-xl font-medium pr-10"
                                                    />
                                                    {shippingLoading && (
                                                        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-brand" />
                                                    )}
                                                    {shippingResult && !shippingLoading && (
                                                        <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Shipping Result (auto-calculated) */}
                                        {shippingError && (
                                            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold text-center">
                                                {shippingError}
                                            </div>
                                        )}

                                        {shippingResult && (
                                            <div className="rounded-2xl border-2 border-brand/20 bg-brand/5 p-5 space-y-3 animate-fadeInUp">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: shippingResult.zone.color + "15", color: shippingResult.zone.color }}>
                                                        <Truck className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-black text-dark text-sm">{shippingResult.zone.name}</div>
                                                        <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                                                            {shippingResult.zone.estimatedDays} · ~{shippingResult.distanceKm.toLocaleString()} km
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className={`text-lg font-black ${isFreeShipping ? "text-green-600" : "text-brand"}`}>
                                                            {isFreeShipping ? "FREE" : formatCurrency(shippingCost)}
                                                        </div>
                                                    </div>
                                                </div>
                                                {isFreeShipping && (
                                                    <div className="flex items-center gap-2 text-green-600 text-xs font-bold bg-green-50 px-3 py-2 rounded-lg">
                                                        <Check className="w-3.5 h-3.5" />
                                                        Free shipping applied — order over {formatCurrency(FREE_SHIPPING_THRESHOLD)}
                                                    </div>
                                                )}
                                                {!isFreeShipping && (
                                                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold bg-white px-3 py-2 rounded-lg border border-gray-100">
                                                        <Info className="w-3.5 h-3.5 text-brand" />
                                                        Spend {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)} more for FREE shipping!
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Payment & Notes */}
                                        <div className="pt-4 border-t border-gray-100 space-y-4">
                                            <Select value={form.paymentMethod} onValueChange={(value) => setForm(f => ({ ...f, paymentMethod: value }))}>
                                                <SelectTrigger className="h-12 bg-gray-50 border-gray-200 rounded-xl font-bold text-sm">
                                                    <SelectValue placeholder="Preferred payment method" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="card-request">Card Payment Request</SelectItem>
                                                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                                                    <SelectItem value="trade-account">Trade Account Enquiry</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Textarea placeholder="Order notes (optional)" value={form.notes} onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))} className="min-h-24 bg-gray-50 border-gray-200 rounded-xl font-medium" />
                                        </div>

                                        {/* ORDER TOTAL */}
                                        <div className="bg-gray-50 rounded-2xl p-6 space-y-3 border border-gray-100">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Subtotal</span>
                                                <span className="font-black text-dark">{formatCurrency(subtotal)}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Shipping</span>
                                                <span className={`font-black ${isFreeShipping ? "text-green-600" : shippingResult ? "text-dark" : "text-muted-foreground"}`}>
                                                    {!shippingResult ? (
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">Enter postcode</span>
                                                    ) : isFreeShipping ? "FREE" : formatCurrency(shippingCost)}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">GST (included)</span>
                                                <span className="font-bold text-muted-foreground">{formatCurrency(total * 0.1)}</span>
                                            </div>
                                            <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                                                <span className="font-black uppercase tracking-widest text-xs text-dark">Total</span>
                                                <span className="text-3xl font-black text-brand">{formatCurrency(total)}</span>
                                            </div>
                                        </div>

                                        {/* ACTIONS */}
                                        <div className="flex flex-col gap-3">
                                            <Button
                                                type="submit"
                                                disabled={items.length === 0}
                                                className="w-full rounded-full bg-brand hover:bg-brand-dark text-white font-black uppercase tracking-widest shadow-brand h-14 text-xs"
                                            >
                                                Submit Order Request
                                            </Button>
                                            {items.length > 0 && (
                                                <Button type="button" variant="outline" onClick={clearCart} className="w-full rounded-full border-gray-200 text-muted-foreground hover:text-red-500 hover:border-red-200 font-bold uppercase tracking-widest text-xs h-12">
                                                    Clear Cart
                                                </Button>
                                            )}
                                        </div>

                                        <p className="text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                            Secure Checkout · Ships from Thomastown, Melbourne
                                        </p>
                                    </form>
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
