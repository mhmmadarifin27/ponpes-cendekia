"use client";
import React, { useEffect } from 'react';
import { BookOpen, Users, ShieldCheck, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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

  // --- EFEK ANIMASI SCROLL ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-24');
        }
      });
    }, { threshold: 0.15 });

    const hiddenElements = document.querySelectorAll('.scroll-anim-features');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    // Background: Emerald Muda (Light) -> Gelap Pekat (Dark)
    <section className="py-20 bg-emerald-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center mb-12 md:mb-16 scroll-anim-features opacity-0 translate-y-24 transition-all duration-1000 ease-out">
        <h2 className="text-emerald-900 dark:text-white text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
          Pilar Pendidikan Kami
        </h2>
        <div className="w-24 h-1.5 bg-yellow-500 mx-auto rounded-full shadow-[0_0_10px_rgba(234,179,8,0.3)]"></div>
      </div>

      {/* Container Grid/Slider 
        - Di HP: flex row, overflow-x-auto, snap-x (Bisa di-scroll ke samping)
        - Di MD (Tablet/PC): grid cols, wrap, tanpa scroll menyamping
      */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 hide-scrollbar">
          
          {features.map((item, index) => (
            <div 
              key={index} 
              // Lebar w-[85vw] untuk HP agar satu layar bisa nampung 1 kartu setengah, supaya user tahu bisa di-scroll
              className="group relative bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 md:hover:-translate-y-3 border border-emerald-100 dark:border-gray-800 flex flex-col min-w-[85vw] md:min-w-0 snap-center scroll-anim-features opacity-0 translate-y-24 ease-out"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Ikon Container */}
              <div className="mb-6 bg-emerald-50 dark:bg-gray-800 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-yellow-500 transition-all duration-300 shadow-inner">
                <div className="text-yellow-600 dark:text-yellow-500 group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
              </div>

              {/* Konten Teks */}
              <h3 className="text-xl font-bold text-emerald-900 dark:text-white mb-3 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed flex-grow">
                {item.desc}
              </p>

              {/* Aksen hiasan pojok saat di-hover (Dark Mode Only) */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
          
        </div>
      </div>

      {/* TOMBOL CEK SELENGKAPNYA (Satu tombol utama di bawah) */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-8 md:mt-16 flex justify-center scroll-anim-features opacity-0 translate-y-24 transition-all duration-1000 delay-500 ease-out">
        <Link 
          href="/program" 
          className="group flex items-center justify-center gap-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 px-8 rounded-2xl transition-all active:scale-95 shadow-xl shadow-emerald-900/20"
        >
          Lihat Semua Program Pendidikan 
          <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
        </Link>
      </div>

      {/* CSS Tambahan untuk menyembunyikan scrollbar bawaan browser di HP agar terlihat bersih */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Features;