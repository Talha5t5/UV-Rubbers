"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError("Invalid email or password");
            setLoading(false);
        } else {
            router.push("/admin");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-brand/5 opacity-50" />

            <div className="bg-white max-w-md w-full rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 relative z-10">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-brand/20">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-dark">Admin Access</h1>
                    <p className="text-muted-foreground text-sm font-medium mt-2">Secure portal for UV Rubbers management</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 mb-6 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-600" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 flex flex-col">
                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                        <div className="relative flex">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full h-14 pl-12 pr-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all font-medium text-dark"
                                placeholder="admin@uvrubbers.com.au"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5 flex flex-col pt-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
                        <div className="relative flex">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full h-14 pl-12 pr-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all font-medium text-dark"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <Button
                        disabled={loading}
                        className="w-full h-14 mt-4 rounded-xl bg-brand hover:bg-brand-dark text-white font-black uppercase tracking-widest text-sm shadow-brand transition-all flex items-center justify-center"
                    >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Sign In"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
