"use client";
import React, { useEffect } from 'react';
import { Quote, Heart } from 'lucide-react';
import Link from 'next/link';

const AboutTeaser = () => {

  // --- EFEK ANIMASI SCROLL ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-x-0', 'translate-y-0');
          entry.target.classList.remove('opacity-0', '-translate-x-24', 'translate-y-24');
        }
      });
    }, { threshold: 0.15 });

    const hiddenElements = document.querySelectorAll('.scroll-anim-about');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-28 px-6 md:px-12 bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
        
        {/* SISI KIRI: FOTO KEGIATAN (Lebih Emosional) */}
        <div className="relative w-full md:w-5/12 mb-12 md:mb-0 scroll-anim-about opacity-0 -translate-x-24 transition-all duration-1000 ease-out">
          {/* Hiasan Lingkaran */}
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-emerald-100 dark:bg-yellow-900/90 rounded-full -z-10 animate-pulse" />
          
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-gray-50 dark:border-gray-900">
            {/* Ganti dengan foto santri sedang belajar atau cium tangan guru */}
            <img 
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80" 
              alt="Kegiatan Santri Cendekia" 
              className="w-full aspect-[4/5] object-cover hover:scale-110 transition-transform duration-1000"
            />
            {/* Badge Statistik Kecil */}
            <div className="absolute bottom-6 left-6 bg-yellow-500 p-4 rounded-2xl shadow-xl hidden sm:block animate-bounce">
                <p className="text-emerald-950 font-black text-xl leading-none">100%</p>
                <p className="text-emerald-900 text-[10px] font-bold uppercase tracking-tight">Beasiswa Dhuafa</p>
            </div>
          </div>
        </div>

        {/* SISI KANAN: CERITA SINGKAT */}
        <div className="w-full md:w-7/12">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-[0.2em] mb-4 scroll-anim-about opacity-0 translate-y-24 transition-all duration-1000 ease-out">
              <Heart size={14} className="fill-current" /> Mengenal Lebih Dekat
            </div>

            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 dark:text-white mb-8 leading-tight scroll-anim-about opacity-0 translate-y-24 transition-all duration-1000 delay-100 ease-out">
              Rumah Bagi <span className="text-emerald-700 dark:text-yellow-500">Penjaga Al-Qur&apos;an</span> & Ilmu Pengetahuan.
            </h2>
            
            <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg scroll-anim-about opacity-0 translate-y-24 transition-all duration-1000 delay-200 ease-out">
              <p>
                Pondok Pesantren Cendekia lahir dari sebuah mimpi sederhana: menghadirkan tempat belajar yang nyaman di mana iman, ilmu, dan adab tumbuh bersama dalam harmoni.
              </p>
              <p>
                Bukan sekadar menghafal, kami mengajak santri menyelami makna setiap ayat dan mengaplikasikannya dalam kehidupan modern. Di sini, karakter dibentuk melalui keteladanan, dan masa depan dirancang dengan penguasaan teknologi serta bahasa internasional.
              </p>
            </div>

            {/* SIGNATURE MUDIR (Sentuhan Personal) */}
            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800 scroll-anim-about opacity-0 translate-y-24 transition-all duration-1000 delay-300 ease-out">
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
              className="inline-flex items-center gap-3 mt-12 bg-emerald-50 dark:bg-gray-800 text-emerald-700 dark:text-emerald-400 font-bold py-4 px-8 rounded-2xl hover:bg-emerald-700 hover:text-white dark:hover:bg-emerald-700 transition-all duration-300 group scroll-anim-about opacity-0 translate-y-24 transition-all duration-1000 delay-[400ms] ease-out shadow-sm"
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