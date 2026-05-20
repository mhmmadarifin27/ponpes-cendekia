"use client";
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Phone, Clock, MessageCircle, ChevronRight, ChevronDown, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function HubungiPage() {
  // --- STATE UNTUK FAQ DROPDOWN ---
  const [openFaq, setOpenFaq] = useState<number | null>(0); // Default FAQ pertama terbuka
  const faqRef = useRef<HTMLDivElement>(null); // Reference untuk mendeteksi klik di luar FAQ

  // Data Pertanyaan Sering Diajukan (FAQ) Lebih Lengkap
  const faqs = [
    {
      question: "Bagaimana cara mendaftar sebagai santri baru?",
      answer: "Pendaftaran dapat dilakukan secara online melalui tombol 'Daftar Sekarang' yang akan mengarahkan Anda ke WhatsApp admin PPDB kami. Anda juga bisa datang langsung ke Sekretariat Pendaftaran di lokasi pesantren pada jam kerja."
    },
    {
      question: "Berapa rincian biaya pendidikan dan asrama di Ponpes Cendekia?",
      answer: "Rincian biaya (SPP, uang pangkal, seragam, dan kitab) akan diinformasikan secara detail oleh Admin PPDB. Silakan hubungi nomor WhatsApp yang tertera di bawah untuk mendapatkan brosur biaya terbaru."
    },
    {
      question: "Apakah santri diizinkan membawa alat komunikasi (HP/Laptop)?",
      answer: "Untuk menjaga fokus hafalan dan belajar, santri TIDAK diizinkan membawa HP. Penggunaan laptop diizinkan hanya pada jadwal tertentu untuk keperluan kelas IT & Coding dengan pengawasan ketat dari pengurus."
    },
    {
      question: "Bagaimana jika santri sakit saat berada di asrama?",
      answer: "Pesantren memiliki fasilitas Poskestren (Pos Kesehatan Pesantren) ringan. Jika santri mengalami sakit yang membutuhkan penanganan lebih lanjut, pihak pengurus akan segera membawa santri ke klinik/rumah sakit terdekat dan menginformasikan kepada wali santri."
    },
    {
      question: "Berapa kali wali santri boleh menjenguk atau menelepon?",
      answer: "Kunjungan wali santri dijadwalkan setiap Hari Ahad (Minggu) pada pekan ke-2 dan ke-4 setiap bulannya. Untuk komunikasi telepon, disediakan layanan telepon pesantren (Wartel Ponpes) pada jadwal yang telah ditentukan pengurus asrama."
    },
    {
      question: "Apa saja syarat administrasi untuk pendaftaran?",
      answer: "Syarat umum meliputi: Fotokopi KK, Akta Kelahiran, NISN, Pas Foto terbaru, dan Surat Keterangan Sehat. Syarat tambahan (seperti legalisir ijazah/SKL) akan menyusul sesuai ketentuan PPDB berjalan."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // --- EFEK KLIK DI LUAR FAQ UNTUK MENUTUP ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Jika klik terjadi di luar area container faqRef, tutup FAQ
      if (faqRef.current && !faqRef.current.contains(event.target as Node)) {
        setOpenFaq(null);
      }
    };

    // Tambahkan event listener ke document
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // --- EFEK ANIMASI SCROLL ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-x-0', 'translate-y-0', 'scale-100');
          entry.target.classList.remove('opacity-0', '-translate-x-24', 'translate-x-24', 'translate-y-24', 'scale-95');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.scroll-anim-page');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    // Tambahkan overflow-x-hidden di root div agar aman 100% dari horizontal scroll
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-gray-900 transition-colors duration-500 font-sans overflow-x-hidden">
      <Navbar />

      {/* HEADER SECTION */}
      <section className="pt-32 pb-12 px-6 md:px-12 bg-white dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto text-center scroll-anim-page opacity-0 translate-y-24 transition-all duration-1000 ease-out">
          
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 dark:text-white font-medium">Hubungi Kami</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-emerald-950 dark:text-white tracking-tighter mb-6">
            Pusat <span className="text-yellow-500">Layanan & Informasi</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
            Kami selalu terbuka untuk menjawab pertanyaan, menerima masukan, atau mendampingi Anda yang ingin berkunjung langsung ke Pondok Pesantren Cendekia.
          </p>
        </div>
      </section>

      {/* KONTEN UTAMA */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 md:px-12 py-16 md:py-24 space-y-24">
        
        {/* ============================================================= */}
        {/* SECTION 1: FAQ LENGKAP */}
        {/* ============================================================= */}
        {/* Tambahkan ref={faqRef} ke bungkus luar FAQ agar area ini dideteksi */}
        <div ref={faqRef} className="w-full flex flex-col gap-10 items-center scroll-anim-page opacity-0 translate-y-24 transition-all duration-1000 ease-out">
          
          {/* Judul & Pengantar FAQ (Sekarang Rata Tengah) */}
          <div className="w-full max-w-3xl flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-2">
              <HelpCircle size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-emerald-950 dark:text-white tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
              Sebelum menghubungi admin kami, Anda dapat membaca daftar pertanyaan (FAQ) di bawah ini untuk menemukan jawaban secara cepat.
            </p>
          </div>

          {/* List Accordion FAQ (Sekarang Rata Tengah dan Lebar Maksimal 4xl) */}
          <div className="w-full max-w-4xl flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  openFaq === index 
                    ? 'border-emerald-500 dark:border-emerald-600 bg-white dark:bg-gray-800 shadow-md shadow-emerald-900/5' 
                    : 'border-gray-200 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-gray-700 bg-white dark:bg-gray-800/50'
                }`}
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left outline-none active:scale-[0.99] transition-transform duration-200 group"
                >
                  <span className={`font-bold text-sm md:text-base pr-4 ${openFaq === index ? 'text-emerald-800 dark:text-emerald-400' : 'text-gray-800 dark:text-gray-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-500'}`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${openFaq === index ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 rotate-180' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 group-hover:bg-emerald-50 dark:group-hover:bg-gray-700'}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                
                <div 
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    openFaq === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-5 md:p-6 pt-0 text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700 mx-5 md:mx-6 mt-1">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}