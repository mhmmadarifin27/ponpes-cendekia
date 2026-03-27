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
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      <Navbar />
      
      {/* HEADER HALAMAN */}
      <section className="pt-32 pb-16 px-6 bg-emerald-50 dark:bg-gray-900/30">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 rounded-full mb-6">
            <Building2 size={16} className="text-yellow-600 dark:text-yellow-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-700 dark:text-yellow-500">
              Galeri Lingkungan
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-emerald-950 dark:text-white mb-6">
            Fasilitas <span className="text-emerald-700 dark:text-yellow-500">Lengkap</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-sm md:text-base">
            Kami berkomitmen memberikan pelayanan dan sarana terbaik untuk menunjang pertumbuhan spiritual dan intelektual santri.
          </p>
        </div>
      </section>

      {/* GRID SEMUA FASILITAS */}
      <main className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-400">
            <Loader2 className="animate-spin" size={40} />
            <p className="font-medium">Menyiapkan galeri fasilitas...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((f) => (
              <div 
                key={f.id} 
                className="group bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={f.gambar_url || "/placeholder.jpg"} 
                    alt={f.nama}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded-full">
                      {f.kategori || 'Sarana'}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-emerald-950 dark:text-white mb-3 group-hover:text-yellow-500 transition-colors">
                    {f.nama}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                    {f.deskripsi}
                  </p>
                  <div className="h-[2px] w-12 bg-yellow-500 group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* JIKA DATA KOSONG */}
        {!loading && facilities.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">Belum ada data fasilitas yang tersedia.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AllFacilities;