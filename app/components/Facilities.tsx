"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Building2, MapPin, Loader2, ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const Facilities = () => {
  const [facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('fasilitas')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6); 
      
      if (!error && data) setFacilities(data);
      setLoading(false);
    };
    fetchFacilities();
  }, []);

  const getBentoClass = (index: number) => {
    const classes = [
      "md:col-span-2 md:row-span-2", 
      "md:col-span-1 md:row-span-1", 
      "md:col-span-1 md:row-span-2", 
      "md:col-span-2 md:row-span-1", 
      "md:col-span-1 md:row-span-1", 
      "md:col-span-1 md:row-span-1", 
    ];
    return classes[index] || "md:col-span-1 md:row-span-1";
  };

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-white dark:bg-black transition-colors duration-500 overflow-hidden relative">
      
      {/* DEKORASI BACKGROUND */}
      <div className="absolute top-0 right-[-10%] w-[30%] h-[30%] bg-emerald-800/10 dark:bg-emerald-900/20 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-0 left-[-10%] w-[30%] h-[30%] bg-yellow-600/5 dark:bg-yellow-700/10 rounded-full blur-[120px] z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-gray-100 dark:border-gray-800 pb-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl border border-emerald-100 dark:border-emerald-800">
                <Building2 className="text-emerald-800 dark:text-yellow-500" size={20} />
              </div>
              <p className="text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
                Sarana Prasarana
              </p>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-emerald-900 dark:text-white leading-tight tracking-tight">
              Fasilitas <span className="text-emerald-700 dark:text-yellow-500">Modern & Nyaman</span>
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-sm leading-relaxed">
            Mendukung proses belajar mengajar dengan lingkungan yang asri dan sarana teknologi terkini.
          </p>
        </div>

        {/* BENTO GRID */}
        {loading ? (
          <div className="py-20 flex justify-center items-center gap-3 text-gray-400">
            <Loader2 className="animate-spin" /> Memuat Fasilitas Terbaik...
          </div>
        ) : facilities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[240px]">
            {facilities.map((f, index) => (
              <div 
                key={f.id} 
                className={`relative group rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border-4 border-white dark:border-gray-950 ${getBentoClass(index)}`}
              >
                {/* GAMBAR */}
                <img 
                  src={f.gambar_url || "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80"} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter grayscale-[30%] group-hover:grayscale-0" 
                  alt={f.nama} 
                />

                {/* OVERLAY: Lebih gelap di bawah agar teks terbaca */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                {/* KONTEN */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  
                  <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="text-yellow-500" size={12} />
                      <p className="text-[10px] text-white/80 uppercase font-bold tracking-widest">
                        {f.kategori || 'Fasilitas'}
                      </p>
                    </div>

                    <h3 className="text-lg md:text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {f.nama}
                    </h3>
                    
                    <p className="text-xs text-white/60 dark:text-gray-300 line-clamp-2 mb-5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      {f.deskripsi}
                    </p>

                    {/* TOMBOL CEK SELENGKAPNYA PER ITEM */}
                    <Link 
                      href={`/fasilitas/${f.id}`}
                      className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 hover:text-white"
                    >
                      Cek Selengkapnya <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-20 border-4 border-dashed border-gray-100 dark:border-gray-800 rounded-[3rem] text-center text-gray-400">
             Belum ada data fasilitas.
          </div>
        )}

        {/* TOMBOL JELAJAHI SEMUA (Paling Bawah) */}
        <div className="mt-16 text-center">
            <Link 
              href="/fasilitas" 
              className="group inline-flex items-center gap-3 bg-emerald-900 dark:bg-yellow-500 text-white dark:text-emerald-950 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl"
            >
                Jelajahi Semua Fasilitas
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
        </div>
      </div>
    </section>
  );
};
export default Facilities;