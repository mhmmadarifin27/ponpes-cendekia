import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. Import ThemeProvider yang sudah kita buat tadi
import { ThemeProvider } from "./components/ThemeProvider"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // 2. Ubah judul tab browser biar pro
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
        </ThemeProvider>
      </body>
    </html>
  );
}