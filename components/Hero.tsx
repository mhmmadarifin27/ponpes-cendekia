"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, ChevronRight } from 'lucide-react';

const Hero = () => {
  // Data foto galeri
  const photos = [
    { id: 1, src: "foto1.png", alt: "Santri Belajar" },
    { id: 2, src: "foto2.png", alt: "Perpustakaan" },
    { id: 3, src: "foto3.png", alt: "Gedung Pesantren" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Fungsi untuk ke foto berikutnya
  const nextSlide = () => {
    setActiveIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  // Auto play setiap 5 detik
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section className="relative min-h-screen lg:h-[750px] w-full flex flex-col lg:flex-row items-center px-6 md:px-12 py-24 lg:py-0 overflow-hidden bg-emerald-900 dark:bg-slate-950 transition-colors duration-500">
      
      {/* --- PERBAIKAN: Background Image & Overlay --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src="bghero.png" 
          alt="Masjid Background" 
          className="w-full h-full object-cover opacity-100 dark:opacity-100"
        />
        {/* Gradient disesuaikan ketebalannya agar gambar barumu tetap terekspos dengan indah */}
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-emerald-950/40 via-emerald-900/50 dark:from-slate-950/40 dark:via-slate-900/70 to-transparent" />
      </div>

      {/* --- KONTEN TEKS (Kiri) --- */}
      <div className="relative z-10 w-full lg:w-3/5 text-white animate-in fade-in slide-in-from-left-8 duration-1000">
        <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/20 text-yellow-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 border border-yellow-500/30 shadow-sm">
          Pondok Pesantren Cendekia
        </span>
        
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight">
          Mencetak Generasi <br /> 
          <span className="text-yellow-500 drop-shadow-sm">Qur'ani & Beradab</span>
        </h2>
        
        <p className="text-base md:text-lg text-emerald-50/70 dark:text-slate-400 mb-10 leading-relaxed max-w-xl font-medium">
          Menggabungkan ketajaman intelektual dengan kedalaman spiritual melalui kurikulum Tahfidz Mutqin dan penguasaan Kitab Kuning.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-16 lg:mb-0">
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

      {/* --- AKSEN STACKED SLIDER (Kanan) --- */}
      <div className="relative z-10 w-full lg:w-2/5 flex flex-col items-center justify-center mt-10 lg:mt-0 h-[400px] lg:h-[500px]">
        
        {/* Container Utama Slider */}
        <div className="relative w-[280px] h-[360px] lg:w-[350px] lg:h-[450px] perspective-1000">
          {photos.map((photo, index) => {
            // Logika tumpukan kartu
            const isTop = index === activeIndex;
            const isNext = index === (activeIndex + 1) % photos.length;
            const isBack = index === (activeIndex + 2) % photos.length;

            let styleClass = "opacity-0 scale-90 translate-x-12 z-0";
            if (isTop) styleClass = "opacity-100 scale-100 translate-x-0 z-30 rotate-0 shadow-2xl";
            if (isNext) styleClass = "opacity-60 scale-95 translate-x-8 z-20 rotate-3 translate-y-4";
            if (isBack) styleClass = "opacity-30 scale-90 translate-x-16 z-10 rotate-6 translate-y-8";

            return (
              <div
                key={photo.id}
                onClick={nextSlide}
                className={`absolute inset-0 transition-all duration-700 ease-in-out cursor-pointer overflow-hidden rounded-[2rem] border-2 border-white/10 ${styleClass}`}
              >
                <img 
                  src={photo.src} 
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
                {/* Overlay teks tipis pada kartu teratas */}
                {isTop && (
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-transparent to-transparent flex flex-col justify-end p-6">
                    <p className="text-white font-bold text-sm lg:text-base">{photo.alt}</p>
                    <p className="text-yellow-400 text-[10px] uppercase tracking-widest">Galeri Cendekia</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tombol Next Manual & Indikator */}
        <div className="flex items-center gap-6 mt-12 animate-in fade-in duration-1000">
           <div className="flex gap-2">
              {photos.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 transition-all duration-300 rounded-full ${i === activeIndex ? 'w-8 bg-yellow-500' : 'w-2 bg-white/20'}`} 
                />
              ))}
           </div>
           <button 
            onClick={nextSlide}
            className="w-12 h-12 text-white bg-white/10 hover:bg-yellow-500 hover:text-emerald-950 transition-all rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md group"
           >
             <ChevronRight className="group-hover:translate-x-0.5 transition-transform" />
           </button>
        </div>

        {/* Lingkaran hiasan di belakang slider */}
        <div className="w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] border-2 border-yellow-500/40 rounded-full absolute -z-10 animate-pulse" />
      </div>

    </section>
  );
};

export default Hero;