"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Building2, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Facilities = () => {
  const [facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Konfigurasi Grid Mutlak (Sesuai Referensi Gambar Figma)
  const getFigmaBentoClass = (index: number) => {
    if (index === 0) return "md:col-span-2 md:row-span-2"; // Kiri: Kotak Besar
    return "md:col-span-1 md:row-span-1"; // Kanan: 4 Kotak Kecil
  };

  return (
    // PERBAIKAN: Mengganti dark:bg-black menjadi dark:bg-gray-900 agar lebih soft
    <section id="fasilitas" className="py-24 md:py-32 px-6 md:px-12 bg-white dark:bg-gray-900 transition-colors duration-500 overflow-hidden relative">
      
      {/* Background Decor */}
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
            <h2 className="text-3xl md:text-5xl font-extrabold text-emerald-950 dark:text-white leading-tight tracking-tight">
              Fasilitas <span className="text-emerald-700 dark:text-yellow-500">Unggulan</span>
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-sm leading-relaxed">
            Mendukung tumbuh kembang santri dengan lingkungan asri, sarana teknologi modern, dan asrama nyaman.
          </p>
        </div>

        {/* --- GRID UTAMA (SANGAT MIRIP FIGMA) --- */}
        {loading ? (
          <div className="py-20 flex justify-center items-center gap-3 text-gray-400">
            <Loader2 className="animate-spin" /> Menyiapkan Galeri...
          </div>
        ) : facilities.length > 0 ? (
          // Pembagian 4 Kolom, 2 Baris
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px]">
            {/* PERBAIKAN: Memastikan (mengunci) hanya 5 item yang dilooping */}
            {facilities.slice(0, 5).map((f, index) => (
              <div 
                key={f.id} 
                className={`group relative rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-gray-800 ${getFigmaBentoClass(index)}`}
              >
                {/* GAMBAR */}
                <img 
                  src={f.gambar_url || "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80"} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={f.nama} 
                />

                {/* OVERLAY HITAM (Supaya teks terbaca saat di-hover) */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* KONTEN MUNCUL SAAT HOVER */}
                <div className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {f.nama}
                  </h3>
                  {/* Sembunyikan deskripsi di kotak kecil biar gak sumpek */}
                  {index === 0 && (
                    <p className="text-sm text-gray-300 mb-6 line-clamp-3 px-4">
                      {f.deskripsi}
                    </p>
                  )}
                  
                  {/* TOMBOL CEK SELENGKAPNYA */}
                  <Link 
                    href="/fasilitas" 
                    className="mt-2 inline-flex items-center gap-2 bg-yellow-500 text-emerald-950 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-yellow-400 transition-colors shadow-lg"
                  >
                    Cek Selengkapnya <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-20 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[2rem] text-center text-gray-400">
             Belum ada data fasilitas.
          </div>
        )}

        {/* TOMBOL LIHAT SEMUA */}
        <div className="mt-16 text-center">
            <Link href="/fasilitas" className="inline-flex items-center gap-3 bg-gray-100 dark:bg-gray-800 text-emerald-900 dark:text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-900 hover:text-white dark:hover:bg-yellow-500 dark:hover:text-emerald-950 transition-all duration-300">
                Jelajahi Semua Fasilitas
                <ArrowRight size={20} />
            </Link>
        </div>
      </div>
    </section>
  );
};

export default Facilities;