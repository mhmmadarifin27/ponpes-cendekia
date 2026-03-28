"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronRight, BookOpen, GraduationCap } from 'lucide-react';
import Link from 'next/link';

// Data Dummy Guru (Bisa kamu ganti nanti atau ditarik dari Supabase kalau mau dibikin dinamis)
const teachers = [
  { 
    id: 1,
    name: "Ust. H. Abdul Somad, Lc., M.A.", 
    subject: "Tafsir & Hadits", 
    edu: "Universitas Al-Azhar, Kairo", 
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500" 
  },
  { 
    id: 2,
    name: "Ustadzah Fatimah Zahra, S.Pd.I.", 
    subject: "Tahfidz Al-Qur'an", 
    edu: "UIN Sunan Kalijaga", 
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500" 
  },
  { 
    id: 3,
    name: "Ust. Muhammad Ali, M.Pd.", 
    subject: "Bahasa Arab & Nahwu", 
    edu: "LIPIA Jakarta", 
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500" 
  },
  { 
    id: 4,
    name: "Ustadzah Aisyah Aminah, M.Sc.", 
    subject: "Matematika & Sains", 
    edu: "Universitas Gadjah Mada", 
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500" 
  },
  { 
    id: 5,
    name: "Ust. Ibrahim Hasan, B.A.", 
    subject: "Fiqih & Ushul Fiqih", 
    edu: "Universitas Islam Madinah", 
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500" 
  },
  { 
    id: 6,
    name: "Ustadzah Siti Maryam, S.S., M.A.", 
    subject: "Bahasa Inggris", 
    edu: "Universitas Indonesia", 
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500" 
  },
  { 
    id: 7,
    name: "Ust. Umar Faruq, S.Kom.", 
    subject: "Teknologi Informasi", 
    edu: "Institut Teknologi Bandung", 
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=500" 
  },
  { 
    id: 8,
    name: "Ustadzah Khadijah, S.Ag.", 
    subject: "Sejarah Kebudayaan Islam", 
    edu: "UIN Syarif Hidayatullah", 
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500" 
  },
];

const GuruKamiPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 font-sans">
      <Navbar />
      
      {/* ========================================= */}
      {/* 1. HEADER SECTION                           */}
      {/* ========================================= */}
      <section className="pt-32 pb-16 px-6 md:px-12 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/tentang" className="hover:text-emerald-600 transition-colors">Profil</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 dark:text-white font-medium">Asatidz & Guru</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-6">
            Asatidz & Tenaga Pendidik
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
            Pondok Pesantren Cendekia diasuh oleh tenaga pendidik profesional, lulusan universitas terkemuka dalam dan luar negeri yang berdedikasi tinggi dalam mendidik ilmu dan adab santri.
          </p>
        </div>
      </section>

      {/* ========================================= */}
      {/* 2. GRID GURU                                */}
      {/* ========================================= */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {teachers.map((teacher) => (
            <div 
              key={teacher.id} 
              className="group flex flex-col bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Foto Guru */}
              <div className="w-full aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
                <img 
                  src={teacher.img} 
                  alt={teacher.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                {/* Aksen warna hijau muncul saat di-hover */}
                <div className="absolute inset-0 bg-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Detail Info */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 leading-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {teacher.name}
                </h3>
                
                <div className="h-px w-8 bg-yellow-500 my-4" />

                <div className="flex flex-col gap-3 mt-auto">
                  <div className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                    <BookOpen size={16} className="text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
                    <span>{teacher.subject}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                    <GraduationCap size={16} className="text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
                    <span>{teacher.edu}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote Penutup */}
        <div className="mt-24 max-w-4xl mx-auto text-center px-6 py-12 bg-emerald-50 dark:bg-gray-800/50 rounded-3xl border border-emerald-100 dark:border-gray-800">
          <p className="text-xl md:text-2xl font-serif text-emerald-900 dark:text-gray-200 leading-relaxed italic">
            &quot;Bukanlah kehebatan seorang guru terletak pada seberapa banyak ilmu yang ia ketahui, melainkan pada seberapa besar ia mampu menyalakan api keingintahuan dan ketakwaan di hati muridnya.&quot;
          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default GuruKamiPage;