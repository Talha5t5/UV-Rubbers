"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, User, Box, Settings, LogOut } from "lucide-react";
import { SessionProvider, signOut } from "next-auth/react";

function AdminSidebar() {
    const pathname = usePathname();
    if (pathname === "/admin/login") return null;

    return (
        <aside className="w-64 bg-dark text-white min-h-screen p-6 border-r border-white/10 flex flex-col fixed left-0 top-0">
            <div className="mb-10">
                <div className="text-2xl font-black text-white hover:text-brand transition-colors uppercase tracking-widest leading-none">
                    Elephant
                </div>
                <div className="text-[10px] font-bold text-brand uppercase tracking-[0.3em]">
                    Admin Portal
                </div>
            </div>

            <nav className="flex-1 space-y-2">
                <Link href="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === "/admin" ? "bg-brand text-white font-bold" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                </Link>
                <Link href="/admin/products" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname.startsWith("/admin/products") ? "bg-brand text-white font-bold" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                    <Box className="w-5 h-5" />
                    Products
                </Link>
                <Link href="/admin/users" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname.startsWith("/admin/users") ? "bg-brand text-white font-bold" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                    <Users className="w-5 h-5" />
                    Users
                </Link>
                <Link href="/admin/settings" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname.startsWith("/admin/settings") ? "bg-brand text-white font-bold" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                    <Settings className="w-5 h-5" />
                    Settings
                </Link>
            </nav>

            <button onClick={() => signOut()} className="flex items-center gap-3 px-4 py-3 text-white/50 hover:text-red-400 transition-colors mt-auto w-full text-left">
                <LogOut className="w-5 h-5" />
                Log Out
            </button>
        </aside>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";

    return (
        <SessionProvider>
            <div className="min-h-screen bg-gray-50 flex">
                {!isLoginPage && <AdminSidebar />}
                <main className={`flex-1 ${!isLoginPage ? "ml-64 p-8" : "p-0"}`}>
                    {children}
                </main>
            </div>
        </SessionProvider>
    );
}
