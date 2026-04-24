import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: "UW Rubber - E-Commerce Website",
    description: "Quality Driven Technology for Rubber Solutions",
    openGraph: {
        title: "UW Rubber",
        description: "Quality Driven Technology for Rubber Solutions",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} font-sans`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
