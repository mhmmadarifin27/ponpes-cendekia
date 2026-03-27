// components/News.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

const News = () => {
  return (
    <section className="py-20 px-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-extrabold text-emerald-900">Warta Pesantren</h2>
            <button className="text-emerald-900 font-bold flex items-center gap-2">Lihat Semua Berita <ArrowRight size={18}/></button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Berita Utama */}
          <div className="group cursor-pointer">
            <div className="rounded-3xl overflow-hidden mb-6 h-[400px]">
                <img src="https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <p className="text-yellow-600 font-bold text-xs mb-2">15 Oktober 2023</p>
            <h3 className="text-2xl font-bold text-emerald-900 mb-4 group-hover:text-emerald-700">Wisuda Tahfidz Angkatan Ke-X: 50 Santri Selesaikan Hafalan 30 Juz</h3>
            <p className="text-gray-500 line-clamp-2 text-sm">Pondok Pesantren Al-Azhar kembali meluluskan generasi penghafal Al-Quran dalam prosesi wisuda khidmat...</p>
          </div>

          {/* List Berita Samping */}
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="w-32 h-24 bg-emerald-100 rounded-xl overflow-hidden flex-shrink-0">
                    <div className="w-full h-full flex items-center justify-center text-emerald-800 font-bold text-3xl">2</div>
                </div>
                <div>
                    <p className="text-[10px] font-bold text-yellow-600 uppercase mb-1">Akademik • 12 Okt</p>
                    <h4 className="font-bold text-emerald-900 group-hover:text-emerald-700 leading-snug">Lomba Kaligrafi Nasional: Santri Al-Azhar Raih Juara 1</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default News;