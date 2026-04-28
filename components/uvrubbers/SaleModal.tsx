"use client";

import { useEffect, useState } from "react";
import { X, Sparkles, Percent, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface SaleModalProps {
    settings: {
        globalSaleActive: boolean;
        globalSalePercent: number;
        globalSaleLabel?: string;
    } | null;
}

export default function SaleModal({ settings }: SaleModalProps) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!settings?.globalSaleActive) return;

        // Delay a bit for better UX
        const timer = setTimeout(() => {
            setOpen(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, [settings]);

    const handleClose = () => {
        setOpen(false);
    };

    if (!settings?.globalSaleActive) return null;

    return (
        <Dialog open={open} onOpenChange={(val) => { if (!val) handleClose(); }}>
            <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[2.5rem] bg-transparent">
                <DialogTitle className="sr-only">Site-wide Sale Event</DialogTitle>
                <div className="relative bg-orange-600 p-12 text-white overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/20 rounded-full blur-3xl pointer-events-none" />

                    <button
                        onClick={handleClose}
                        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                        <div className="w-20 h-20 rounded-3xl bg-white shadow-2xl flex items-center justify-center text-orange-600 animate-bounce-slow">
                            <Percent className="w-10 h-10 stroke-[3]" />
                        </div>

                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
                                <Sparkles className="w-3.5 h-3.5 fill-current" />
                                Limited Time Event
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.8]">
                                {settings.globalSaleLabel || "Flash Sale"}<br />
                                <span className="text-black/30">Is Live!</span>
                            </h2>
                            <p className="text-orange-100 text-lg md:text-xl font-bold max-w-md mx-auto leading-relaxed">
                                Professional grade roof seal kits now available at <span className="text-white underline underline-offset-8 decoration-white/30">{settings.globalSalePercent}% OFF</span> site-wide.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <Button
                                size="xl"
                                className="rounded-full bg-white text-orange-600 hover:bg-orange-50 h-16 px-10 font-black uppercase tracking-widest shadow-2xl group transition-all"
                                onClick={handleClose}
                            >
                                Claim Discount
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>

                        <p className="text-[10px] font-black uppercase tracking-widest text-white/50 pt-4">
                            *Discount applied automatically at checkout
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
