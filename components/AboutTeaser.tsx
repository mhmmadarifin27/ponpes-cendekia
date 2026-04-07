"use client";
import React from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';

const AboutTeaser = () => {

  // --- KOMPONEN GAMBAR BISA DIPANGGIL ULANG ---
  // Kita jadikan variabel agar gampang dipindah posisinya antara HP dan Laptop
  const ImageFrame = () => (
    <div className="relative w-full">
      {/* Hiasan Lingkaran */}
      <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-24 h-24 md:w-32 md:h-32 bg-emerald-100 dark:bg-yellow-900/90 rounded-full -z-10" />
      
      {/* Container Gambar (Ditambah transform-gpu agar tidak berat/delay saat discroll) */}
      <div className="relative z-10 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-xl border-4 md:border-8 border-gray-50 dark:border-gray-900 transform-gpu">
        <img 
          // Ditambah &w=800 agar Unsplash mengirim gambar ukuran kecil, BUKAN 4K (Ini rahasia biar gak patah-patah)
          src="kegiatan santri.jpg" 
          alt="Kegiatan Santri Cendekia" 
          loading="lazy"
          className="w-full aspect-[4/5] object-cover hover:scale-110 transition-transform duration-700 transform-gpu"
        />
        {/* Badge Statistik Kecil */}
        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-yellow-500 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-lg hidden sm:block">
            <p className="text-emerald-950 font-black text-lg md:text-xl leading-none">100%</p>
            <p className="text-emerald-900 text-[9px] md:text-[10px] font-bold uppercase tracking-tight">Beasiswa Dhuafa</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 md:py-28 px-6 md:px-12 bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20">
        
        {/* ========================================================== */}
        {/* SISI KIRI: FOTO KHUSUS LAPTOP/DESKTOP (Disembunyikan di HP) */}
        {/* ========================================================== */}
        <div className="hidden md:block w-5/12">
          <ImageFrame />
        </div>

        {/* ========================================================== */}
        {/* SISI KANAN / TENGAH: KONTEN TEKS & FOTO KHUSUS HP */}
        {/* ========================================================== */}
        <div className="w-full md:w-7/12 flex flex-col">
          
          {/* 1. BAGIAN ATAS (Judul & Paragraf) */}
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">
              <Heart size={14} className="fill-current" /> Mengenal Lebih Dekat
            </div>

            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight">
              Rumah Bagi <span className="text-emerald-700 dark:text-yellow-500">Penjaga Al-Qur&apos;an</span> & Ilmu Pengetahuan.
            </h2>
            
            <div className="space-y-4 md:space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg">
              <p>
                Pondok Pesantren Cendekia lahir dari sebuah mimpi sederhana: menghadirkan tempat belajar yang nyaman di mana iman, ilmu, dan adab tumbuh bersama dalam harmoni.
              </p>
              <p>
                Bukan sekadar menghafal, kami mengajak santri menyelami makna setiap ayat dan mengaplikasikannya dalam kehidupan modern. Di sini, karakter dibentuk melalui keteladanan, dan masa depan dirancang dengan penguasaan teknologi serta bahasa internasional.
              </p>
            </div>
          </div>

          {/* ========================================================== */}
          {/* FOTO KHUSUS HP (Muncul di tengah teks, disembunyikan di Laptop) */}
          {/* ========================================================== */}
          <div className="block md:hidden w-full my-10 px-2">
            <ImageFrame />
          </div>

          {/* 2. BAGIAN BAWAH (Quote Mudir & Tombol) */}
          <div>
            {/* SIGNATURE MUDIR */}
            <div className="mt-2 md:mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
               <p className="text-emerald-900 dark:text-gray-300 font-serif italic text-lg leading-relaxed">
                 &quot;Kami mendidik bukan hanya agar mereka pintar secara logika, tapi juga bercahaya secara akhlak.&quot;
               </p>
               <div className="mt-4 flex items-center gap-4">
                  <div className="w-10 h-px bg-yellow-500" />
                  <p className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">KH. Ahmad Ridwan, Lc.</p>
               </div>
            </div>
            
            <Link 
              href="/tentang" 
              className="group inline-flex items-center justify-center gap-3 mt-10 md:mt-12 bg-yellow-500 text-emerald-950 px-8 py-4 rounded-xl font-bold hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-xl shadow-yellow-500/30 active:scale-95 text-base md:text-lg w-fit whitespace-nowrap"
              >
              Baca Sejarah Lengkap
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutTeaser;