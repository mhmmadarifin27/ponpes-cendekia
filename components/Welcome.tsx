"use client";
import React, { useEffect } from 'react';
import { Quote } from 'lucide-react';
import Link from 'next/link';

const Welcome = () => {

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

    const hiddenElements = document.querySelectorAll('.scroll-anim-welcome');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    // Background utama: Putih (Light), Abu-abu sangat gelap (Dark)
    <section className="py-16 md:py-24 px-6 md:px-12 bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
        
        {/* Sisi Kiri: Foto Pimpinan */}
        {/* Animasi: Geser dari Kiri (-translate-x-24) */}
        <div className="relative w-full md:w-1/3 mb-12 md:mb-0 scroll-anim-welcome opacity-0 -translate-x-24 transition-all duration-1000 ease-out">
          
          {/* Hiasan Lingkaran */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-500/10 dark:bg-yellow-500/5 rounded-full -z-10 animate-pulse" />
          
          {/* Container Foto */}
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 transition-all duration-500">
            <img 
              src="https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=600" 
              alt="Pimpinan Pondok" 
              className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* KOTAK NAMA */}
          {/* Animasi: Kotak nama muncul delay setelah foto */}
          <div className="absolute -bottom-6 right-4 md:-right-6 w-[85%] md:w-full bg-emerald-900 dark:bg-gray-900 p-5 md:p-6 rounded-xl shadow-2xl border-l-4 border-yellow-500 z-20 transition-colors duration-500 scroll-anim-welcome opacity-0 translate-y-24 transition-all duration-1000 delay-300 ease-out">
            <p className="text-yellow-500 font-extrabold text-base md:text-lg leading-tight tracking-wide">
              KH. Ahmad Ridwan, Lc.
            </p>
            <p className="text-white/70 dark:text-gray-400 text-[10px] md:text-xs uppercase tracking-[0.2em] mt-1.5 font-medium">
              Pimpinan Pondok Pesantren
            </p>
          </div>
        </div>

        {/* Sisi Kanan: Teks Sambutan */}
        <div className="w-full md:w-2/3 mt-6 md:mt-0">
          {/* Ikon Quote (Diubah jadi Emas tipis di Dark Mode) */}
          {/* Animasi Icon Quote */}
          <Quote className="text-emerald-800/10 dark:text-yellow-500/10 w-16 h-16 md:w-20 md:h-20 mb-[-30px] md:mb-[-40px] scroll-anim-welcome opacity-0 translate-y-24 transition-all duration-1000 delay-100 ease-out" />
          
          <div className="relative z-10">
            {/* Judul */}
            {/* Animasi Judul */}
            <h3 className="text-2xl md:text-4xl font-extrabold text-emerald-900 dark:text-white mb-6 leading-tight scroll-anim-welcome opacity-0 translate-y-24 transition-all duration-1000 delay-200 ease-out">
              Membangun Peradaban Melalui <br className="hidden md:block" />
              <span className="text-emerald-700 dark:text-yellow-400">Pendidikan Berbasis Adab</span>
            </h3>
            
            {/* Teks Paragraf */}
            {/* Animasi Paragraf beruntun (delay-300 & delay-400) */}
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
              <p className="font-semibold text-emerald-800 dark:text-yellow-400 scroll-anim-welcome opacity-0 translate-y-24 transition-all duration-1000 delay-300 ease-out">
                Assalamu'alaikum Warahmatullahi Wabarakatuh.
              </p>
              <p className="scroll-anim-welcome opacity-0 translate-y-24 transition-all duration-1000 delay-400 ease-out">
                Segala puji bagi Allah SWT yang telah memberikan kita kekuatan untuk terus berjuang di jalan dakwah dan pendidikan. 
                <span className="font-bold text-emerald-900 dark:text-yellow-300"> Pondok Pesantren Cendekia</span> hadir bukan sekadar sebagai tempat belajar, melainkan sebagai kawah candradimuka bagi para pejuang Al-Qur'an.
              </p>
              <p className="scroll-anim-welcome opacity-0 translate-y-24 transition-all duration-1000 delay-[500ms] ease-out">
                Kami percaya bahwa kepintaran tanpa adab hanya akan melahirkan kesombongan. Oleh karena itu, kurikulum kami menitikberatkan pada pembentukan karakter (akhlaqul karimah) yang disandingkan dengan kemapanan ilmu syar'i dan wawasan modern.
              </p>
            </div>
            
            {/* Tombol */}
            {/* Animasi Tombol di akhir (delay-600) */}
           <Link 
  href="/tentang" 
  className="group mt-8 text-emerald-800 dark:text-yellow-400 font-bold flex items-center gap-2 hover:gap-4 transition-all duration-300 scroll-anim-welcome opacity-0 translate-y-24 transition-all duration-1000 delay-[600ms] ease-out"
>
  Baca Selengkapnya 
  <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
</Link>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Welcome;