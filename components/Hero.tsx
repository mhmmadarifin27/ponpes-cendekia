"use client";
import React, { useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  // --- EFEK ANIMASI SCROLL UNTUK KONTEN TEKS SAJA ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-16');
        }
      });
    }, { threshold: 0.15 });

    const animatedItems = document.querySelectorAll('.animate-on-scroll-hero');
    animatedItems.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full flex flex-col justify-center bg-white dark:bg-gray-900 transition-colors duration-500 overflow-hidden text-center pb-20 md:pb-28">
      
     {/* ========================================================= */}
      {/* BACKGROUND HIJAU CEKUNG + GAMBAR PONPES (BLEND MODE) */}
      {/* ========================================================= */}
      {/* Tambahkan dark:bg-slate-950 agar berubah gelap di dark mode */}
      <div className="absolute inset-0 z-0 bg-emerald-950 dark:bg-slate-950 overflow-hidden transition-colors duration-500">
        
        {/* Opacity gambar bisa diturunkan sedikit di dark mode (dark:opacity-40) agar tidak menyilaukan */}
        <img 
          src="bgfooter4.png" 
          alt="Latar Belakang Pondok Pesantren Cendekia" 
          className="w-full h-full object-cover opacity-60 dark:opacity-40 transform scale-105 transition-opacity duration-500" 
        />
        
        {/* Gradient disesuaikan untuk dark mode (dark:from-slate-950/80 dll) */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/60 via-emerald-900/40 dark:from-slate-950/80 dark:via-slate-900/60 to-transparent transition-colors duration-500" />
        
        {/* Aksen kilauan kuning ditipiskan menjadi 5% agar sangat halus */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[150px]" />
      </div>

      {/* ========================================================= */}
      {/* BENTUK CEKUNGAN (KURVA) PEMISAH DI BAWAH (PUTIH) */}
      {/* ========================================================= */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
        {/* SVG ini membentuk kurva lengkung ke bawah. Warna fill disamakan dengan background section di bawahnya */}
        <svg 
          viewBox="0 0 1440 100" 
          fill="currentColor" 
          preserveAspectRatio="none" 
          className="w-full h-[40px] md:h-[80px] lg:h-[120px] text-white dark:text-gray-900"
        >
          <path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z"></path>
        </svg>
      </div>

      {/* ========================================================= */}
      {/* CONTAINER UTAMA KONTEN (TERPUSAT) */}
      {/* ========================================================= */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 pt-28 flex flex-col items-center">
        
        {/* JUDUL UTAMA (Typography Premium, tracking-tighter biar padat) */}
        {/* Tetap menggunakan animasi */}
        <h2 className="animate-on-scroll-hero opacity-0 translate-y-16 transition-all duration-1000 ease-out fill-mode-both text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-8 leading-[1.1] max-w-5xl">
          Mencetak Generasi <br /> 
          <span className="text-yellow-400">Qur'ani & Beradab</span>
        </h2>

        {/* DESKRIPSI UTAMA (max-w-3xl agar nyaman dibaca penuh) */}
        {/* Tetap menggunakan animasi dengan delay sedikit */}
        <p className="animate-on-scroll-hero opacity-0 translate-y-16 transition-all duration-1000 ease-out delay-200 fill-mode-both text-base md:text-lg text-emerald-50 mb-14 leading-relaxed max-w-3xl opacity-90">
          Menggabungkan ketajaman intelektual dengan kedalaman spiritual melalui kurikulum Tahfidz Mutqin dan penguasaan Kitab Kuning untuk masa depan global. Bergabunglah bersama kami membangun generasi masa depan yang kokoh iman dan ilmu.
        </p>
        
        {/* TOMBOL AKSI TERPUSAT */}
        {/* Animasi DIHAPUS agar langsung muncul tanpa delay */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto justify-center items-center">
          {/* TOMBOL 1: DAFTAR (Kuning Mencolok) */}
          <Link 
            href="/penerimaan" 
            className="group bg-yellow-500 text-emerald-950 px-9 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-yellow-400 hover:scale-105 transition-all shadow-xl shadow-yellow-500/30 w-full sm:w-auto active:scale-95 text-base md:text-lg whitespace-nowrap"
          >
            Daftar Sekarang 
            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
          
          {/* TOMBOL 2: VIDEO PROFIL (Glassmorphism Transparan) */}
          <a 
            href="https://youtube.com/link-video-ponpes-kamu-disini" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-white/10 backdrop-blur-md border border-white/20 text-white px-9 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-white/20 transition-all w-full sm:w-auto active:scale-95 text-base md:text-lg whitespace-nowrap"
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play size={16} fill="currentColor" />
            </div>
            Video Profil Pesantren
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;