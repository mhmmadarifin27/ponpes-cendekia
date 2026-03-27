// components/Facilities.tsx
import React from 'react';

const Facilities = () => {
  return (
    // 1. px-12 diubah jadi px-6 untuk HP, md:px-12 untuk layar besar. Tambah Dark Mode.
    <section className="py-16 md:py-20 px-6 md:px-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* 2. flex-col di HP (atas bawah), md:flex-row di Laptop (menyamping) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 md:mb-12">
          <div>
            <p className="text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-2">
              Lingkungan Belajar
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-900 dark:text-emerald-50">
              Fasilitas Modern & Nyaman
            </h2>
          </div>
          
          {/* 3. Tambah flex-wrap agar tombol tidak nabrak kalau layarnya kekecilan */}
          <div className="flex flex-wrap gap-2 md:gap-4">
            <button className="bg-emerald-900 dark:bg-emerald-700 text-white px-5 md:px-6 py-2 rounded-lg text-xs md:text-sm font-semibold transition-colors">
              Semua
            </button>
            <button className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-5 md:px-6 py-2 rounded-lg text-xs md:text-sm font-semibold transition-colors">
              Asrama
            </button>
            <button className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-5 md:px-6 py-2 rounded-lg text-xs md:text-sm font-semibold transition-colors">
              Olahraga
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Gambar Besar: Tingginya disesuaikan jadi h-[400px] di HP, h-[600px] di Laptop */}
          <div className="lg:col-span-1 rounded-3xl overflow-hidden shadow-lg h-[400px] lg:h-[600px] border border-transparent dark:border-gray-800">
            <img src="https://images.unsplash.com/photo-1523050853063-bd80e27433fb?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Library" />
          </div>
          
          {/* Grid Kanan: Jadi 1 kolom di HP (grid-cols-1), 2 kolom di Tablet ke atas (sm:grid-cols-2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:col-span-2">
            <div className="h-[250px] md:h-[285px] rounded-3xl overflow-hidden shadow-md border border-transparent dark:border-gray-800">
                <img src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Class" />
            </div>
            <div className="h-[250px] md:h-[285px] rounded-3xl overflow-hidden shadow-md border border-transparent dark:border-gray-800">
                <img src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Class" />
            </div>
            <div className="h-[250px] md:h-[285px] rounded-3xl overflow-hidden shadow-md bg-emerald-50 dark:bg-emerald-900/20 border border-transparent dark:border-emerald-900/30 flex items-center justify-center transition-colors">
                <p className="text-emerald-800 dark:text-emerald-300 font-bold text-lg">Lab Komputer</p>
            </div>
            <div className="h-[250px] md:h-[285px] rounded-3xl overflow-hidden shadow-md bg-emerald-50 dark:bg-emerald-900/20 border border-transparent dark:border-emerald-900/30 flex items-center justify-center transition-colors">
                <p className="text-emerald-800 dark:text-emerald-300 font-bold text-lg">Masjid Utama</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Facilities;