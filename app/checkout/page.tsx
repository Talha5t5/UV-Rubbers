"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

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

export default function CheckoutPage() {
    const { items, subtotal, updateQuantity, removeItem, clearCart } = useStore();
    const { toast } = useToast();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        address: "",
        paymentMethod: "card-request",
        notes: "",
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const orderLines = items.map((item) => `- ${item.variantName} (${item.sku}) x ${item.quantity} = ${formatCurrency(item.price * item.quantity)}`);
        const body = [
            `Name: ${form.name}`,
            `Email: ${form.email}`,
            `Phone: ${form.phone}`,
            `Company: ${form.company}`,
            `Address: ${form.address}`,
            `Preferred payment method: ${form.paymentMethod}`,
            "",
            "Order:",
            ...orderLines,
            "",
            `Subtotal: ${formatCurrency(subtotal)}`,
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

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SiteHeader />
            <main>
                <section className="bg-hero-radial py-16 md:py-24">
                    <div className="section-shell space-y-5">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">Checkout</p>
                        <h1 className="max-w-4xl text-5xl leading-none md:text-7xl">Review your order and send it through in one place.</h1>
                        <p className="max-w-3xl text-lg text-muted-foreground md:text-xl">
                            The frontend now includes a full cart and checkout experience with order details, size variants, and payment preference capture.
                        </p>
                    </div>
                </section>

                <section className="py-16 md:py-24">
                    <div className="section-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                        <Card className="rounded-md border-border bg-surface shadow-soft">
                            <CardContent className="space-y-6 p-8">
                                <div className="space-y-2">
                                    <h2 className="text-3xl leading-tight">Order details</h2>
                                    <p className="text-sm text-muted-foreground">Adjust quantities before sending the order request.</p>
                                </div>

                                {items.length === 0 ? (
                                    <div className="space-y-4 rounded-md border border-dashed border-border bg-secondary/40 p-6">
                                        <p className="text-muted-foreground">Your cart is empty.</p>
                                        <Button asChild variant="hero">
                                            <Link href="/products">Browse products</Link>
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {items.map((item) => (
                                            <div key={item.id} className="grid gap-4 rounded-md border border-border bg-secondary/25 p-4 sm:grid-cols-[96px_1fr_auto] sm:items-center">
                                                <img src={item.image} alt={item.variantName} className="h-24 w-24 rounded-sm object-cover" />
                                                <div className="space-y-2">
                                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{item.sku}</p>
                                                    <h3 className="text-2xl leading-none">{item.variantName}</h3>
                                                    <p className="text-sm font-semibold text-foreground">{formatCurrency(item.price)}</p>
                                                </div>
                                                <div className="space-y-3">
                                                    <Input
                                                        type="number"
                                                        min={1}
                                                        value={item.quantity}
                                                        onChange={(event) => updateQuantity(item.id, Number(event.target.value) || 1)}
                                                        className="w-24"
                                                        aria-label={`Quantity for ${item.variantName}`}
                                                    />
                                                    <Button variant="ghost" onClick={() => removeItem(item.id)}>
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="rounded-md border-border bg-surface shadow-soft">
                            <CardContent className="space-y-6 p-8">
                                <div className="space-y-2">
                                    <h2 className="text-3xl leading-tight">Customer details</h2>
                                    <p className="text-sm text-muted-foreground">Capture checkout information and payment preference.</p>
                                </div>

                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <Input placeholder="Full name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} required />
                                    <Input type="email" placeholder="Email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} required />
                                    <Input placeholder="Phone" value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} required />
                                    <Input placeholder="Company" value={form.company} onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))} />
                                    <Textarea placeholder="Delivery address" value={form.address} onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))} className="min-h-24" required />
                                    <Select value={form.paymentMethod} onValueChange={(value) => setForm((current) => ({ ...current, paymentMethod: value }))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Preferred payment method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="card-request">Card payment request</SelectItem>
                                            <SelectItem value="bank-transfer">Bank transfer</SelectItem>
                                            <SelectItem value="trade-account">Trade account enquiry</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Textarea placeholder="Order notes" value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} className="min-h-28" />

                                    <div className="rounded-md bg-secondary p-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span className="font-semibold text-foreground">{formatCurrency(subtotal)}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <Button type="submit" size="lg" variant="hero" disabled={items.length === 0}>
                                            Submit order request
                                        </Button>
                                        {items.length > 0 && (
                                            <Button type="button" variant="outline" onClick={clearCart}>
                                                Clear cart
                                            </Button>
                                        )}
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
}
