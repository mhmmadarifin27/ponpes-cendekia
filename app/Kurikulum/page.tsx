"use client";
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const KurikulumPage = () => {

  // FUNGSI ANIMASI SCROLL (INTERSECTION OBSERVER) - SAMA PERSIS DENGAN TENTANG KAMI
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-x-0', 'translate-y-0');
          entry.target.classList.remove('opacity-0', '-translate-x-24', 'translate-x-24', 'translate-y-24');
        }
      });
    }, { threshold: 0.15 }); 

    const hiddenElements = document.querySelectorAll('.scroll-anim');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 font-sans text-gray-800 dark:text-gray-300">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-20 overflow-hidden">
        
        {/* ========================================= */}
        {/* 1. HEADER & INTRO (EDITORIAL STYLE)       */}
        {/* ========================================= */}
        <section className="mb-20">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-12 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
            Kurikulum Cendekia
          </h1>
          
          <div className="space-y-6 text-base md:text-[15px] leading-[1.8] text-gray-700 dark:text-gray-300 max-w-5xl text-justify scroll-anim opacity-0 translate-y-24 transition-all duration-1000 delay-200 ease-out">
            <p>
              Di Pondok Pesantren Cendekia, pendidikan dipahami sebagai proses membentuk manusia yang utuh. Bukan hanya cerdas secara akademik, tetapi juga memiliki adab yang baik, disiplin dalam kehidupan sehari-hari, serta memiliki kedekatan dengan Al-Qur&apos;an sebagai pedoman hidup.
            </p>
            <p>
              Untuk itu, sekolah menerapkan pendekatan pendidikan yang mengintegrasikan pembelajaran akademik nasional, nilai-nilai Islam, serta pembiasaan karakter dalam satu sistem pembelajaran yang menyeluruh dan terpadu.
            </p>

            {/* FOTO LEBAR DI TENGAH TEKS */}
            <div className="w-full my-12 rounded-2xl md:rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-500 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
              <img 
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80" 
                alt="Kegiatan Kurikulum Cendekia" 
                className="w-full h-[300px] md:h-[450px] object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 2. FONDASI & METODE (SIDE BY SIDE LAYOUT) */}
        {/* ========================================= */}
        <section className="mb-24 overflow-hidden">
          
          {/* FONDASI KURIKULUM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-16 md:mb-24">
            <div className="order-2 md:order-1 scroll-anim opacity-0 -translate-x-24 transition-all duration-1000 ease-out">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-6">Fondasi Kurikulum</h2>
              <p className="text-gray-700 dark:text-gray-300 text-base md:text-[17px] leading-relaxed text-justify">
                Kurikulum di Cendekia dibangun di atas fondasi utama: Adab, Kedisiplinan, dan Al-Qur&apos;an. Pembentukan karakter dan akhlak menjadi dasar dalam setiap proses pembelajaran. Siswa dibimbing untuk memiliki sikap hormat kepada guru, orang tua, dan sesama, sebelum transfer ilmu pengetahuan dilakukan.
              </p>
            </div>
            <div className="order-1 md:order-2 w-full h-[250px] md:h-[350px] rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm group scroll-anim opacity-0 translate-x-24 transition-all duration-1000 delay-200 ease-out">
               <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80" 
                alt="Fondasi Kurikulum" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
            </div>
          </div>

          {/* METODE PEMBELAJARAN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center overflow-hidden">
            <div className="w-full h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm group scroll-anim opacity-0 -translate-x-24 transition-all duration-1000 ease-out">
              <img 
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80" 
                alt="Metode Pembelajaran" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
            </div>
            <div className="scroll-anim opacity-0 translate-x-24 transition-all duration-1000 delay-200 ease-out">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-6">Metode Pembelajaran</h2>
              <p className="text-gray-700 dark:text-gray-300 text-base md:text-[17px] leading-relaxed text-justify">
                Kami menerapkan metode pembelajaran yang interaktif dan berpusat pada siswa (student-centered). Melalui kurikulum ini, siswa tidak hanya diajarkan ilmu pengetahuan, tetapi juga didorong untuk aktif berdiskusi, berpikir kritis, dan dibimbing untuk memahami bagaimana ilmu tersebut harus digunakan dengan adab dan tanggung jawab.
              </p>
            </div>
          </div>

        </section>

        {/* ========================================= */}
        {/* 3. KOMPONEN KURIKULUM (CLEAN GRID)        */}
        {/* ========================================= */}
        <section className="pt-10 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-12 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
            Integrasi Pembelajaran
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
            
            <div className="hover:-translate-y-1 transition-transform duration-300 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
              <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-4">Program Pembelajaran Al-Quran</h3>
              <p className="text-sm md:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                Sebagai bagian penting dari kurikulum, siswa mengikuti program terstruktur yang meliputi Tahsin untuk memperbaiki bacaan, pembelajaran tajwid, program tahfidz bertahap, dan evaluasi hafalan. Tujuannya agar siswa mampu membaca Al-Qur&apos;an dengan baik dan memiliki kecintaan terhadapnya sejak usia dini.
              </p>
            </div>

            <div className="hover:-translate-y-1 transition-transform duration-300 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 delay-100 ease-out">
              <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-4">Lingkungan Pembelajaran Bilingual</h3>
              <p className="text-sm md:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                Untuk memperluas kemampuan komunikasi siswa, sekolah menerapkan pembiasaan bahasa melalui program English Day untuk melatih bahasa internasional, dan Arabic Day untuk memperkenalkan bahasa Arab sebagai bahasa Al-Qur&apos;an dan bahasa pemersatu umat Islam.
              </p>
            </div>

            <div className="hover:-translate-y-1 transition-transform duration-300 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
              <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-4">Project Based Learning</h3>
              <p className="text-sm md:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                Pembelajaran berbasis proyek mengajak siswa mengaplikasikan ilmu dalam dunia nyata. Siswa diberikan kebebasan untuk mengeksplorasi masalah dan menemukan solusi melalui kolaborasi, mengasah kreativitas, serta membangun kerja sama tim yang solid.
              </p>
            </div>

            <div className="hover:-translate-y-1 transition-transform duration-300 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 delay-100 ease-out">
              <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-4">Program Pembiasaan Harian</h3>
              <p className="text-sm md:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                Kedisiplinan dibangun melalui rutinitas yang konsisten, seperti shalat dhuha dan dzuhur berjamaah, murajaah pagi, hafalan doa sehari-hari, serta adab makan dan minum yang terintegrasi langsung dalam jadwal harian santri.
              </p>
            </div>

            <div className="hover:-translate-y-1 transition-transform duration-300 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
              <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-4">Pengalaman Belajar di Luar Kelas</h3>
              <p className="text-sm md:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                Kami percaya alam dan lingkungan sekitar adalah laboratorium terbaik. Melalui kegiatan outing class, field trip, dan observasi lingkungan, siswa mendapatkan pengalaman langsung yang memperkaya wawasan mereka di luar batasan dinding kelas.
              </p>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default KurikulumPage;