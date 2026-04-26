"use client";

import { Menu, ShoppingBag, Trash2, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { formatCurrency } from "@/components/uvrubbers/productData";
import { useStore } from "@/components/uvrubbers/StoreContext";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const navLinkClass = "text-[11px] font-black uppercase tracking-[0.2em] text-dark/70 transition-all hover:text-brand";
const navActiveClass = "text-brand";

const SiteHeader = () => {
  const { itemCount, items, removeItem, subtotal } = useStore();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-brand py-2 text-white text-[10px] font-black uppercase tracking-widest px-6 flex justify-between items-center">
        <div className="hidden sm:flex items-center gap-6">
          <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> Call: 1300 ELEPHANT</div>
          <div className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Melbourne, Australia</div>
        </div>
        <div className="flex items-center gap-6 mx-auto sm:mx-0">
          <div className="flex items-center gap-2 font-black">Free Shipping on orders over $200</div>
        </div>
      </div>

      <nav className="bg-white/95 backdrop-blur-md border-b border-border shadow-soft h-20 md:h-24">
        <div className="section-shell flex h-full items-center justify-between gap-8">
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <img
                src="/uvrubbers/cropped-UV-Rubbers-PTY-LTD-Logo-300x86.png"
                alt="UV Rubbers"
                className="h-10 w-auto md:h-12 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navigation.map((item) => (
              <NavLink key={item.href} href={item.href} className={`${navLinkClass} px-4 py-2 rounded-full hover:bg-brand/5`} activeClassName={navActiveClass}>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-full border border-border hover:bg-brand/5 group transition-colors">
                  <ShoppingBag className="h-5 w-5 text-dark group-hover:text-brand transition-colors" />
                  <span className="sr-only">Open cart</span>
                  {itemCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-brand px-1.5 text-[10px] font-black text-white shadow-brand">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="flex w-full flex-col gap-6 sm:max-w-lg p-0 border-l border-border">
                <div className="p-8 pb-0 space-y-2">
                  <SheetHeader>
                    <div className="flex items-center justify-between">
                      <SheetTitle className="text-3xl font-black tracking-tight text-dark uppercase">Your Cart</SheetTitle>
                      <div className="text-xs font-bold text-brand uppercase tracking-widest">{itemCount} Items</div>
                    </div>
                    <SheetDescription className="text-sm font-medium text-muted-foreground pt-1">
                      Your selected kits and professional trade rolls.
                    </SheetDescription>
                  </SheetHeader>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto px-8">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40 py-20 border-2 border-dashed border-border rounded-2xl">
                      <ShoppingBag className="w-16 h-16" />
                      <div className="space-y-1">
                        <p className="font-black text-xl uppercase">Your cart is empty</p>
                        <p className="text-sm">Start shopping for trade kits.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-5 rounded-2xl border border-border bg-muted/30 p-4 group hover:border-brand/30 transition-colors">
                          <div className="h-24 w-24 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                            <img src={item.image} alt={item.variantName} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="min-w-0 flex-1 space-y-1 py-1">
                            <div className="text-[10px] font-black uppercase tracking-widest text-brand opacity-60 leading-none mb-1">{item.sku}</div>
                            <h3 className="font-display font-black text-lg leading-tight text-dark">{item.variantName}</h3>
                            <div className="flex items-center justify-between pt-2">
                              <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Qty {item.quantity}</p>
                              <p className="font-black text-brand text-lg">{formatCurrency(item.price * item.quantity)}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="rounded-full hover:bg-red-50 hover:text-red-600 transition-colors" aria-label={`Remove ${item.variantName}`}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-8 pt-6 space-y-6 bg-muted/20 border-t border-border">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm font-bold uppercase tracking-widest text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="text-xl font-black text-dark">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-brand">
                      <span>GST (included)</span>
                      <span>{formatCurrency(subtotal * 0.1)}</span>
                    </div>
                  </div>
                  <Button asChild size="xl" className="w-full rounded-full bg-brand hover:bg-brand-dark text-white font-black uppercase tracking-widest shadow-brand h-14">
                    <Link href="/checkout">Go to Checkout</Link>
                  </Button>
                  <p className="text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Secure Checkout Powered by Stripe</p>
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden rounded-full border border-border h-12 w-12 hover:bg-brand/5">
                  <Menu className="h-5 w-5 text-dark" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col p-0 border-l border-border">
                <div className="p-8 space-y-2">
                  <SheetHeader className="text-left">
                    <SheetTitle className="text-3xl font-black tracking-tight text-dark uppercase">Navigation</SheetTitle>
                    <SheetDescription className="text-sm font-medium text-muted-foreground">
                      Browse the Elephant kit store.
                    </SheetDescription>
                  </SheetHeader>
                </div>
                <div className="flex-1 space-y-3 px-8">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between rounded-xl border border-border px-6 py-5 font-black text-dark text-sm uppercase tracking-[0.2em] transition-all hover:border-brand hover:bg-brand/5"
                      activeClassName="border-brand bg-brand/5 text-brand"
                    >
                      {item.label}
                      <ArrowRight className="w-4 h-4 opacity-30" />
                    </NavLink>
                  ))}
                </div>
                <div className="p-8 bg-muted/20 border-t border-border">
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand text-center">Australia's #1 Roof Seal Solution</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default SiteHeader;
