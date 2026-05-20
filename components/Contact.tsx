"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
// import Link from 'next/link'; // Dihapus karena tidak dipakai lagi
import Dokumentasi from './Dokumentasi';

const Contact = () => {
  // --- STATE UNTUK FAQ DROPDOWN ---
  const [openFaq, setOpenFaq] = useState<number | null>(0); // Default FAQ pertama terbuka
  const faqRef = useRef<HTMLDivElement>(null); // Reference untuk mendeteksi klik di luar FAQ

  // Data Pertanyaan Sering Diajukan (FAQ)
  const faqs = [
    {
      question: "Kapan pendaftaran santri baru mulai dibuka?",
      answer: "Alhamdulillah, pendaftaran santri baru untuk Tahun Ajaran 2026/2027 telah resmi dibuka. Anda dapat langsung mengklik tombol 'Daftar Sekarang' atau menghubungi admin PPDB kami."
    },
    {
      question: "Apakah Pondok Pesantren ini khusus laki-laki?",
      answer: "Saat ini kami membuka pendaftaran untuk santriwan (laki-laki) dan santriwati (perempuan) dengan asrama dan fasilitas gedung pembelajaran yang terpisah."
    },
    {
      question: "Apa saja program unggulan di Ponpes Cendekia Baznas?",
      answer: "Program unggulan kami meliputi Tahfidz Al-Qur'an terpadu, pembiasaan Bahasa Arab & Inggris, pendalaman Kitab Kuning, serta integrasi teknologi dalam pembelajaran (IT & Coding)."
    },
    {
      question: "Apakah tersedia fasilitas asrama?",
      answer: "Tentu. Kami menyediakan fasilitas asrama yang nyaman, bersih, dan modern yang didampingi oleh Musyrif/Musyrifah selama 24 jam penuh untuk mendukung kondusifitas ibadah dan belajar."
    },
    {
      question: "Bagaimana dengan sistem kurikulum pembelajarannya?",
      answer: "Kami menggunakan kurikulum terpadu (Kurikulum Merdeka Diknas & Kurikulum Pesantren Modern) sehingga santri tidak hanya unggul dalam ilmu agama, tapi juga siap menghadapi tantangan akademik global."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // --- EFEK KLIK DI LUAR FAQ UNTUK MENUTUP ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (faqRef.current && !faqRef.current.contains(event.target as Node)) {
        setOpenFaq(null);
      }
    };

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
          entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
          entry.target.classList.remove('opacity-0', 'translate-y-20', 'scale-95');
        }
      });
    }, { threshold: 0.1 });

    const animatedItems = document.querySelectorAll('.animate-on-scroll-contact');
    animatedItems.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="kontak" className="py-24 md:py-32 px-6 md:px-12 bg-slate-50 dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">

      {/* Container Utama (max-w-7xl biar lega) */}
      <div className="max-w-7xl mx-auto space-y-24">

        {/* ============================================================= */}
        {/* SECTION 1: FAQ (FREQUENTLY ASKED QUESTIONS) */}
        {/* ============================================================= */}
        {/* Tambahkan ref={faqRef} ke bungkus luar FAQ */}
        <div ref={faqRef} className="w-full flex flex-col items-center">

          {/* Judul & Pengantar FAQ (Sekarang Rata Tengah dan Icon Ditambahkan) */}
          <div className="w-full max-w-3xl flex flex-col items-center text-center animate-on-scroll-contact opacity-0 translate-y-20 transition-all duration-1000 ease-out mb-10">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4">
              <HelpCircle size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-emerald-950 dark:text-white tracking-tighter mb-4">
              Pusat Informasi Bantuan
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Sebelum menghubungi admin kami, Anda dapat membaca daftar pertanyaan (FAQ) di bawah ini untuk menemukan jawaban secara cepat.
            </p>
          </div>

          {/* Wrapper FAQ Kotak-Kotak (Desain Rata Tengah Max-W-4xl) */}
          <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-[2rem] shadow-xl shadow-emerald-900/5 dark:shadow-none border border-gray-100 dark:border-gray-800 p-4 sm:p-8 animate-on-scroll-contact opacity-0 translate-y-20 transition-all duration-1000 ease-out delay-200">
            <div className="flex flex-col gap-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === index
                      ? 'border-emerald-500 dark:border-emerald-600 bg-emerald-50/50 dark:bg-emerald-900/10 shadow-md'
                      : 'border-gray-200 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-gray-700 bg-white dark:bg-gray-900'
                    }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left outline-none active:scale-[0.99] transition-transform duration-200 group"
                  >
                    <span className={`font-bold text-sm sm:text-base pr-4 ${openFaq === index ? 'text-emerald-800 dark:text-emerald-400' : 'text-gray-800 dark:text-gray-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-500'}`}>
                      {faq.question}
                    </span>
                    <div className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-300 ${openFaq === index ? 'bg-emerald-600 text-white rotate-180' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-emerald-50 dark:group-hover:bg-gray-700'}`}>
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  {/* Efek Slide Down Animasi Isi FAQ */}
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${openFaq === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <div className="p-5 sm:p-6 pt-0 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed border-t border-emerald-100 dark:border-gray-800 mx-5 sm:mx-6 mt-1">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ============================================================= */}
        {/* SECTION DOKUMENTASI (BARU) */}
        {/* ============================================================= */}
        <Dokumentasi />

      </div>
    </section>
  );
};

export default Contact;