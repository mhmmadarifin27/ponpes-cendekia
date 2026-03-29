"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createClient } from '@supabase/supabase-js';

// SETUP SUPABASE
// Pastikan kamu sudah menambahkan ini di file .env.local kamu
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const ProgramDokumentasiPage = () => {

  // State diatur kosong di awal karena akan diisi dari database
  const [dokumentasi, setDokumentasi] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // LOGIKA PAGINATION (HALAMAN)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dokumentasi.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dokumentasi.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const galeriSection = document.getElementById('galeri-dokumentasi');
    if (galeriSection) {
      galeriSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // FUNGSI PENGAMBILAN DATA DARI SUPABASE
  useEffect(() => {
    const fetchDokumentasi = async () => {
      try {
        setIsLoading(true);
        // Ambil data dari tabel 'dokumentasi'
        const { data, error } = await supabase
          .from('dokumentasi')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Error fetching data:", error.message);
          return;
        }

        if (data) {
          const formattedData = data.map((item) => {
            return {
              id: item.id,
              title: item.judul || "Kegiatan Ponpes",
              // PAKAI KOLOM gambar_url SESUAI DI SCREENSHOT KAMU
              imgUrl: item.gambar_url || "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80"
            };
          });

          setDokumentasi(formattedData);
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDokumentasi();
  }, []);

  // FUNGSI ANIMASI SCROLL (INTERSECTION OBSERVER)
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
  }, [currentPage, dokumentasi]); // Trigger ulang animasi saat ganti halaman atau data masuk

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 font-sans text-gray-800 dark:text-gray-300">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-20 overflow-hidden">
        
        {/* ========================================= */}
        {/* 1. HEADER INTRO                           */}
        {/* ========================================= */}
        <section className="mb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-6 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
            Program & Pilar Pendidikan
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto scroll-anim opacity-0 translate-y-24 transition-all duration-1000 delay-200 ease-out">
            Menyelami lebih dalam berbagai program unggulan yang menjadi pilar utama Pondok Pesantren Cendekia dalam mencetak generasi Qur&apos;ani yang cerdas dan berkarakter.
          </p>
        </section>

        {/* ========================================= */}
        {/* 2. DETAIL PROGRAM (SIDE BY SIDE)          */}
        {/* ========================================= */}
        <section className="mb-24 overflow-hidden space-y-20 md:space-y-32">
          
          {/* Pilar 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="order-2 md:order-1 scroll-anim opacity-0 -translate-x-24 transition-all duration-1000 ease-out">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-sm tracking-widest uppercase mb-2 block">Pilar 01</span>
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-6">Tahsin & Tahfidz Al-Qur&apos;an</h2>
              <p className="text-gray-700 dark:text-gray-300 text-base md:text-[17px] leading-relaxed text-justify mb-4">
                Program ini adalah jantung dari Pondok Pesantren Cendekia. Kami menerapkan metode talaqqi dan muraja&apos;ah harian agar santri tidak hanya mengejar kuantitas hafalan, tetapi juga kualitas bacaan (tajwid dan makhraj) yang bersanad.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Target hafalan mutqin sesuai jenjang.</li>
                <li>Evaluasi hafalan berkala (Tasmi&apos;).</li>
                <li>Sertifikasi tahfidz bagi yang mencapai target.</li>
              </ul>
            </div>
            <div className="order-1 md:order-2 w-full h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm group scroll-anim opacity-0 translate-x-24 transition-all duration-1000 delay-200 ease-out">
               <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80" alt="Tahfidz Quran" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="w-full h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm group scroll-anim opacity-0 -translate-x-24 transition-all duration-1000 ease-out">
              <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80" alt="Bilingual Program" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="scroll-anim opacity-0 translate-x-24 transition-all duration-1000 delay-200 ease-out">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-sm tracking-widest uppercase mb-2 block">Pilar 02</span>
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-6">Bilingual & Wawasan Global</h2>
              <p className="text-gray-700 dark:text-gray-300 text-base md:text-[17px] leading-relaxed text-justify mb-4">
                Bahasa adalah kunci menguasai dunia. Santri dibiasakan menggunakan Bahasa Arab dan Bahasa Inggris dalam percakapan sehari-hari di lingkungan asrama maupun sekolah.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>English Day & Yaumul &apos;Arabiyyah mingguan.</li>
                <li>Praktek pidato (Muhadharah) tiga bahasa.</li>
                <li>Vocabulary enrichment setiap usai shalat subuh.</li>
              </ul>
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="order-2 md:order-1 scroll-anim opacity-0 -translate-x-24 transition-all duration-1000 ease-out">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-sm tracking-widest uppercase mb-2 block">Pilar 03</span>
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-6">Kepemimpinan & Kemandirian</h2>
              <p className="text-gray-700 dark:text-gray-300 text-base md:text-[17px] leading-relaxed text-justify mb-4">
                Melalui asrama dan berbagai kegiatan keorganisasian, santri dilatih memecahkan masalah, mengatur waktu, dan memimpin rekan-rekannya. Kami mendidik mereka agar siap terjun ke masyarakat.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Organisasi Santri Pondok Pesantren (OSPP).</li>
                <li>Kepramukaan wajib.</li>
                <li>Latihan Dasar Kepemimpinan (LDK) tahunan.</li>
              </ul>
            </div>
            <div className="order-1 md:order-2 w-full h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm group scroll-anim opacity-0 translate-x-24 transition-all duration-1000 delay-200 ease-out">
               <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80" alt="Kepemimpinan" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
          </div>

        </section>

        {/* ========================================= */}
        {/* 3. GALERI DOKUMENTASI (PAGINATION)        */}
        {/* ========================================= */}
        <section id="galeri-dokumentasi" className="pt-20 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center mb-16 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-4">
              Dokumentasi Kegiatan
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Momen-momen berharga santri Cendekia dalam keseharian mereka.
            </p>
          </div>

          {/* Handler Loading / Kosong */}
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
          ) : dokumentasi.length === 0 ? (
            <div className="flex justify-center items-center min-h-[400px] text-gray-500">
              <p>Belum ada dokumentasi yang ditambahkan.</p>
            </div>
          ) : (
            <>
              {/* Grid Galeri (Hanya menampilkan currentItems = 6 foto) */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 min-h-[400px]">
                {currentItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="relative group w-full aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out"
                    style={{ transitionDelay: `${index * 50}ms` }} 
                  >
                    <img 
                      src={item.imgUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                      <span className="text-white font-medium text-sm md:text-base text-center">
                        {item.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigasi Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 flex justify-center items-center gap-2 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
                  
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    &larr;
                  </button>

                  {[...Array(totalPages)].map((_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                          currentPage === pageNumber
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    &rarr;
                  </button>

                </div>
              )}
            </>
          )}

        </section>

      </main>

      <Footer />
    </div>
  );
};

export default ProgramDokumentasiPage;