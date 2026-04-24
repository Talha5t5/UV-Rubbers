import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/components/uvrubbers/productData";

const SiteFooter = () => {
  return (
    <footer className="bg-dark pt-24 text-white/70">
      <div className="section-shell">
        <div className="grid gap-16 pb-16 md:grid-cols-[2fr_1fr_1fr_1.5fr]">
          <div className="space-y-8">
            <Link href="/" className="flex items-center group">
              <div className="space-y-0.5">
                <div className="text-2xl font-black text-white hover:text-brand transition-colors uppercase tracking-widest leading-none">
                  UV Rubbers
                </div>
                <div className="text-[10px] font-bold text-brand uppercase tracking-[0.3em]">
                  Quality Driven Technology
                </div>
              </div>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed">
              UV Rubbers was born from a simple frustration — there had to be a better, cleaner way to seal air conditioning roof penetrations in Australia.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-brand hover:text-white hover:border-brand transition-all duration-300"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Products</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-white/50">
              <li><Link href="/products" className="hover:text-brand transition-colors">All Products</Link></li>
              <li><Link href="/products" className="hover:text-brand transition-colors">Seal Kits</Link></li>
              <li><Link href="/products" className="hover:text-brand transition-colors">Trade Rolls</Link></li>
              <li><Link href="/products" className="hover:text-brand transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Company</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-white/50">
              <li><Link href="/about" className="hover:text-brand transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-brand transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-brand transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-brand transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand/10 border border-brand/20 text-brand">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Call Support</p>
                  <p className="text-sm font-bold text-white">1300 ELEPHANT</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand/10 border border-brand/20 text-brand">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Email Us</p>
                  <p className="text-sm font-bold text-white">info@uvrubbers.com.au</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand/10 border border-brand/20 text-brand">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Head Office</p>
                  <p className="text-sm font-bold text-white leading-relaxed">Melbourne, VIC<br />Australia</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-8 border-t border-white/5 py-12 md:flex-row md:items-center md:justify-between">
          <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest">
            © {new Date().getFullYear()} UV Rubbers Pty Ltd. ABN 12 345 678 901. Australia's #1 Roof Seal Solution.
          </p>
          <div className="flex flex-wrap gap-8">
            <Link href="/privacy" className="text-[11px] font-bold text-white/30 uppercase tracking-widest hover:text-brand transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[11px] font-bold text-white/30 uppercase tracking-widest hover:text-brand transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
