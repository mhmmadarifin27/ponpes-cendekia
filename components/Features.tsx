"use client";
import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Users, ShieldCheck, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const Features = () => {
  const features = [
    {
      title: "Tahfidz Al-Qur'an",
      desc: "Program menghafal Al-Qur'an dengan metode mutqin dan sanad yang terjaga.",
      icon: <BookOpen className="w-8 h-8" />,
    },
    {
      title: "Kitab Kuning",
      desc: "Pendalaman literatur Islam klasik melalui kajian kitab-kitab muktabarah.",
      icon: <Star className="w-8 h-8" />,
    },
    {
      title: "Karakter Adab",
      desc: "Menitikberatkan pembentukan akhlakul karimah sebagai fondasi utama santri.",
      icon: <ShieldCheck className="w-8 h-8" />,
    },
    {
      title: "Fasilitas Modern",
      desc: "Lingkungan belajar yang asri, nyaman, dan didukung teknologi informasi.",
      icon: <Users className="w-8 h-8" />,
    },
  ];

  // --- LOGIKA SCROLL HORIZONTAL KHUSUS HP ---
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8; 
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // --- EFEK ANIMASI MUNCUL ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-24');
        }
      });
    }, { threshold: 0.15 });

    const hiddenElements = document.querySelectorAll('.scroll-anim-features');
    hiddenElements.forEach((el) => observer.observe(el));

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
    }

    return () => {
      observer.disconnect();
      if (container) container.removeEventListener('scroll', checkScroll);
    };
  }, []);

  return (
    <section className="py-20 px-0 sm:px-6 md:px-12 bg-emerald-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-10 sm:mb-16 px-6 scroll-anim-features opacity-0 translate-y-24 transition-all duration-1000 ease-out">
        <h2 className="text-emerald-900 dark:text-white text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
          Pilar Pendidikan Kami
        </h2>
        <div className="w-24 h-1.5 bg-yellow-500 mx-auto rounded-full shadow-[0_0_10px_rgba(234,179,8,0.3)]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative group/slider">
        
        {/* Container Flex Scroll (HP) */}
        {/* PERBAIKAN: Tambah overflow-y-hidden, items-stretch, pt-4, pb-8 agar shadow & hover tidak terpotong dan tidak bisa di-scroll ke bawah */}
        <div 
          ref={scrollContainerRef}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 overflow-x-auto overflow-y-hidden sm:overflow-visible items-stretch snap-x snap-mandatory hide-scrollbar px-6 sm:px-0 pt-4 pb-8 sm:py-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} 
        >
          {features.map((item, index) => (
            <div 
              key={index} 
              // PERBAIKAN: Tambah flex agar tinggi kartu mengikuti kontainer
              className="scroll-anim-features flex opacity-0 translate-y-24 transition-all duration-1000 ease-out flex-shrink-0 w-[85vw] sm:w-auto snap-center"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* PERBAIKAN: Tambah w-full agar mengisi ruang yang ada */}
              <div className="relative w-full bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-emerald-100 dark:border-gray-800 flex flex-col h-full group">
                
                {/* Ikon Container */}
                <div className="mb-6 bg-emerald-50 dark:bg-gray-800 text-emerald-600 dark:text-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-white transition-all duration-300 shadow-inner">
                  {item.icon}
                </div>

                {/* Konten Teks */}
                <h3 className="text-xl font-bold text-emerald-900 dark:text-white mb-3 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed flex-grow">
                  {item.desc}
                </p>

                {/* Aksen hiasan pojok saat di-hover (Dark Mode Only) */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* --- TOMBOL PANAH NAVIGASI (KHUSUS HP) --- */}
        <button 
          onClick={() => scroll('left')}
          className={`absolute left-2 sm:hidden top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center text-emerald-700 dark:text-emerald-400 z-10 backdrop-blur-sm transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className={`absolute right-2 sm:hidden top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center text-emerald-700 dark:text-emerald-400 z-10 backdrop-blur-sm transition-opacity duration-300 ${canScrollRight ? 'opacity-100 animate-pulse' : 'opacity-0 pointer-events-none'}`}
        >
          <ChevronRight size={24} />
        </button>

      </div>

      {/* --- TOMBOL CEK SELENGKAPNYA (DI BAWAH) --- */}
      <div className="mt-4 sm:mt-16 text-center scroll-anim-features opacity-0 translate-y-24 transition-all ease-out px-6">
        <Link 
          href="/program"
          className="inline-flex items-center justify-center gap-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 px-8 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-emerald-700/30 group"
        >
          Lihat Program & Dokumentasi Lengkap
          <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
        </Link>
      </div>

    </section>
  );
};

export default Features;