"use client";
import React, { useEffect } from 'react';
import { MapPin, Phone, MessageCircle, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Contact = () => {

  // --- EFEK ANIMASI SCROLL ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
          entry.target.classList.remove('opacity-0', 'translate-y-20', 'scale-95');
        }
      });
    }, { threshold: 0.1 }); // Threshold diperkecil biar animasi muncul lebih cepat

    // Gunakan selektor yang lebih spesifik
    const animatedItems = document.querySelectorAll('.animate-on-scroll-contact');
    animatedItems.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="kontak" className="py-24 md:py-32 px-6 md:px-12 bg-slate-50 dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
      
      {/* Container Utama (max-w-7xl biar lega) */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16">
        
        {/* ============================================================= */}
        {/* SISI KIRI: INFORMASI KONTAK (Panel Berdesain Bersih & Profesional) */}
        {/* ============================================================= */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-8 justify-center">
          
          {/* Header Panel (Animasi translate-y biasa) */}
          <div className="animate-on-scroll-contact opacity-0 translate-y-20 transition-all duration-1000 ease-out mb-4">
            <p className="text-emerald-700 dark:text-yellow-500 font-bold uppercase tracking-[0.2em] text-[11px] mb-3">
              Informasi & Bantuan
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-emerald-950 dark:text-white tracking-tighter mb-5">
              Hubungi Pesantren
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
              Siap melayani pertanyaan Anda terkait pendaftaran santri baru, program, maupun kunjungan ke lokasi pesantren kami di Palembang.
            </p>
          </div>

          {/* Kartu-Kartu Informasi (Dibuat lebih lega dengan p-7) */}
          <div className="space-y-6">
            
            {/* Card 1: Alamat */}
            <div className="animate-on-scroll-contact opacity-0 translate-y-20 transition-all duration-1000 ease-out delay-100 bg-white dark:bg-gray-900 p-7 rounded-[1.5rem] border border-gray-100 dark:border-gray-800 flex gap-6 group hover:shadow-lg hover:border-emerald-200 transition-all">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-yellow-500 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg mb-1.5">Lokasi Pesantren</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm leading-relaxed">
                  Pondok Pesantren Cendekia Baznas, Kota Palembang.<br /> (Area UIN Raden Fatah / Pusat Kota)
                </p>
              </div>
            </div>

            {/* Card 2: WhatsApp Admin (Tata Letak Lega sm:flex) */}
            <div className="animate-on-scroll-contact opacity-0 translate-y-20 transition-all duration-1000 ease-out delay-200 bg-white dark:bg-gray-900 p-7 rounded-[1.5rem] border border-gray-100 dark:border-gray-800 flex gap-6 group hover:shadow-lg hover:border-emerald-200 transition-all">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-yellow-500 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <div className="flex-grow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg mb-1.5">Admin PPDB (Nanda)</h3>
                  <p className="font-semibold text-sm md:text-base text-gray-800 dark:text-gray-200 tracking-wider">0852-6796-2898</p>
                </div>
                <a href="https://wa.me/6285267962898" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-xs font-bold bg-yellow-500 text-emerald-950 px-5 py-3 rounded-xl hover:bg-yellow-400 transition-colors shadow-sm shrink-0 whitespace-nowrap active:scale-95">
                  <MessageCircle size={16} /> Chat WhatsApp
                </a>
              </div>
            </div>

            {/* Card 3: Jadwal Operasional & Kunjung */}
            <div className="animate-on-scroll-contact opacity-0 translate-y-20 transition-all duration-1000 ease-out delay-300 bg-white dark:bg-gray-900 p-7 rounded-[1.5rem] border border-gray-100 dark:border-gray-700 flex gap-6 group hover:shadow-lg hover:border-emerald-200 transition-all">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-yellow-500 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg mb-1.5">Jam Operasional & Kunjung</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-2"><span className="font-semibold text-gray-800 dark:text-gray-100">Senin - Jum'at:</span> 08.00 - 15.00 WIB (Layanan Informasi)</p>
                <p className="text-xs md:text-sm text-emerald-800 dark:text-emerald-400 font-semibold leading-relaxed">Jadwal Kunjungan Wali Santri: Setiap Ahad (Minggu) pekan ke-2 & ke-4.</p>
              </div>
            </div>

          </div>
        </div>

       {/* ============================================================== */}
        {/* SISI KANAN: AJAKAN DAFTAR (Kotak Hijau Tua Monolitik & Standout) */}
        {/* ============================================================== */}
        <div className="w-full lg:w-1/2 bg-emerald-800 dark:bg-gray-900 rounded-[2.5rem] shadow-2xl p-10 md:p-16 flex flex-col justify-center animate-on-scroll-contact opacity-0 translate-y-20 lg:translate-y-0 lg:scale-95 transition-all duration-1000 ease-out delay-400 overflow-hidden relative group border border-emerald-700/50 dark:border-gray-800">
          
          {/* ==================================================== */}
          {/* EFEK BACKGROUND BARU (Pure CSS - Anti Gagal/Error) */}
          {/* ==================================================== */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Efek Cahaya Kuning di Kanan Atas */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-yellow-500/30 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000 ease-out" />
            
            {/* Efek Cahaya Hijau Terang di Kiri Bawah */}
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-400/20 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000 ease-out" />
            
            {/* Pola Titik Elegan (CSS Grid Pattern) */}
            <div 
              className="absolute inset-0 opacity-[0.08] dark:opacity-[0.03]" 
              style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '24px 24px' }}
            />
          </div>
          
          {/* Konten CTA (Wajib relative z-10 biar di atas efek) */}
          <div className="relative z-10">
            
            {/* Kumpulan Gambar Logo & Teks Pendaftaran */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              
              {/* Box Logo Cendekia & Baznas (Dengan efek kaca tipis) */}
              <div className="flex items-center gap-2 shrink-0 bg-white/10 dark:bg-black/20 p-2.5 rounded-2xl backdrop-blur-sm border border-white/10">
                {/* 1. Logo Utama (Cendekia) */}
                <img 
                  src="/logo.png" 
                  alt="Logo Pondok Pesantren Cendekia" 
                  className="h-10 md:h-12 w-auto object-contain drop-shadow-md"
                />
                
                {/* Garis Pemisah */}
                <div className="h-8 w-[1.5px] bg-emerald-500/50 dark:bg-gray-600 rounded-full mx-0.5" />

                {/* 2. Logo BAZNAS */}
                <img 
                  src="/logo baznas.png" 
                  alt="Logo Baznas" 
                  className="h-8 md:h-12 w-auto object-contain drop-shadow-md"
                />
              </div>

              {/* Teks Pendamping (Pendaftaran) */}
              <div className="flex flex-col justify-center">
                {/* Diubah jadi text-white agar terbaca jelas di background gelap */}
                <h1 className="text-white font-black text-lg md:text-xl leading-none tracking-tight">Pondok Pesantren</h1>
                <p className="text-[9px] md:text-[11px] text-yellow-500 font-bold uppercase tracking-widest mt-1">
                  Cendekia Baznas
                </p>
              </div>

            </div>

            {/* Judul CTA */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 tracking-tighter">
              Siap Menjadi Bagian Dari <span className="text-yellow-400">Generasi Qur'ani</span> & Berwawasan Global?
            </h3>

            {/* Deskripsi CTA */}
            <p className="text-emerald-100 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-12 opacity-95 max-w-xl">
              Bergabunglah bersama keluarga besar Pondok Pesantren Cendekia Palembang. Kami berkomitmen mendidik generasi huffadz Al-Qur'an yang cerdas logika, mulia akhlak, dan siap hadapi teknologi masa depan.
            </p>

            {/* Tombol Pendaftaran */}
            <Link 
              href="https://wa.me/6285267962898?text=Assalamu'alaikum,%20saya%20ingin%20mendaftar%20di%20Ponpes%20Cendekia." 
              target="_blank" 
              className="group inline-flex items-center justify-center gap-3 bg-yellow-500 text-emerald-950 px-9 py-5 rounded-xl font-bold hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-xl shadow-yellow-500/30 active:scale-95 text-lg md:text-xl w-full sm:w-auto whitespace-nowrap"
              >
              Daftar Sekarang
              <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
        </div>
    </section>
  );
};

export default Contact;