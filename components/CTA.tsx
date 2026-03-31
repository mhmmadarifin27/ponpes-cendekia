"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTA = () => {

  // Efek Animasi Muncul
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
          entry.target.classList.remove('opacity-0', 'translate-y-24', 'scale-95');
        }
      });
    }, { threshold: 0.15 });

    const hiddenElements = document.querySelectorAll('.scroll-anim-cta');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 md:py-24 px-6 md:px-12 bg-white dark:bg-gray-900 transition-colors duration-500 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Banner Kotak Besar */}
        <div className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-emerald-900 dark:bg-gray-800 shadow-2xl scroll-anim-cta opacity-0 scale-95 transition-all duration-1000 ease-out border border-emerald-800 dark:border-gray-700">
          
          {/* Ornamen Background (Lingkaran Blur & Pola) */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-800/50 dark:bg-gray-700/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 z-0" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-500/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 z-0" />
          
          {/* Tekstur/Pola (Opsional) */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 mix-blend-overlay z-0" />

          {/* Konten Utama */}
          <div className="relative z-10 px-8 py-16 md:py-20 lg:py-24 md:px-16 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* Teks Kiri */}
            <div className="text-center lg:text-left w-full lg:w-2/3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-6 border border-yellow-500/30">
                <Sparkles size={14} /> Penerimaan Santri Baru 2026/2027
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                Siap Menjadi Bagian Dari <br className="hidden md:block" />
                <span className="text-yellow-400">Generasi Qur'ani?</span>
              </h2>
              <p className="text-emerald-100/80 dark:text-gray-300 text-sm md:text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Mari wujudkan masa depan yang cerdas, berakhlak mulia, dan berwawasan global bersama Pondok Pesantren Cendekia. Kuota pendaftaran terbatas!
              </p>
            </div>

            {/* Tombol Kanan */}
            <div className="w-full lg:w-1/3 flex justify-center lg:justify-end shrink-0">
              <Link 
                href="/penerimaan"
                className="group relative inline-flex items-center justify-center gap-3 bg-yellow-500 text-emerald-950 font-extrabold text-base md:text-lg px-8 py-5 md:px-10 md:py-6 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(234,179,8,0.4)]"
              >
                {/* Efek Kilap saat di-hover */}
                <div className="absolute inset-0 bg-white/30 translate-x-[-100%] skew-x-[-15deg] group-hover:animate-[shine_1s_ease-in-out] z-0" />
                
                <span className="relative z-10">Daftar Sekarang</span>
                <ArrowRight size={24} className="relative z-10 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default CTA;