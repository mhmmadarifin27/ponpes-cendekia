import React from 'react';
import { BookOpen, Users, ShieldCheck, Star, ArrowRight } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Tahfidz Al-Qur'an",
      desc: "Program menghafal Al-Qur'an dengan metode mutqin dan sanad yang terjaga.",
      icon: <BookOpen className="w-8 h-8 text-yellow-500" />,
      link: "/program/tahfidz"
    },
    {
      title: "Kitab Kuning",
      desc: "Pendalaman literatur Islam klasik melalui kajian kitab-kitab muktabarah.",
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      link: "/program/kitab-kuning"
    },
    {
      title: "Karakter Adab",
      desc: "Menitikberatkan pembentukan akhlakul karimah sebagai fondasi utama santri.",
      icon: <ShieldCheck className="w-8 h-8 text-yellow-500" />,
      link: "/program/adab"
    },
    {
      title: "Fasilitas Modern",
      desc: "Lingkungan belajar yang asri, nyaman, dan didukung teknologi informasi.",
      icon: <Users className="w-8 h-8 text-yellow-500" />,
      link: "/program/fasilitas"
    },
  ];

  return (
    // Background: Emerald Muda (Light) -> Gelap Pekat (Dark)
    <section className="py-20 px-6 md:px-12 bg-emerald-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-emerald-900 dark:text-white text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
          Pilar Pendidikan Kami
        </h2>
        <div className="w-24 h-1.5 bg-yellow-500 mx-auto rounded-full shadow-[0_0_10px_rgba(234,179,8,0.3)]"></div>
      </div>

      {/* Grid Cards */}
      {/* sm:grid-cols-2 (Tablet) dan lg:grid-cols-4 (Laptop) agar responsif */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, index) => (
          <div 
            key={index} 
            className="group relative bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-emerald-100 dark:border-gray-800 flex flex-col h-full"
          >
            {/* Ikon Container */}
            <div className="mb-6 bg-emerald-50 dark:bg-gray-800 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-yellow-500 transition-all duration-300 shadow-inner">
              <div className="group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
            </div>

            {/* Konten Teks */}
            <h3 className="text-xl font-bold text-emerald-900 dark:text-white mb-3 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
              {item.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
              {item.desc}
            </p>

            {/* TOMBOL CEK SELENGKAPNYA (Ditambahkan) */}
            <a 
              href={item.link}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-yellow-500 group/btn"
            >
              Cek Selengkapnya 
              <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
            </a>

            {/* Aksen hiasan pojok saat di-hover (Dark Mode Only) */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;