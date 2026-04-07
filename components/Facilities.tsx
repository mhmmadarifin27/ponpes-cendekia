"use client";
import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Building2, Loader2, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const Facilities = () => {
  const [facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Ref untuk container slider di HP
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      setLoading(true);
      // Panggil maksimal 5 data dari database
      const { data, error } = await supabase
        .from('fasilitas')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5); 
      
      if (!error && data) setFacilities(data);
      setLoading(false);
    };
    fetchFacilities();
  }, []);

  // --- LOGIKA PANAH NAVIGASI KHUSUS HP ---
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8; 
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // --- EFEK ANIMASI SCROLL MUNCUL ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-24');
        }
      });
    }, { threshold: 0.15 });

    const hiddenElements = document.querySelectorAll('.scroll-anim-fasilitas');
    hiddenElements.forEach((el) => observer.observe(el));

    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
    }

    return () => {
      observer.disconnect();
      if (container) container.removeEventListener('scroll', checkScroll);
    };
  }, [loading]); 

  // --- EFEK AUTO-SCROLL KHUSUS HP ---
  useEffect(() => {
    const autoScrollInterval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth * 0.8, behavior: 'smooth' });
        }
      }
    }, 3000); 

    return () => clearInterval(autoScrollInterval);
  }, [loading]);

  const getFigmaBentoClass = (index: number) => {
    if (index === 0) return "md:col-span-2 md:row-span-2"; 
    return "md:col-span-1 md:row-span-1"; 
  };

  return (
    <section id="fasilitas" className="py-24 md:py-32 px-0 sm:px-6 md:px-12 bg-white dark:bg-gray-900 transition-colors duration-500 overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-[-10%] w-[30%] h-[30%] bg-emerald-800/10 dark:bg-emerald-900/20 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-0 left-[-10%] w-[30%] h-[30%] bg-yellow-600/5 dark:bg-yellow-700/10 rounded-full blur-[120px] z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-gray-100 dark:border-gray-800 pb-10 px-6 sm:px-0 scroll-anim-fasilitas opacity-0 translate-y-24 transition-all duration-1000 ease-out">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl border border-emerald-100 dark:border-emerald-800">
                <Building2 className="text-emerald-800 dark:text-yellow-500" size={20} />
              </div>
              <p className="text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
                Sarana Prasarana
              </p>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-emerald-950 dark:text-white leading-tight tracking-tight">
              Fasilitas <span className="text-emerald-700 dark:text-yellow-500">Unggulan</span>
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-sm leading-relaxed">
            Mendukung tumbuh kembang santri dengan lingkungan asri, sarana teknologi modern, dan asrama nyaman.
          </p>
        </div>

        {/* --- GRID UTAMA (BENTO GRID PC & AUTO-SCROLL HP) --- */}
        {loading ? (
          <div className="py-20 flex justify-center items-center gap-3 text-gray-400">
            <Loader2 className="animate-spin" /> Menyiapkan Galeri...
          </div>
        ) : facilities.length > 0 ? (
          
          <div className="relative group/slider">
            
            {/* CONTAINER SLIDER/GRID */}
            {/* PERBAIKAN: overflow-y-hidden dan items-stretch untuk mencegah scroll vertikal bocor di HP */}
            <div 
              ref={scrollRef}
              className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 md:auto-rows-[250px] overflow-x-auto overflow-y-hidden md:overflow-visible items-stretch snap-x snap-mandatory hide-scrollbar px-6 sm:px-0 pt-4 pb-8 md:py-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {facilities.slice(0, 5).map((f, index) => (
                <div 
                  key={f.id} 
                  // PERBAIKAN: flex dan flex-shrink-0 agar ukuran kartu konsisten di HP
                  className={`scroll-anim-fasilitas flex opacity-0 translate-y-24 transition-all duration-1000 ease-out group relative flex-shrink-0 w-[85vw] md:w-auto snap-center ${getFigmaBentoClass(index)}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative w-full rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-gray-800 h-[350px] md:h-full">
                    {/* GAMBAR */}
                    <img 
                      src={f.gambar_url || "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80"} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      alt={f.nama} 
                    />

                    {/* OVERLAY HITAM */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* KONTEN MUNCUL SAAT HOVER */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {f.nama}
                      </h3>
                      {index === 0 && (
                        <p className="text-sm text-gray-300 mb-6 line-clamp-3 px-4">
                          {f.deskripsi}
                        </p>
                      )}
                      
                      <Link 
                        href="/fasilitas" 
                        className="mt-2 inline-flex items-center gap-2 bg-yellow-500 text-emerald-950 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-yellow-400 transition-colors shadow-lg"
                      >
                        Cek Selengkapnya <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* --- TOMBOL PANAH NAVIGASI (KHUSUS HP) --- */}
            <button 
              onClick={() => scroll('left')}
              className={`absolute left-2 md:hidden top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center text-emerald-700 dark:text-emerald-400 z-10 backdrop-blur-sm transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className={`absolute right-2 md:hidden top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center text-emerald-700 dark:text-emerald-400 z-10 backdrop-blur-sm transition-opacity duration-300 ${canScrollRight ? 'opacity-100 animate-pulse' : 'opacity-0 pointer-events-none'}`}
            >
              <ChevronRight size={24} />
            </button>

          </div>
        ) : (
          <div className="mx-6 sm:mx-0 p-20 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[2rem] text-center text-gray-400">
             Belum ada data fasilitas.
          </div>
        )}

        {/* TOMBOL LIHAT SEMUA */}
        {/* PERBAIKAN: Warna disamakan dengan Pilar Kami (Bg Emerald, Text White) */}
        <div className="mt-8 md:mt-16 text-center scroll-anim-fasilitas opacity-0 translate-y-24 transition-all ease-out px-6">
            <Link href="/fasilitas" className="group inline-flex items-center justify-center gap-3 bg-yellow-500 text-emerald-950 px-8 py-4 rounded-xl font-bold hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-xl shadow-yellow-500/30 active:scale-95 text-base md:text-lg w-full md:w-auto whitespace-nowrap">
                Jelajahi Semua Fasilitas
                <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
        </div>
      </div>
    </section>
  );
};

export default Facilities;