"use client";
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronRight, BookOpen, GraduationCap, ShieldCheck, HeartHandshake, Medal, ChevronLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase'; // PASTIKAN IMPORT SUPABASE INI ADA!

// Data Dummy Guru (Sebagai Cadangan / Fallback jika database kosong)
const dummyTeachers = [
  { 
    id: 1, nama: "Ust. H. Abdul Somad, Lc., M.A.", mata_pelajaran: "Tafsir & Hadits", 
    pendidikan: "Universitas Al-Azhar, Kairo", gambar_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500" 
  },
  { 
    id: 2, nama: "Ustadzah Fatimah Zahra, S.Pd.I.", mata_pelajaran: "Tahfidz Al-Qur'an", 
    pendidikan: "UIN Sunan Kalijaga", gambar_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500" 
  },
  { 
    id: 3, nama: "Ust. Muhammad Ali, M.Pd.", mata_pelajaran: "Bahasa Arab & Nahwu", 
    pendidikan: "LIPIA Jakarta", gambar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500" 
  },
  { 
    id: 4, nama: "Ustadzah Aisyah Aminah, M.Sc.", mata_pelajaran: "Matematika & Sains", 
    pendidikan: "Universitas Gadjah Mada", gambar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500" 
  },
  { 
    id: 5, nama: "Ust. Ibrahim Hasan, B.A.", mata_pelajaran: "Fiqih & Ushul Fiqih", 
    pendidikan: "Universitas Islam Madinah", gambar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500" 
  },
  { 
    id: 6, nama: "Ustadzah Siti Maryam, S.S., M.A.", mata_pelajaran: "Bahasa Inggris", 
    pendidikan: "Universitas Indonesia", gambar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500" 
  },
  { 
    id: 7, nama: "Ust. Umar Faruq, S.Kom.", mata_pelajaran: "Teknologi Informasi", 
    pendidikan: "Institut Teknologi Bandung", gambar_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=500" 
  },
  { 
    id: 8, nama: "Ustadzah Khadijah, S.Ag.", mata_pelajaran: "Sejarah Kebudayaan Islam", 
    pendidikan: "UIN Syarif Hidayatullah", gambar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500" 
  },
];

const GuruKamiPage = () => {
  // --- STATE DATABASE GURU ---
  const [teachers, setTeachers] = useState<any[]>([]);
  const [isLoadingTeachers, setIsLoadingTeachers] = useState(true);

  // --- STATE & REF UNTUK SLIDER KOMITMEN ---
  const scrollRefKomitmen = useRef<HTMLDivElement | null>(null);
  const [canScrollLeftKomitmen, setCanScrollLeftKomitmen] = useState(false);
  const [canScrollRightKomitmen, setCanScrollRightKomitmen] = useState(true);

  // --- STATE & REF UNTUK SLIDER GURU ---
  const scrollRefGuru = useRef<HTMLDivElement | null>(null);
  const [canScrollLeftGuru, setCanScrollLeftGuru] = useState(false);
  const [canScrollRightGuru, setCanScrollRightGuru] = useState(true);

  // --- FUNGSI AMBIL DATA DARI SUPABASE ---
  useEffect(() => {
    const fetchTeachersFromDB = async () => {
      setIsLoadingTeachers(true);
      try {
        // Mengambil data dari tabel 'guru'
        const { data, error } = await supabase.from('guru').select('*').order('created_at', { ascending: true });
        
        if (error) {
          console.error("Error fetching teachers:", error);
          setTeachers(dummyTeachers); // Pakai dummy kalau error
        } else if (data && data.length > 0) {
          setTeachers(data); // Pakai data asli dari database
        } else {
          setTeachers(dummyTeachers); // Pakai dummy kalau database kosong
        }
      } catch (err) {
        console.error("Supabase connection error:", err);
        setTeachers(dummyTeachers);
      } finally {
        setIsLoadingTeachers(false);
      }
    };

    fetchTeachersFromDB();
  }, []);

  // Fungsi Cek Scroll
  const checkScroll = (
    ref: React.RefObject<HTMLDivElement | null>, 
    setLeft: React.Dispatch<React.SetStateAction<boolean>>, 
    setRight: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setLeft(scrollLeft > 0);
      setRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Fungsi Scroll Manual
  const geserSlider = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.8;
      ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  // --- EFEK ANIMASI MUNCUL & EVENT LISTENER SCROLL ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-24');
        }
      });
    }, { threshold: 0.15 });

    const hiddenElements = document.querySelectorAll('.scroll-anim');
    hiddenElements.forEach((el) => observer.observe(el));

    const handleScrollKomitmen = () => checkScroll(scrollRefKomitmen, setCanScrollLeftKomitmen, setCanScrollRightKomitmen);
    const handleScrollGuru = () => checkScroll(scrollRefGuru, setCanScrollLeftGuru, setCanScrollRightGuru);

    const elKomitmen = scrollRefKomitmen.current;
    const elGuru = scrollRefGuru.current;

    if (elKomitmen) { elKomitmen.addEventListener('scroll', handleScrollKomitmen); handleScrollKomitmen(); }
    if (elGuru) { elGuru.addEventListener('scroll', handleScrollGuru); handleScrollGuru(); }

    return () => {
      observer.disconnect();
      if (elKomitmen) elKomitmen.removeEventListener('scroll', handleScrollKomitmen);
      if (elGuru) elGuru.removeEventListener('scroll', handleScrollGuru);
    };
  }, [isLoadingTeachers]); // Update observer saat status loading berubah

  // --- EFEK AUTO-SCROLL KHUSUS HP ---
  useEffect(() => {
    if (isLoadingTeachers) return;

    const autoScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (ref.current) {
        const { scrollLeft, scrollWidth, clientWidth } = ref.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          ref.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          ref.current.scrollBy({ left: clientWidth * 0.8, behavior: 'smooth' });
        }
      }
    };

    const intervalKomitmen = setInterval(() => autoScroll(scrollRefKomitmen), 3000);
    const intervalGuru = setInterval(() => autoScroll(scrollRefGuru), 3500); 

    return () => {
      clearInterval(intervalKomitmen);
      clearInterval(intervalGuru);
    };
  }, [isLoadingTeachers]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 font-sans overflow-x-hidden">
      <Navbar />
      
      {/* ========================================= */}
      {/* 1. HEADER SECTION & BANNER BESAR          */}
      {/* ========================================= */}
      <section className="pt-32 pb-16 px-6 md:px-12 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto text-center scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
          
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/tentang" className="hover:text-emerald-600 transition-colors">Profil</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 dark:text-white font-medium">Guru Kami</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-6">
            Asatidz & Tenaga Pendidik
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-12">
            Pondok Pesantren Cendekia diasuh oleh tenaga pendidik profesional, lulusan universitas terkemuka dalam dan luar negeri yang berdedikasi tinggi dalam mendidik ilmu dan adab santri.
          </p>

          <div className="w-full relative rounded-[2rem] overflow-hidden shadow-xl aspect-video md:aspect-[21/9]">
            <img 
              src="flyercendekia.jpeg" 
              alt="Keluarga Besar Asatidz" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent flex flex-col justify-end items-center text-center p-8 md:p-16">
               <p className="text-white text-xl md:text-2xl lg:text-3xl font-serif italic mb-4 max-w-3xl drop-shadow-md">
                 &quot;Sebaik-baik kalian adalah yang belajar Al-Qur'an dan mengajarkannya.&quot;
               </p>
               <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest uppercase">
                 — HR. Bukhari
               </p>
            </div>
          </div>

        </div>
      </section>

      <main className="max-w-7xl mx-auto px-0 sm:px-6 md:px-12 py-16 overflow-hidden">
        
        {/* ========================================= */}
        {/* 2. KOMITMEN KUALITAS PEMBELAJARAN         */}
        {/* ========================================= */}
        <section className="mb-24 relative group/slider">
           <div className="text-center mb-12 px-6 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
              <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-4">Komitmen Kualitas Pembelajaran</h2>
              <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full" />
           </div>

           {/* SLIDER KOMITMEN */}
           <div 
             ref={scrollRefKomitmen}
             className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto overflow-y-hidden md:overflow-visible items-stretch snap-x snap-mandatory hide-scrollbar px-6 sm:px-0 pb-8 md:pb-0"
             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
           >
             {[
               { title: "Metode Tahfidz Intensif", desc: "Pendekatan personal dalam menghafal Al-Qur'an dengan muroja'ah berkala.", icon: <BookOpen /> },
               { title: "Pendampingan Akhlak", desc: "Membentuk karakter islami melalui keteladanan harian di lingkungan pesantren.", icon: <HeartHandshake /> },
               { title: "Kurikulum Terpadu", desc: "Integrasi harmonis antara ilmu agama mendalam dan pengetahuan umum modern.", icon: <GraduationCap /> },
               { title: "Sertifikasi Kompetensi", desc: "Seluruh tenaga pendidik tersertifikasi nasional dan memiliki sanad keilmuan.", icon: <Medal /> },
             ].map((item, idx) => (
                 <div 
                   key={idx} 
                   className="scroll-anim flex opacity-0 translate-y-24 transition-all duration-1000 ease-out flex-shrink-0 w-[85vw] md:w-auto snap-center" 
                   style={{ transitionDelay: `${idx * 150}ms` }}
                 >
                   <div className="w-full p-8 rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-yellow-500 flex items-center justify-center mb-6">
                         {item.icon}
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-grow">{item.desc}</p>
                   </div>
                 </div>
             ))}
           </div>

           {/* PANAH NAVIGASI KOMITMEN (HP) */}
           <button 
             onClick={() => geserSlider(scrollRefKomitmen, 'left')}
             className={`absolute left-2 md:hidden top-[60%] sm:top-1/2 mt-6 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center text-emerald-700 dark:text-emerald-400 z-10 backdrop-blur-sm transition-opacity duration-300 ${canScrollLeftKomitmen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
           >
             <ChevronLeft size={24} />
           </button>
           <button 
             onClick={() => geserSlider(scrollRefKomitmen, 'right')}
             className={`absolute right-2 md:hidden top-[60%] sm:top-1/2 mt-6 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center text-emerald-700 dark:text-emerald-400 z-10 backdrop-blur-sm transition-opacity duration-300 ${canScrollRightKomitmen ? 'opacity-100 animate-pulse' : 'opacity-0 pointer-events-none'}`}
           >
             <ChevronRight size={24} />
           </button>
        </section>

        {/* ========================================= */}
        {/* 3. GRID GURU                                */}
        {/* ========================================= */}
        <section className="relative group/slider">
          <div className="text-center mb-16 px-6 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
              <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-4">Profil Pendidik Kami</h2>
              <p className="text-gray-500 dark:text-gray-400">Mengenal lebih dekat para asatidz dan pengajar yang berdedikasi membimbing generasi qurani.</p>
          </div>

          {isLoadingTeachers ? (
            <div className="flex flex-col items-center justify-center py-20 text-emerald-600">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p className="font-medium animate-pulse">Memuat Data Guru...</p>
            </div>
          ) : (
            <>
              {/* SLIDER GURU */}
              <div 
                ref={scrollRefGuru}
                className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 overflow-x-auto overflow-y-hidden md:overflow-visible items-stretch snap-x snap-mandatory hide-scrollbar px-6 sm:px-0 pb-8 md:pb-0"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {teachers.map((teacher, idx) => (
                  <div 
                    key={teacher.id} 
                    className="scroll-anim flex flex-col opacity-0 translate-y-24 transition-all duration-1000 ease-out flex-shrink-0 w-[85vw] md:w-auto snap-center"
                    style={{ transitionDelay: `${(idx % 4) * 100}ms` }}
                  >
                    <div className="w-full bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full group">
                      {/* Foto Guru */}
                      <div className="w-full aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
                        <img 
                          src={teacher.gambar_url} 
                          alt={teacher.nama} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      {/* Detail Info */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 leading-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          {teacher.nama}
                        </h3>
                        
                        <div className="h-px w-8 bg-yellow-500 my-4" />

                        <div className="flex flex-col gap-3 mt-auto">
                          <div className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                            <BookOpen size={16} className="text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
                            <span>{teacher.mata_pelajaran}</span>
                          </div>
                          <div className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                            <GraduationCap size={16} className="text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
                            <span>{teacher.pendidikan}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* PANAH NAVIGASI GURU (HP) */}
              <button 
                onClick={() => geserSlider(scrollRefGuru, 'left')}
                className={`absolute left-2 md:hidden top-[60%] -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center text-emerald-700 dark:text-emerald-400 z-10 backdrop-blur-sm transition-opacity duration-300 ${canScrollLeftGuru ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => geserSlider(scrollRefGuru, 'right')}
                className={`absolute right-2 md:hidden top-[60%] -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center text-emerald-700 dark:text-emerald-400 z-10 backdrop-blur-sm transition-opacity duration-300 ${canScrollRightGuru ? 'opacity-100 animate-pulse' : 'opacity-0 pointer-events-none'}`}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

        </section>

        {/* Quote Penutup */}
        <div className="mt-24 px-6 max-w-4xl mx-auto">
          <div className="text-center px-6 py-12 bg-emerald-50 dark:bg-gray-800/50 rounded-3xl border border-emerald-100 dark:border-gray-800 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
            <p className="text-xl md:text-2xl font-serif text-emerald-900 dark:text-gray-200 leading-relaxed italic">
              &quot;Bukanlah kehebatan seorang guru terletak pada seberapa banyak ilmu yang ia ketahui, melainkan pada seberapa besar ia mampu menyalakan api keingintahuan dan ketakwaan di hati muridnya.&quot;
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default GuruKamiPage;