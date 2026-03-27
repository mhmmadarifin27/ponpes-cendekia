"use client";
import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    // Kita pakai flex-col agar di HP kontennya berurutan dari atas ke bawah
    <section className="relative min-h-screen lg:h-[700px] w-full flex flex-col lg:flex-row items-center px-6 md:px-12 py-24 lg:py-0 overflow-hidden bg-emerald-900 dark:bg-slate-950 transition-colors duration-500">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1590076175582-40940b43f021?auto=format&fit=crop&q=80&w=1600" 
          alt="Masjid Background" 
          className="w-full h-full object-cover opacity-30 lg:opacity-40"
        />
        {/* Gradient overlay dipertebal di bawah untuk transisi yang mulus di HP */}
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-emerald-950 via-emerald-900/80 dark:from-slate-950 dark:via-slate-900/90 to-transparent" />
      </div>

      {/* --- KONTEN TEKS --- */}
      <div className="relative z-10 w-full lg:w-3/5 text-white animate-in fade-in slide-in-from-left-8 duration-1000">
        <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/20 text-yellow-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 border border-yellow-500/30 shadow-sm">
          Pondok Pesantren Cendekia
        </span>
        
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight">
          Mencetak Generasi <br /> 
          <span className="text-yellow-500 drop-shadow-sm">Qur'ani & Beradab</span>
        </h2>
        
        <p className="text-base md:text-lg text-emerald-50/80 dark:text-slate-300 mb-10 leading-relaxed max-w-xl">
          Menggabungkan ketajaman intelektual dengan kedalaman spiritual melalui kurikulum Tahfidz Mutqin dan penguasaan Kitab Kuning.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-12 lg:mb-0">
          <button className="bg-yellow-500 text-emerald-950 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-yellow-400 hover:scale-105 transition-all shadow-lg shadow-yellow-500/20 w-full sm:w-auto">
            Daftar Sekarang <ArrowRight size={20} />
          </button>
          
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-white/20 transition-all w-full sm:w-auto">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Play size={16} fill="white" />
            </div>
            Video Profil
          </button>
        </div>
      </div>

      {/* --- AKSEN GAMBAR (Sekarang muncul di HP) --- */}
      <div className="relative z-10 w-full lg:w-2/5 flex justify-center lg:justify-end items-center mt-10 lg:mt-0 animate-in fade-in slide-in-from-bottom-8 lg:slide-in-from-right-8 duration-1000 delay-300">
        
        {/* Lingkaran emas hiasan - Ukuran disesuaikan untuk HP */}
        <div className="w-[280px] h-[280px] lg:w-[450px] lg:h-[450px] border-2 border-yellow-500/20 rounded-full absolute animate-pulse" />
        
        {/* Kotak Foto Utama */}
        <div className="relative w-[260px] h-[340px] lg:w-[380px] lg:h-[480px] bg-white/5 backdrop-blur-md border border-white/20 rounded-3xl lg:rotate-3 flex items-center justify-center p-3 shadow-2xl hover:rotate-0 transition-all duration-700 group">
           <div className="w-full h-full bg-emerald-800/40 dark:bg-slate-800/60 rounded-2xl flex flex-col items-center justify-center border border-white/10 overflow-hidden relative">
              
              {/* Overlay Efek Kaca saat di-hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/40">
                  <span className="text-yellow-500 font-bold">Az</span>
                </div>
                <p className="text-[10px] lg:text-xs text-white/60 font-medium tracking-widest uppercase mb-1">Featured Gallery</p>
                <p className="text-xs lg:text-sm text-white/40 italic">Klik untuk melihat galeri santri</p>
              </div>

           </div>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;