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
      lang="id" // Ubah ke "id" karena web kita bahasa Indonesia
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning // 3. WAJIB ADA untuk next-themes agar tidak eror
    >
      <body className="min-h-full flex flex-col">
        {/* 4. Bungkus aplikasi kita dengan ThemeProvider */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}