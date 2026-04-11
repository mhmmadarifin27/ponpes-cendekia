import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Pastikan path ThemeProvider ini benar sesuai letak folder kamu
import { ThemeProvider } from "../components/ThemeProvider"; 
import { Analytics } from "@vercel/analytics/react"; // <-- 1. Import Vercel Analytics
import FloatingWhatsApp from "../components/FloatingWhatsApp"; // <-- 2. Import Tombol WhatsApp Melayang

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ponpes Cendekia", 
  description: "Website Resmi Pondok Pesantren Cendekia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id" 
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning 
    >
      {/* KUNCI UTAMA DI SINI: Tambahkan overflow-x-hidden dan w-full */}
      <body className="min-h-full flex flex-col overflow-x-hidden w-full">
        <ThemeProvider>
          {children}
          {/* Taruh komponen Analytics di bawah children */}
          <Analytics /> 
          
          {/* Taruh komponen FloatingWhatsApp di sini agar muncul di semua halaman */}
          <FloatingWhatsApp />
        </ThemeProvider>
      </body>
    </html>
  );
}