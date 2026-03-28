"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Search, ChevronRight, ChevronLeft, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

const WartaPage = () => {
  const [warta, setWarta] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination & Slider State
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchAllWarta = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('warta')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setWarta(data);
      setLoading(false);
    };
    fetchAllWarta();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // --- LOGIKA PEMBAGIAN DATA ---
  // 3 Berita terbaru untuk Slider/Flyer di atas
  const sliderItems = warta.slice(0, 3);
  
  // Sisanya untuk daftar berita di bawah
  const listBeritaAll = warta.slice(3);
  
  // Hitung total halaman untuk pagination
  const totalPages = Math.ceil(listBeritaAll.length / itemsPerPage);
  
  // Potong data sesuai halaman yang aktif (4 item per halaman)
  const currentListBerita = listBeritaAll.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // --- LOGIKA SLIDER OTOMATIS ---
  useEffect(() => {
    if (sliderItems.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderItems.length - 1 ? 0 : prev + 1));
    }, 5000); // Ganti slide tiap 5 detik
    return () => clearInterval(timer);
  }, [sliderItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderItems.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-500">
      <Navbar />
      
      <main className="pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 dark:text-white font-medium">Berita</span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400">
            <Loader2 className="animate-spin text-emerald-600 mb-4" size={40} />
            <p>Memuat kabar terbaru...</p>
          </div>
        ) : (
          <>
            {/* ================================================== */}
            {/* HERO SLIDER (ALA UGM - GAMBAR BESAR + KOTAK SOLID) */}
            {/* ================================================== */}
            {sliderItems.length > 0 && (
              <div className="relative w-full h-[450px] md:h-[550px] rounded-3xl overflow-hidden mb-16 shadow-xl group">
                
                {/* Gambar Slider (Fade transition) */}
                {sliderItems.map((item, index) => (
                  <div 
                    key={item.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  >
                    <img 
                      src={item.gambar_url || "https://images.unsplash.com/photo-1546422904-90eab23c3d7e?q=80"} 
                      alt={item.judul} 
                      className="w-full h-[65%] md:h-[75%] object-cover" 
                    />
                  </div>
                ))}

                {/* Tombol Navigasi Kiri & Kanan (Muncul saat di-hover) */}
                {sliderItems.length > 1 && (
                  <>
                    <button 
                      onClick={prevSlide}
                      className="absolute left-4 top-[35%] z-20 bg-yellow-500/90 hover:bg-yellow-500 text-emerald-950 p-2 md:p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={nextSlide}
                      className="absolute right-4 top-[35%] z-20 bg-yellow-500/90 hover:bg-yellow-500 text-emerald-950 p-2 md:p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Kotak Konten Bawah (Solid Emerald ala referensi UGM) */}
                <div className="absolute bottom-0 left-0 right-0 h-[35%] md:h-[35%] bg-emerald-950 dark:bg-gray-950 z-20 p-6 md:p-10 flex flex-col justify-center border-t-4 border-yellow-500">
                  <div className="flex items-center gap-3 mb-2 md:mb-3">
                    <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest">Berita Utama</span>
                    <span className="text-emerald-300/50 text-xs">• {formatDate(sliderItems[currentSlide].created_at)}</span>
                  </div>
                  <Link href={`/warta/${sliderItems[currentSlide].id}`}>
                    <h2 className="text-2xl md:text-4xl font-black text-white leading-tight line-clamp-2 hover:text-emerald-300 transition-colors">
                      {sliderItems[currentSlide].judul}
                    </h2>
                  </Link>
                  <p className="text-emerald-100/70 text-sm md:text-base line-clamp-1 mt-2 md:mt-3 max-w-4xl">
                    {sliderItems[currentSlide].konten}
                  </p>
                </div>
              </div>
            )}

            {/* ================================================== */}
            {/* KONTEN BAWAH (GRID 4 ITEM & SIDEBAR)                 */}
            {/* ================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* KIRI: Daftar Berita (Max 4) */}
              <div className="lg:col-span-8 flex flex-col">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-yellow-500 rounded-full"></span> Berita Lainnya
                  </h2>
                </div>

                {currentListBerita.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
                      {currentListBerita.map((item) => (
                        <div key={item.id} className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                          <div className="h-48 overflow-hidden relative shrink-0">
                            <img src={item.gambar_url || "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80"} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          </div>
                          <div className="p-6 flex flex-col flex-grow">
                            <p className="text-xs text-yellow-600 dark:text-yellow-500 font-bold mb-2">{formatDate(item.created_at)}</p>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug mb-3 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                              {item.judul}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 flex-grow">
                              {item.konten}
                            </p>
                            <Link href={`/warta/${item.id}`} className="text-emerald-700 dark:text-emerald-400 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                              Baca Artikel <ArrowRight size={16} />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* --- PAGINATION (ANGKA 1, 2, 3...) --- */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-2 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                        <button 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-colors ${currentPage === page ? 'bg-emerald-700 text-white shadow-md' : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                          >
                            {page}
                          </button>
                        ))}

                        <button 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-20 text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl">
                    Belum ada berita tambahan.
                  </div>
                )}
              </div>

              {/* KANAN: Sidebar */}
              <div className="lg:col-span-4 space-y-8">
                {/* Search */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Search size={18} /> Cari Berita</h3>
                  <input type="text" placeholder="Ketik kata kunci..." className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white" />
                </div>

                {/* Kategori Populer */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Kategori Populer</h3>
                  <div className="space-y-3">
                    {['Kegiatan Santri', 'Akademik & Prestasi', 'Warta Ponpes', 'Artikel Islami'].map((cat, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700/50 last:border-0">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{cat}</span>
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 text-[10px] px-2 py-1 rounded-md font-bold">{Math.floor(Math.random() * 20) + 5}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default WartaPage;