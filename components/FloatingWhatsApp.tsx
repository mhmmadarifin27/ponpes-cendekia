"use client"; // Wajib ditambahkan karena kita menggunakan hooks Next.js
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation'; // Import pendeteksi URL

const FloatingWhatsApp = () => {
  const pathname = usePathname();

  // --- LOGIKA PENYEMBUNYIAN ---
  // Jika URL saat ini adalah /login atau berawalan /admin, jangan render apa-apa (return null)
  if (pathname === '/login' || pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <a
      // Ganti nomor ini kalau mau diarahkan ke nomor lain, formatnya 628...
      href="https://wa.me/6285267962898?text=Assalamu'alaikum,%20saya%20ingin%20bertanya%20seputar%20pendaftaran%20Ponpes%20Cendekia."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[100] group flex items-center justify-center"
      aria-label="Hubungi via WhatsApp"
    >
      {/* 1. Efek Pendaran / Pulsing (Gelombang yang menyebar) */}
      <span className="absolute w-14 h-14 bg-emerald-500 rounded-full animate-ping opacity-60 group-hover:animate-none"></span>

      {/* 2. Tombol Utama (Solid) */}
      <div className="relative w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl group-hover:bg-emerald-700 group-hover:scale-110 active:scale-90 transition-all duration-300 border-2 border-white dark:border-gray-800">
        <MessageCircle size={28} className="fill-current" />
      </div>
    </a>
  );
};

export default FloatingWhatsApp;