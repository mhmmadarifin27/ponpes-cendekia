"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ArrowRight, Loader2, Newspaper } from 'lucide-react';
import Link from 'next/link';

const Warta = () => {
  const [warta, setWarta] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- AMBIL DATA DARI SUPABASE ---
  useEffect(() => {
    const fetchWarta = async () => {
      setLoading(true);
      // Ambil 5 berita terbaru (1 untuk Featured, 4 untuk List)
      const { data, error } = await supabase
        .from('warta')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5); 
      
      if (!error && data) setWarta(data);
      setLoading(false);
    };
    fetchWarta();
  }, []);

  // Format: "15 Oktober 2023" (Untuk Featured)
  const formatDateFull = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Format: "12 OKT" (Untuk List Samping)
  const formatDateShort = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('id-ID', options).toUpperCase();
  };

  return (
    <section id="warta" className="py-24 md:py-32 px-6 md:px-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <p className="text-yellow-500 dark:text-yellow-600 font-bold uppercase tracking-[0.2em] text-xs mb-3">
              INFORMASI TERKINI
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-emerald-950 dark:text-white tracking-tight">
              Warta Pesantren
            </h2>
          </div>
          <Link 
            href="/warta" 
            className="group flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-bold text-sm md:text-base hover:text-emerald-600 transition-colors"
          >
            Lihat Semua Berita 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* --- KONTEN BERITA --- */}
        {loading ? (
          <div className="py-32 flex flex-col justify-center items-center gap-4 text-gray-400 dark:text-gray-500">
            <Loader2 className="animate-spin text-yellow-500" size={40} />
            <p className="font-medium text-sm">Memuat informasi terkini...</p>
          </div>
        ) : warta.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* 1. FEATURED ARTICLE (KIRI - Porsi Besar) */}
            <div className="lg:col-span-7 flex flex-col group cursor-pointer">
              <Link href={`/warta/${warta[0].id}`}>
                <div className="relative rounded-3xl overflow-hidden bg-gray-200 dark:bg-gray-800 mb-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                  <img 
                    src={warta[0].gambar_url || "https://images.unsplash.com/photo-1546422904-90eab23c3d7e?q=80"} 
                    alt={warta[0].judul} 
                    className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Badge "Berita Utama" */}
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-emerald-900 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-md">
                    Berita Utama
                  </div>
                </div>

                <p className="text-yellow-600 dark:text-yellow-500 font-bold text-sm mb-3">
                  {formatDateFull(warta[0].created_at)}
                </p>
                <h3 className="text-2xl md:text-4xl font-black text-emerald-950 dark:text-white leading-snug mb-4 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {warta[0].judul}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 md:line-clamp-3">
                  {warta[0].konten}
                </p>
              </Link>
            </div>

            {/* 2. LIST ARTICLES (KANAN - Porsi Kecil Berjejer) */}
            <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8">
              {warta.slice(1, 5).map((item) => (
                <Link 
                  href={`/warta/${item.id}`} 
                  key={item.id} 
                  className="flex gap-5 md:gap-6 group cursor-pointer items-start"
                >
                  
                  {/* Thumbnail */}
                  <div className="shrink-0 rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-800">
                    <img 
                      src={item.gambar_url || "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80"} 
                      alt={item.judul} 
                      className="w-28 h-20 md:w-36 md:h-28 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Konten Text */}
                  <div className="flex flex-col justify-center py-1">
                    <p className="text-yellow-600 dark:text-yellow-500 font-bold text-[10px] md:text-xs uppercase tracking-[0.15em] mb-2">
                      BERITA • {formatDateShort(item.created_at)}
                    </p>
                    <h4 className="text-sm md:text-lg font-bold text-emerald-950 dark:text-white leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-3">
                      {item.judul}
                    </h4>
                  </div>
                  
                </Link>
              ))}
            </div>

          </div>
        ) : (
          <div className="py-20 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[2rem] text-center text-gray-400 flex flex-col items-center">
            <Newspaper size={40} className="mb-4 opacity-50" />
            <p>Belum ada berita yang dipublikasikan.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Warta;