"use client";
import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    // Tambah min-h-[550px] untuk HP, dan py-20 agar ada ruang napas
    <section className="relative min-h-[550px] lg:h-[600px] w-full flex items-center px-6 md:px-12 py-20 lg:py-0 overflow-hidden bg-emerald-900">
      
      {/* Background Image dengan Overlay Gelap */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1590076175582-40940b43f021?auto=format&fit=crop&q=80&w=1600" 
          alt="Masjid Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900/70 to-transparent" />
      </div>

      {/* Konten Teks (Sisi Kiri) */}
      <div className="relative z-10 max-w-2xl text-white animate-in fade-in slide-in-from-left-8 duration-700">
        <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/20 text-yellow-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 md:mb-6 border border-yellow-500/30 shadow-sm">
          Pondok Pesantren Cendekia
        </span>
        
        {/* text-4xl di HP, md:text-5xl di Tablet, lg:text-6xl di Laptop */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 leading-[1.1] tracking-tight">
          Mencetak Generasi <br /> 
          <span className="text-yellow-500">Qur'ani & Beradab</span>
        </h2>
        
        {/* text-base di HP, md:text-lg di layar besar */}
        <p className="text-base md:text-lg text-emerald-50/90 mb-8 md:mb-10 leading-relaxed max-w-xl">
          Menggabungkan ketajaman intelektual dengan kedalaman spiritual melalui kurikulum Tahfidz Mutqin dan penguasaan Kitab Kuning.
        </p>
        
        {/* flex-col di HP (tombol atas bawah), sm:flex-row di layar agak besar (menyamping) */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-yellow-500 text-emerald-950 px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-yellow-400 hover:scale-105 transition-all shadow-lg shadow-yellow-500/20 w-full sm:w-auto">
            Daftar Sekarang <ArrowRight size={20} />
          </button>
          
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-white/20 transition-all w-full sm:w-auto">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Play size={16} fill="white" />
            </div>
            Video Profil
          </button>
        </div>
      </div>

      {/* Aksen Hiasan (Sisi Kanan) - Tampil di Layar Lebar Saja */}
      <div className="hidden lg:flex relative z-10 ml-auto items-center justify-center">
        {/* Lingkaran emas di belakang */}
        <div className="w-[400px] h-[400px] border-2 border-yellow-500/30 rounded-full absolute -top-10 -right-10 animate-pulse" />
        
        {/* Kotak tempat foto utama */}
        <div className="relative w-[350px] h-[450px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl rotate-3 flex items-center justify-center p-4 shadow-2xl hover:rotate-0 transition-all duration-500">
           <div className="w-full h-full bg-emerald-800/80 rounded-xl flex items-center justify-center border border-white/5 overflow-hidden">
              <p className="text-xs text-white/40 italic">Placeholder Foto Unggulan</p>
              {/* Nanti kalau ada foto asli, taruh tag <img> di sini dan hapus text placeholder-nya */}
           </div>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;