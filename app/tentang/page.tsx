"use client";
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TentangKamiPage = () => {

  // FUNGSI ANIMASI SCROLL (INTERSECTION OBSERVER)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Kalau elemen kelihatan di layar, hapus class sembunyi, tambahkan class muncul
          entry.target.classList.add('opacity-100', 'translate-x-0', 'translate-y-0');
          entry.target.classList.remove('opacity-0', '-translate-x-24', 'translate-x-24', 'translate-y-24');
        }
      });
    }, { threshold: 0.15 }); // 15% elemen terlihat, animasi mulai

    // Ambil semua elemen yang punya class 'scroll-anim'
    const hiddenElements = document.querySelectorAll('.scroll-anim');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 font-sans text-gray-800 dark:text-gray-300">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-20 overflow-hidden">
        
        {/* ========================================= */}
        {/* 1. HEADER & SEJARAH (EDITORIAL STYLE)     */}
        {/* ========================================= */}
        <section className="mb-20">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-12 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
            Tentang Kami
          </h1>
          
          <div className="space-y-6 text-base md:text-[15px] leading-[1.8] text-gray-700 dark:text-gray-300 max-w-5xl text-justify scroll-anim opacity-0 translate-y-24 transition-all duration-1000 delay-200 ease-out">
            <p>
              Sejak berdiri, Pondok Pesantren Cendekia hadir sebagai ruang belajar dan tumbuh bagi anak-anak Muslim dengan cita-cita besar: melahirkan generasi Qur&apos;ani yang cerdas, berkarakter, dan siap menjadi cahaya bagi lingkungannya. Di setiap sudut kelas, dalam setiap tawa santri, dan pada setiap doa yang dipanjatkan, tersimpan harapan orang tua akan masa depan putra-putri mereka yang lebih baik.
            </p>
            <p>
              Selama beberapa tahun pertama, perjalanan ini berada di bawah naungan Yayasan Pendidikan Cendekia. Dengan segala keterbatasan dan tantangan yang ada, pondok tetap berusaha menghadirkan pendidikan yang tidak hanya berfokus pada akademik, tetapi juga mengakar pada nilai-nilai Islam. Banyak kisah lahir dari masa itu; anak yang tadinya enggan membaca kini bersemangat menghafal ayat-ayat suci, santri yang pemalu kini percaya diri tampil di depan kelas, dan keluarga yang merasakan manfaat nyata dari pembiasaan ibadah harian yang dilakukan anak-anak di pondok.
            </p>

            {/* FOTO LEBAR DI TENGAH TEKS (Animasi melayang dari bawah) */}
            <div className="w-full my-12 rounded-2xl md:rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-500 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80" 
                alt="Gedung Pondok Pesantren" 
                className="w-full h-[300px] md:h-[450px] object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>

            <p className="scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
              Yayasan membawa visi yang lebih terarah dan manajemen yang lebih terstruktur. Di bawah naungan ini, Pondok Pesantren Cendekia tidak hanya berkomitmen menjaga tradisi pendidikan Islami yang sudah ada, tetapi juga menghadirkan pembaruan yang sejalan dengan tuntutan zaman dan kebutuhan masa depan. Kurikulum dikembangkan dengan integrasi antara ilmu pengetahuan umum dan nilai-nilai Al-Qur&apos;an, program tahfidz ditata lebih sistematis, serta pembiasaan bahasa Arab dan Inggris diperkuat agar santri memiliki keunggulan kompetitif di masa depan.
            </p>
            <p className="scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
              Selain aspek akademik, pondok ini semakin menekankan pembentukan karakter. Melalui kegiatan kepemimpinan, pramuka, hingga project-based learning, santri dilatih untuk berani, disiplin, bertanggung jawab, dan mampu bekerja sama dengan orang lain. Semua ini menjadi bekal penting, agar mereka tidak hanya cerdas dalam berpikir, tetapi juga mulia dalam bersikap.
            </p>
            <p className="scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
              Kini, dengan semangat baru, Pondok Pesantren Cendekia melanjutkan perjalanannya. Sebuah perjalanan yang lahir dari niat tulus para pendiri, diperkuat oleh kerja keras para asatidz, dan dikuatkan oleh doa serta dukungan orang tua. Pondok Pesantren Cendekia berdiri bukan hanya sebagai lembaga pendidikan, tetapi sebagai rumah bagi generasi penerus umat, tempat di mana iman, ilmu, dan akhlak bersatu membentuk pribadi yang siap menghadapi zaman sekaligus memberi manfaat bagi keluarga, masyarakat, dan bangsa.
            </p>
          </div>
        </section>

        {/* ========================================= */}
        {/* 2. VISI & MISI (SIDE BY SIDE LAYOUT)      */}
        {/* ========================================= */}
        <section className="mb-24 overflow-hidden">
          
          {/* VISI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-16 md:mb-24">
            {/* Teks Visi - Geser dari Kiri (-translate-x-24) */}
            <div className="order-2 md:order-1 scroll-anim opacity-0 -translate-x-24 transition-all duration-1000 ease-out">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-6">Visi</h2>
              <p className="text-gray-700 dark:text-gray-300 text-base md:text-[17px] leading-relaxed text-justify">
                Menjadi lembaga pendidikan Islam terdepan yang menghasilkan siswa yang cerdas, berakhlak mulia, dan berdaya saing global, berkompetensi tinggi, dan bertaqwa sesuai dengan tuntunan Al-Qur&apos;an dan Hadist.
              </p>
            </div>
            {/* Foto Visi - Geser dari Kanan (translate-x-24) */}
            <div className="order-1 md:order-2 w-full h-[250px] md:h-[350px] rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm group scroll-anim opacity-0 translate-x-24 transition-all duration-1000 delay-200 ease-out">
               <img 
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80" 
                alt="Kegiatan Santri Visi" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
            </div>
          </div>

          {/* MISI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center overflow-hidden">
            {/* Foto Misi - Geser dari Kiri (-translate-x-24) */}
            <div className="w-full h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm group scroll-anim opacity-0 -translate-x-24 transition-all duration-1000 ease-out">
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80" 
                alt="Kegiatan Belajar Misi" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
            </div>
            {/* Teks Misi - Geser dari Kanan (translate-x-24) */}
            <div className="scroll-anim opacity-0 translate-x-24 transition-all duration-1000 delay-200 ease-out">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-6">Misi</h2>
              <ol className="list-decimal pl-5 space-y-4 text-gray-700 dark:text-gray-300 text-sm md:text-[15px] leading-relaxed text-justify marker:font-bold marker:text-gray-900 dark:marker:text-white">
                <li className="pl-2">Menyelenggarakan pendidikan Islam yang komprehensif dengan memadukan teori dan praktik berdasarkan Al-Qur&apos;an dan Hadist.</li>
                <li className="pl-2">Menciptakan lingkungan belajar yang mendukung pengembangan karakter Islami siswa.</li>
                <li className="pl-2">Mendorong prestasi akademik dan non-akademik melalui pendekatan pembelajaran yang inovatif dan kreatif.</li>
                <li className="pl-2">Mengintegrasikan nilai-nilai Islam dalam setiap aspek kehidupan sekolah.</li>
                <li className="pl-2">Menerapkan program dan kegiatan yang bertujuan agar setiap siswa dapat mengembangkan potensi akademis, keterampilan, minat, bakat, dan potensinya secara maksimal.</li>
              </ol>
            </div>
          </div>

        </section>

        {/* ========================================= */}
        {/* 3. PROGRAM UNGGULAN (CLEAN GRID)          */}
        {/* ========================================= */}
        <section id="program-unggulan" className="pt-10 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-12 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
            Program Unggulan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
            
            <div className="hover:-translate-y-1 transition-transform duration-300 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
              <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-4">Tahsin & Tahfidz Qur&apos;an Terstruktur</h3>
              <p className="text-sm md:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                Program ini membimbing siswa membaca Al-Qur&apos;an dengan tajwid yang benar sekaligus menghafalkannya secara bertahap sesuai jenjang. Anak-anak dibiasakan muraja&apos;ah dan memiliki target hafalan doa harian, hadits pendek, hingga juz tertentu. Dengan begitu, mereka tidak hanya fasih melantunkan ayat suci, tetapi juga tumbuh dengan kecintaan mendalam pada Al-Qur&apos;an.
              </p>
            </div>

            <div className="hover:-translate-y-1 transition-transform duration-300 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 delay-100 ease-out">
              <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-4">Pembiasaan Bahasa Arab dan Inggris</h3>
              <p className="text-sm md:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                Pembiasaan berbahasa Inggris dan Arab dalam aktivitas sehari-hari, baik percakapan maupun presentasi di kelas. Melalui program ini, siswa berani berbicara dalam bahasa asing sederhana, terbiasa menambah kosakata, dan mampu berkomunikasi di depan umum. Selain membuka wawasan global, pembiasaan bahasa Arab juga menumbuhkan pemahaman lebih baik terhadap bahasa Al-Qur&apos;an.
              </p>
            </div>

            <div className="hover:-translate-y-1 transition-transform duration-300 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
              <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-4">Leadership & Character Building</h3>
              <p className="text-sm md:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                Melalui kegiatan pramuka, field trip, class meeting, outing class, market day, siswa dibentuk menjadi pribadi yang disiplin, mandiri, serta bertanggung jawab. Program ini menanamkan nilai kepemimpinan Islami, membiasakan anak bekerja sama, serta melatih keberanian mengambil keputusan. Hasilnya, anak tidak hanya percaya diri, tetapi juga berakhlak mulia dalam memimpin maupun mengikuti.
              </p>
            </div>

            <div className="hover:-translate-y-1 transition-transform duration-300 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 delay-100 ease-out">
              <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-4">Program Adab & Akhlak Islami</h3>
              <p className="text-sm md:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                Setiap hari siswa dibiasakan doa, dzikir, shalat berjamaah, dan penerapan adab dalam pergaulan. Program ini membuat anak terlatih menjaga sopan santun, shalat tepat waktu, serta menjunjung tinggi akhlak Islami di sekolah maupun di rumah. Dengan pembiasaan tersebut, ilmu yang dipelajari selalu berpijak pada adab, sehingga terbentuk pribadi yang berilmu sekaligus berkarakter.
              </p>
            </div>

            <div className="hover:-translate-y-1 transition-transform duration-300 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
              <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-4">Project-Based Learning (PBL)</h3>
              <p className="text-sm md:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                Metode belajar berbasis proyek yang mengajak siswa melakukan riset, berkreasi, dan mempresentasikan hasil karya. Anak-anak dilatih berpikir kritis, menyelesaikan masalah bersama, serta mengkomunikasikan ide dengan percaya diri. Dari kegiatan ini, lahirlah karya nyata yang menjadi bukti kreativitas sekaligus pengalaman berharga dalam menghadapi tantangan nyata.
              </p>
            </div>

            <div className="hover:-translate-y-1 transition-transform duration-300 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 delay-100 ease-out">
              <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-4">Ekstrakurikuler Terintegrasi</h3>
              <p className="text-sm md:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                Melalui kegiatan tambahan seperti Math Club, English Club, Tahfiz Club, Tari, Hadrah, Futsal, Mewarnai, dan Teater, anak diberi ruang untuk menyalurkan bakat sekaligus menyeimbangkan akademik, spiritual, dan keterampilan hidup. Anak-anak menjadi lebih percaya diri, aktif, sehat, dan kreatif, sekaligus mampu mengekspresikan minat mereka secara positif.
              </p>
            </div>

          </div>        </section>

      </main>

      <Footer />
    </div>
  );
};

export default TentangKamiPage;