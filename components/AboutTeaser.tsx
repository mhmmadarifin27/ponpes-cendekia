"use client";
import React from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';

const AboutTeaser = () => {
  
  // --- ELEMEN FOTO (Dibuat variabel agar bisa dipanggil 2 kali untuk beda layar) ---
  // Desain diperingan: Border lebih tipis (border-4), shadow lebih lembut, dan efek offset background.
  const PhotoFrame = (
    <div className="relative w-full max-w-md mx-auto md:max-w-none">
      {/* Aksen bayangan offset yang ringan dan modern (pengganti shadow tebal) */}
      <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/30 rounded-3xl transform translate-x-3 translate-y-3 -z-10 transition-transform hover:translate-x-4 hover:translate-y-4"></div>
      
      <div className="relative z-10 rounded-3xl overflow-hidden shadow-lg border-4 border-white dark:border-gray-800 bg-white">
        {/* Ganti dengan foto santri sedang belajar atau cium tangan guru */}
        <img 
          src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80" 
          alt="Kegiatan Santri Cendekia" 
          className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
        />
        {/* Badge Statistik (Dibuat lebih flat & elegan) */}
        <div className="absolute bottom-5 left-5 bg-yellow-500/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-md hidden sm:block border border-yellow-400">
            <p className="text-emerald-950 font-black text-lg leading-none">100%</p>
            <p className="text-emerald-900 text-[9px] font-bold uppercase tracking-tight mt-1">Beasiswa Dhuafa</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 md:py-28 px-6 md:px-12 bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12 lg:gap-20">
        
        {/* ======================================================= */}
        {/* SISI KIRI (HANYA MUNCUL DI LAPTOP/DESKTOP) */}
        {/* ======================================================= */}
        <div className="hidden md:block w-full md:w-5/12 shrink-0">
          {PhotoFrame}
        </div>

        {/* ======================================================= */}
        {/* SISI KANAN: KONTEN TEKS */}
        {/* ======================================================= */}
        <div className="w-full md:w-7/12 flex flex-col">
          
          <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">
            <Heart size={14} className="fill-current" /> Mengenal Lebih Dekat
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 dark:text-white mb-6 lg:mb-8 leading-tight">
            Rumah Bagi <span className="text-emerald-700 dark:text-yellow-500">Penjaga Al-Qur&apos;an</span> & Ilmu Pengetahuan.
          </h2>
          
          <div className="space-y-5 lg:space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg">
            <p>
              Pondok Pesantren Cendekia lahir dari sebuah mimpi sederhana: menghadirkan tempat belajar yang nyaman di mana iman, ilmu, dan adab tumbuh bersama dalam harmoni.
            </p>
            <p>
              Bukan sekadar menghafal, kami mengajak santri menyelami makna setiap ayat dan mengaplikasikannya dalam kehidupan modern. Di sini, karakter dibentuk melalui keteladanan, dan masa depan dirancang dengan penguasaan teknologi serta bahasa internasional.
            </p>
          </div>

          {/* ======================================================= */}
          {/* FOTO MUNCUL DI SINI KHUSUS UNTUK HP (MOBILE ONLY) */}
          {/* ======================================================= */}
          <div className="block md:hidden w-full my-10">
            {PhotoFrame}
          </div>

          {/* ======================================================= */}
          {/* SIGNATURE MUDIR (Sentuhan Personal) */}
          {/* ======================================================= */}
          <div className="mt-2 md:mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
             <p className="text-emerald-900 dark:text-gray-300 font-serif italic text-lg leading-relaxed">
               &quot;Kami mendidik bukan hanya agar mereka pintar secara logika, tapi juga bercahaya secara akhlak.&quot;
             </p>
             <div className="mt-5 flex items-center gap-4">
                <div className="w-10 h-px bg-yellow-500" />
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest leading-none">KH. Ahmad Ridwan, Lc.</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Mudir Pondok Pesantren Cendekia</p>
                </div>
             </div>
          </div>
          
          {/* TOMBOL */}
          <Link 
            href="/tentang" 
            className="inline-flex items-center justify-center sm:justify-start gap-3 mt-12 bg-emerald-50 dark:bg-gray-800 text-emerald-700 dark:text-emerald-400 font-bold py-4 px-8 rounded-2xl hover:bg-emerald-700 hover:text-white dark:hover:bg-emerald-700 transition-all duration-300 group shadow-sm w-full sm:w-max"
          >
            Baca Sejarah Lengkap
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </Link>
          
        </div>

      </div>
    </section>
  );
};

export default AboutTeaser;