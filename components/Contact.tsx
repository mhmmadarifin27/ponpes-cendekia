"use client";
import React, { useState, useEffect } from 'react';
import { MapPin, Phone, MessageCircle, Clock, ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const Contact = () => {
  // --- STATE UNTUK FAQ DROPDOWN ---
  const [openFaq, setOpenFaq] = useState<number | null>(0); // Default FAQ pertama terbuka (0)

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
        <div className="w-full flex flex-col items-center">
          
          <div className="text-center animate-on-scroll-contact opacity-0 translate-y-20 transition-all duration-1000 ease-out mb-10">
            <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-400 font-bold text-xs tracking-widest uppercase mb-4 shadow-sm border border-emerald-200 dark:border-gray-800">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-emerald-950 dark:text-white tracking-tighter mb-4">
              Pusat Informasi Bantuan
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Temukan jawaban cepat untuk pertanyaan yang paling sering diajukan mengenai program akademik, pendaftaran, dan fasilitas di Pondok Pesantren Cendekia Baznas.
            </p>
          </div>

          {/* Wrapper FAQ Kotak-Kotak (Desain Mirip Referensi) */}
          <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-[2rem] shadow-xl shadow-emerald-900/5 dark:shadow-none border border-gray-100 dark:border-gray-800 p-4 sm:p-8 animate-on-scroll-contact opacity-0 translate-y-20 transition-all duration-1000 ease-out delay-200">
            <div className="flex flex-col gap-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                    openFaq === index 
                      ? 'border-emerald-500 dark:border-emerald-600 bg-emerald-50/50 dark:bg-emerald-900/10 shadow-md' 
                      : 'border-gray-200 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-gray-700 bg-white dark:bg-gray-900'
                  }`}
                >
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left outline-none active:scale-[0.99] transition-transform duration-200"
                  >
                    <span className={`font-bold text-sm sm:text-base pr-4 ${openFaq === index ? 'text-emerald-800 dark:text-emerald-400' : 'text-gray-800 dark:text-gray-200'}`}>
                      {faq.question}
                    </span>
                    <div className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-300 ${openFaq === index ? 'bg-emerald-600 text-white rotate-180' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}>
                      <ChevronDown size={18} />
                    </div>
                  </button>
                  
                  {/* Efek Slide Down Animasi Isi FAQ */}
                  <div 
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      openFaq === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
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
        {/* SECTION 2: INFORMASI KONTAK & CTA DAFTAR */}
        {/* ============================================================= */}
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16">
          
          {/* SISI KIRI: INFORMASI KONTAK (Panel Berdesain Bersih & Profesional) */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-8 justify-center">
            
            {/* Header Panel */}
            <div className="animate-on-scroll-contact opacity-0 translate-y-20 transition-all duration-1000 ease-out mb-4">
              <p className="text-emerald-700 dark:text-yellow-500 font-bold uppercase tracking-[0.2em] text-[11px] mb-3">
                Layanan Admin
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-emerald-950 dark:text-white tracking-tighter mb-5">
                Hubungi Pesantren
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
                Siap melayani pertanyaan Anda terkait pendaftaran santri baru, program, maupun kunjungan ke lokasi pesantren kami di Palembang.
              </p>
            </div>

            {/* Kartu-Kartu Informasi */}
            <div className="space-y-6">
              
              {/* Card 1: Alamat */}
              <div className="animate-on-scroll-contact opacity-0 translate-y-20 transition-all duration-1000 ease-out delay-100 bg-white dark:bg-gray-900 p-7 rounded-[1.5rem] border border-gray-100 dark:border-gray-800 flex gap-6 group hover:shadow-lg hover:border-emerald-200 transition-all">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-yellow-500 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg mb-1.5">Lokasi Pesantren</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm leading-relaxed">
                    Pondok Pesantren Cendekia Baznas, Kota Palembang.<br /> (Area UIN Raden Fatah / Pusat Kota)
                  </p>
                </div>
              </div>

              {/* Card 2: WhatsApp Admin */}
              <div className="animate-on-scroll-contact opacity-0 translate-y-20 transition-all duration-1000 ease-out delay-200 bg-white dark:bg-gray-900 p-7 rounded-[1.5rem] border border-gray-100 dark:border-gray-800 flex gap-6 group hover:shadow-lg hover:border-emerald-200 transition-all">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-yellow-500 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <div className="flex-grow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg mb-1.5">Admin PPDB (Nanda)</h3>
                    <p className="font-semibold text-sm md:text-base text-gray-800 dark:text-gray-200 tracking-wider">0852-6796-2898</p>
                  </div>
                  <a href="https://wa.me/6285267962898" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-xs font-bold bg-yellow-500 text-emerald-950 px-5 py-3 rounded-xl hover:bg-yellow-400 transition-colors shadow-sm shrink-0 whitespace-nowrap active:scale-95">
                    <MessageCircle size={16} /> Chat WhatsApp
                  </a>
                </div>
              </div>

              {/* Card 3: Jadwal Operasional & Kunjung */}
              <div className="animate-on-scroll-contact opacity-0 translate-y-20 transition-all duration-1000 ease-out delay-300 bg-white dark:bg-gray-900 p-7 rounded-[1.5rem] border border-gray-100 dark:border-gray-700 flex gap-6 group hover:shadow-lg hover:border-emerald-200 transition-all">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-yellow-500 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg mb-1.5">Jam Operasional & Kunjung</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-2"><span className="font-semibold text-gray-800 dark:text-gray-100">Senin - Jum'at:</span> 08.00 - 15.00 WIB (Layanan Informasi)</p>
                  <p className="text-xs md:text-sm text-emerald-800 dark:text-emerald-400 font-semibold leading-relaxed">Jadwal Kunjungan Wali Santri: Setiap Ahad (Minggu) pekan ke-2 & ke-4.</p>
                </div>
              </div>

            </div>
          </div>

          {/* SISI KANAN: AJAKAN DAFTAR (Kotak Hijau Tua Monolitik & Standout) */}
          <div className="w-full lg:w-1/2 bg-emerald-800 dark:bg-gray-900 rounded-[2.5rem] shadow-2xl p-10 md:p-16 flex flex-col justify-center animate-on-scroll-contact opacity-0 translate-y-20 lg:translate-y-0 lg:scale-95 transition-all duration-1000 ease-out delay-400 overflow-hidden relative group border border-emerald-700/50 dark:border-gray-800">
            
            {/* EFEK BACKGROUND BARU (Pure CSS) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-yellow-500/30 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000 ease-out" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-400/20 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000 ease-out" />
              <div 
                className="absolute inset-0 opacity-[0.08] dark:opacity-[0.03]" 
                style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '24px 24px' }}
              />
            </div>
            
            {/* Konten CTA */}
            <div className="relative z-10">
              
              {/* Kumpulan Gambar Logo & Teks Pendaftaran */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-2 shrink-0 bg-white/10 dark:bg-black/20 p-2.5 rounded-2xl backdrop-blur-sm border border-white/10">
                  <img src="/logo.png" alt="Logo Pondok Pesantren Cendekia" className="h-10 md:h-12 w-auto object-contain drop-shadow-md" />
                  <div className="h-8 w-[1.5px] bg-emerald-500/50 dark:bg-gray-600 rounded-full mx-0.5" />
                  <img src="/logo-baznas.png" alt="Logo Baznas" className="h-8 md:h-12 w-auto object-contain drop-shadow-md" />
                </div>
                <div className="flex flex-col justify-center">
                  <h1 className="text-white font-black text-lg md:text-xl leading-none tracking-tight">Pondok Pesantren</h1>
                  <p className="text-[9px] md:text-[11px] text-yellow-500 font-bold uppercase tracking-widest mt-1">Cendekia Baznas</p>
                </div>
              </div>

              {/* Judul CTA */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 tracking-tighter">
                Siap Menjadi Bagian Dari <span className="text-yellow-400">Generasi Qur'ani</span> & Berwawasan Global?
              </h3>

              {/* Deskripsi CTA */}
              <p className="text-emerald-100 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-12 opacity-95 max-w-xl">
                Bergabunglah bersama keluarga besar Pondok Pesantren Cendekia Palembang. Kami berkomitmen mendidik generasi huffadz Al-Qur'an yang cerdas logika, mulia akhlak, dan siap hadapi teknologi masa depan.
              </p>

              {/* Tombol Pendaftaran */}
              <Link 
                href="https://wa.me/6285267962898?text=Assalamu'alaikum,%20saya%20ingin%20mendaftar%20di%20Ponpes%20Cendekia." 
                target="_blank" 
                className="group inline-flex items-center justify-center gap-3 bg-yellow-500 text-emerald-950 px-9 py-5 rounded-xl font-bold hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-xl shadow-yellow-500/30 active:scale-95 text-lg md:text-xl w-full sm:w-auto whitespace-nowrap"
                >
                Daftar Sekarang
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;