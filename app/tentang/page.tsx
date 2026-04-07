"use client";
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Quote } from 'lucide-react'; // Tambahan import Quote
import Link from 'next/link';

const TentangKamiPage = () => {

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
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 font-sans text-gray-800 dark:text-gray-300">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-20 overflow-hidden">
        
        {/* ========================================= */}
        {/* 1. SAMBUTAN PIMPINAN (MUDIR) BARU DITAMBAHKAN */}
        {/* ========================================= */}
        <section className="mb-24">
          <div className="bg-emerald-50 dark:bg-gray-800/50 rounded-[2.5rem] p-8 md:p-12 lg:p-16 border border-emerald-100 dark:border-gray-800 relative overflow-hidden scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
            
            {/* Ikon Quote Raksasa Transparan di Background */}
            <Quote className="absolute top-[-5%] right-[-5%] w-64 h-64 text-emerald-900/5 dark:text-white/5 -rotate-12 z-0 pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center lg:items-start relative z-10">
               
               {/* Foto Pimpinan */}
               <div className="w-full sm:w-2/3 lg:w-1/3 shrink-0 scroll-anim opacity-0 -translate-x-24 transition-all duration-1000 delay-200 ease-out">
                  <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-700">
                    <img 
                      src="flyercendekia.jpeg" 
                      alt="KH. Ahmad Ridwan, Lc." 
                      className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  <div className="mt-6 text-center lg:text-left">
                     <h3 className="font-bold text-xl text-emerald-900 dark:text-white">KH. Ahmad Ridwan, Lc.</h3>
                     <p className="text-sm text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-widest mt-1">Pimpinan Pondok</p>
                  </div>
               </div>

               {/* Teks Sambutan */}
               <div className="w-full lg:w-2/3 space-y-5 text-gray-700 dark:text-gray-300 text-sm md:text-[15px] leading-relaxed text-justify scroll-anim opacity-0 translate-x-24 transition-all duration-1000 delay-300 ease-out">
                  <div className="mb-8 text-center lg:text-left">
                    <h2 className="text-3xl md:text-4xl font-serif text-emerald-900 dark:text-white mb-2">Sambutan Pimpinan</h2>
                    <div className="w-16 h-1 bg-yellow-500 mx-auto lg:mx-0 rounded-full" />
                  </div>
                  
                  <p className="font-bold text-emerald-800 dark:text-yellow-400">
                    Assalamu'alaikum Warahmatullahi Wabarakatuh.
                  </p>
                  <p>
                    Segala puji bagi Allah SWT, Tuhan semesta alam, yang senantiasa melimpahkan rahmat, taufiq, dan hidayah-Nya kepada kita semua. Shalawat serta salam semoga senantiasa tercurah kepada teladan terbaik kita, Nabi Muhammad SAW, beserta keluarga, sahabat, dan umatnya yang istiqamah di jalan kebenaran.
                  </p>
                  <p>
                    Bapak/Ibu wali santri yang dirahmati Allah, mendidik anak di era modern ini adalah tantangan yang luar biasa. Derasnya arus informasi seringkali membawa dampak hilangnya adab dan merosotnya moral generasi muda. Oleh karena itu, <span className="font-bold text-emerald-900 dark:text-yellow-300">Pondok Pesantren Cendekia</span> hadir bukan sekadar sebagai tempat transfer ilmu, melainkan sebagai kawah candradimuka yang menempa akhlak, membina kedisiplinan, dan menanamkan cinta kepada Al-Qur'an.
                  </p>
                  <p>
                    Kami meyakini pepatah ulama salaf, <em>"Al-Adabu fauqal 'Ilmi"</em> (Adab itu lebih tinggi daripada ilmu). Kepintaran setinggi apa pun tanpa dilandasi adab yang baik hanya akan melahirkan kehancuran. Di pesantren ini, kurikulum kami dirancang untuk menyeimbangkan antara kemapanan ilmu syar'i, kecerdasan akademik, dan pembentukan karakter (akhlaqul karimah).
                  </p>
                  <p>
                    Kami mengundang Bapak/Ibu untuk menitipkan putra-putrinya berjuang bersama kami. Mari kita bersinergi dan berdoa bersama, semoga kelak dari pondok pesantren ini lahir para pemimpin umat, ulama yang intelek, dan intelektual yang ulama, yang siap menjadi cahaya penerang bagi keluarga, agama, dan bangsa.
                  </p>
                  <p className="font-bold text-emerald-800 dark:text-yellow-400 pt-4">
                    Wassalamu'alaikum Warahmatullahi Wabarakatuh.
                  </p>
               </div>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 2. HEADER & SEJARAH (EDITORIAL STYLE)     */}
        {/* ========================================= */}
        <section className="mb-20">
          <div className="text-center md:text-left mb-12 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-4">
              Sejarah Cendekia
            </h1>
            <div className="w-20 h-1 bg-yellow-500 mx-auto md:mx-0 rounded-full" />
          </div>
          
          <div className="space-y-6 text-base md:text-[15px] leading-[1.8] text-gray-700 dark:text-gray-300 max-w-5xl text-justify scroll-anim opacity-0 translate-y-24 transition-all duration-1000 delay-200 ease-out">
            <p>
              Sejak berdiri, Pondok Pesantren Cendekia hadir sebagai ruang belajar dan tumbuh bagi anak-anak Muslim dengan cita-cita besar: melahirkan generasi Qur'ani yang cerdas, berkarakter, dan siap menjadi cahaya bagi lingkungannya. Di setiap sudut kelas, dalam setiap tawa santri, dan pada setiap doa yang dipanjatkan, tersimpan harapan orang tua akan masa depan putra-putri mereka yang lebih baik.
            </p>
            <p>
              Selama beberapa tahun pertama, perjalanan ini berada di bawah naungan Yayasan Pendidikan Cendekia. Dengan segala keterbatasan dan tantangan yang ada, pondok tetap berusaha menghadirkan pendidikan yang tidak hanya berfokus pada akademik, tetapi juga mengakar pada nilai-nilai Islam. Banyak kisah lahir dari masa itu; anak yang tadinya enggan membaca kini bersemangat menghafal ayat-ayat suci, santri yang pemalu kini percaya diri tampil di depan kelas, dan keluarga yang merasakan manfaat nyata dari pembiasaan ibadah harian yang dilakukan anak-anak di pondok.
            </p>

            {/* FOTO LEBAR DI TENGAH TEKS */}
            <div className="w-full my-12 rounded-2xl md:rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-500 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
              <img 
                src="flyercendekia.jpeg" 
                alt="Gedung Pondok Pesantren" 
                className="w-full h-[300px] md:h-[450px] object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>

            <p className="scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
              Yayasan membawa visi yang lebih terarah dan manajemen yang lebih terstruktur. Di bawah naungan ini, Pondok Pesantren Cendekia tidak hanya berkomitmen menjaga tradisi pendidikan Islami yang sudah ada, tetapi juga menghadirkan pembaruan yang sejalan dengan tuntutan zaman dan kebutuhan masa depan. Kurikulum dikembangkan dengan integrasi antara ilmu pengetahuan umum dan nilai-nilai Al-Qur'an, program tahfidz ditata lebih sistematis, serta pembiasaan bahasa Arab dan Inggris diperkuat agar santri memiliki keunggulan kompetitif di masa depan.
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
        {/* 3. VISI & MISI (SIDE BY SIDE LAYOUT)      */}
        {/* ========================================= */}
        <section className="mb-24 overflow-hidden">
          
          {/* VISI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-16 md:mb-24">
            <div className="order-2 md:order-1 scroll-anim opacity-0 -translate-x-24 transition-all duration-1000 ease-out">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-6">Visi</h2>
              <p className="text-gray-700 dark:text-gray-300 text-base md:text-[17px] leading-relaxed text-justify">
                Menjadi lembaga pendidikan Islam terdepan yang menghasilkan siswa yang cerdas, berakhlak mulia, dan berdaya saing global, berkompetensi tinggi, dan bertaqwa sesuai dengan tuntunan Al-Qur'an dan Hadist.
              </p>
            </div>
            <div className="order-1 md:order-2 w-full h-[250px] md:h-[350px] rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm group scroll-anim opacity-0 translate-x-24 transition-all duration-1000 delay-200 ease-out">
               <img 
                src="visi.jpg" 
                alt="Kegiatan Santri Visi" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
            </div>
          </div>

          {/* MISI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center overflow-hidden">
            <div className="w-full h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm group scroll-anim opacity-0 -translate-x-24 transition-all duration-1000 ease-out">
              <img 
                src="misi.jpg" 
                alt="Kegiatan Belajar Misi" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
            </div>
            <div className="scroll-anim opacity-0 translate-x-24 transition-all duration-1000 delay-200 ease-out">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-6">Misi</h2>
              <ol className="list-decimal pl-5 space-y-4 text-gray-700 dark:text-gray-300 text-sm md:text-[15px] leading-relaxed text-justify marker:font-bold marker:text-gray-900 dark:marker:text-white">
                <li className="pl-2">Menyelenggarakan pendidikan Islam yang komprehensif dengan memadukan teori dan praktik berdasarkan Al-Qur'an dan Hadist.</li>
                <li className="pl-2">Menciptakan lingkungan belajar yang mendukung pengembangan karakter Islami siswa.</li>
                <li className="pl-2">Mendorong prestasi akademik dan non-akademik melalui pendekatan pembelajaran yang inovatif dan kreatif.</li>
                <li className="pl-2">Mengintegrasikan nilai-nilai Islam dalam setiap aspek kehidupan sekolah.</li>
                <li className="pl-2">Menerapkan program dan kegiatan yang bertujuan agar setiap siswa dapat mengembangkan potensi akademis, keterampilan, minat, bakat, dan potensinya secara maksimal.</li>
              </ol>
            </div>
          </div>

        </section>

        {/* ========================================= */}
        {/* 4. PROGRAM UNGGULAN (CLEAN GRID)          */}
        {/* ========================================= */}
        <section id="program-unggulan" className="pt-10 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center md:text-left mb-12 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-4">
              Program Unggulan
            </h2>
            <div className="w-20 h-1 bg-yellow-500 mx-auto md:mx-0 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
            
            <div className="hover:-translate-y-1 transition-transform duration-300 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 ease-out">
              <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-4">Tahsin & Tahfidz Qur'an Terstruktur</h3>
              <p className="text-sm md:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                Program ini membimbing siswa membaca Al-Qur'an dengan tajwid yang benar sekaligus menghafalkannya secara bertahap sesuai jenjang. Anak-anak dibiasakan muraja'ah dan memiliki target hafalan doa harian, hadits pendek, hingga juz tertentu. Dengan begitu, mereka tidak hanya fasih melantunkan ayat suci, tetapi juga tumbuh dengan kecintaan mendalam pada Al-Qur'an.
              </p>
            </div>

            <div className="hover:-translate-y-1 transition-transform duration-300 scroll-anim opacity-0 translate-y-24 transition-all duration-1000 delay-100 ease-out">
              <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-4">Pembiasaan Bahasa Arab dan Inggris</h3>
              <p className="text-sm md:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                Pembiasaan berbahasa Inggris dan Arab dalam aktivitas sehari-hari, baik percakapan maupun presentasi di kelas. Melalui program ini, siswa berani berbicara dalam bahasa asing sederhana, terbiasa menambah kosakata, dan mampu berkomunikasi di depan umum. Selain membuka wawasan global, pembiasaan bahasa Arab juga menumbuhkan pemahaman lebih baik terhadap bahasa Al-Qur'an.
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

          </div>        
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default TentangKamiPage;