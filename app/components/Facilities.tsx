// components/Facilities.tsx
import React from 'react';

const Facilities = () => {
  return (
    <section className="py-20 px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-yellow-600 font-bold uppercase tracking-widest text-xs mb-2">Lingkungan Belajar</p>
            <h2 className="text-4xl font-extrabold text-emerald-900">Fasilitas Modern & Nyaman</h2>
          </div>
          <div className="flex gap-4">
            <button className="bg-emerald-900 text-white px-6 py-2 rounded-lg text-sm font-semibold">Semua</button>
            <button className="bg-gray-100 text-gray-600 px-6 py-2 rounded-lg text-sm font-semibold">Asrama</button>
            <button className="bg-gray-100 text-gray-600 px-6 py-2 rounded-lg text-sm font-semibold">Olahraga</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 lg:row-span-2 rounded-3xl overflow-hidden shadow-lg h-[600px]">
            <img src="https://images.unsplash.com/photo-1523050853063-bd80e27433fb?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Library" />
          </div>
          <div className="grid grid-cols-2 gap-6 lg:col-span-2">
            <div className="h-[285px] rounded-3xl overflow-hidden shadow-md">
                <img src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Class" />
            </div>
            <div className="h-[285px] rounded-3xl overflow-hidden shadow-md">
                <img src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Class" />
            </div>
            <div className="h-[285px] rounded-3xl overflow-hidden shadow-md bg-emerald-50 flex items-center justify-center">
                <p className="text-emerald-800 font-bold">Lab Komputer</p>
            </div>
            <div className="h-[285px] rounded-3xl overflow-hidden shadow-md bg-emerald-50 flex items-center justify-center">
                <p className="text-emerald-800 font-bold">Masjid Utama</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Facilities;