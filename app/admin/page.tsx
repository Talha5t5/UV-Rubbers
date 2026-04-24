"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box, Users, ShoppingCart, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

    if (status === "loading" || !session) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fadeInUp">
            <div>
                <h1 className="text-4xl font-black text-dark uppercase tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground mt-2 font-medium">Welcome back, {session.user?.name}. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Revenue", value: "$12,450", icon: TrendingUp, trend: "+12%" },
                    { label: "Active Products", value: "8", icon: Box, trend: "Stable" },
                    { label: "Total Orders", value: "142", icon: ShoppingCart, trend: "+5%" },
                    { label: "Registered Users", value: "24", icon: Users, trend: "+2" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex flex-col pt-8 relative overflow-hidden group">
                        <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div className="text-3xl font-black text-dark tracking-tight">{stat.value}</div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</div>
                        <div className="absolute top-6 right-6 text-xs font-bold text-green-500 bg-green-50 px-2.5 py-1 rounded-full">
                            {stat.trend}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100 mt-8">
                <h2 className="text-xl font-black uppercase tracking-tight mb-6">Recent Activity</h2>
                <div className="space-y-4">
                    <p className="text-muted-foreground font-medium text-sm">No recent activity found. Connect Stripe to see live orders.</p>
                </div>
            </div>
        </div>
    );
}
