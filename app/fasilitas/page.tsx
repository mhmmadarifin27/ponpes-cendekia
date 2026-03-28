"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Building2, Search, Loader2 } from 'lucide-react';

const AllFacilities = () => {
  const [facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('fasilitas')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setFacilities(data);
      setLoading(false);
    };
    fetchAll();
  }, []);

  return (
    // PERBAIKAN: Mengganti dark:bg-black menjadi dark:bg-gray-900
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <Navbar />
      
      {/* HEADER HALAMAN */}
      <section className="pt-32 pb-16 px-6 bg-emerald-50 dark:bg-gray-800/50 transition-colors duration-500">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-6">
            <Building2 size={16} className="text-yellow-600 dark:text-yellow-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-700 dark:text-yellow-500">
              Galeri Lingkungan
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-emerald-950 dark:text-white mb-6 tracking-tight">
            Fasilitas <span className="text-emerald-700 dark:text-yellow-500">Lengkap</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
            Kami berkomitmen memberikan pelayanan dan sarana terbaik untuk menunjang pertumbuhan spiritual dan intelektual santri.
          </p>
        </div>
      </section>

      {/* GRID SEMUA FASILITAS */}
      <main className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-400 dark:text-gray-500">
            <Loader2 className="animate-spin text-yellow-500" size={40} />
            <p className="font-medium">Menyiapkan galeri fasilitas...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((f) => (
              <div 
                key={f.id} 
                // PERBAIKAN: Background kartu dark:bg-gray-800 agar kontras dengan body dark:bg-gray-900
                className="group bg-gray-50 dark:bg-gray-800 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="h-64 overflow-hidden relative bg-gray-200 dark:bg-gray-700">
                  <img 
                    src={f.gambar_url || "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80"} 
                    alt={f.nama}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {f.kategori || 'Sarana'}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-emerald-950 dark:text-white mb-3 group-hover:text-yellow-500 transition-colors">
                    {f.nama}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 line-clamp-3">
                    {f.deskripsi}
                  </p>
                  <div className="h-[2px] w-12 bg-yellow-500 group-hover:w-full transition-all duration-500 opacity-50 group-hover:opacity-100"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* JIKA DATA KOSONG */}
        {!loading && facilities.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-[2rem]">
            <p className="text-gray-400 dark:text-gray-600">Belum ada data fasilitas yang tersedia.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AllFacilities;