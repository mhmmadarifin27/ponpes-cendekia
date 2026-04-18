"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Phone, Clock, MessageCircle, ChevronRight, ChevronDown, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function HubungiPage() {
  // --- STATE UNTUK FAQ DROPDOWN ---
  const [openFaq, setOpenFaq] = useState<number | null>(0); // Default FAQ pertama terbuka

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
        <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-16 items-start scroll-anim-page opacity-0 translate-y-24 transition-all duration-1000 ease-out">
          
          {/* Judul & Pengantar FAQ (Kiri) */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-2">
              <HelpCircle size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-emerald-950 dark:text-white tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
              Sebelum menghubungi admin kami, Anda dapat membaca daftar pertanyaan (FAQ) di samping untuk menemukan jawaban secara cepat.
            </p>
          </div>

          {/* List Accordion FAQ (Kanan) */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
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

        {/* Garis Pemisah Halus */}
        <div className="w-full h-px bg-gray-200 dark:bg-gray-800 scroll-anim-page opacity-0 transition-opacity duration-1000"></div>

        {/* ============================================================= */}
        {/* SECTION 2: INFORMASI KONTAK & MAPS (Kiri: Info, Kanan: Maps) */}
        {/* ============================================================= */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
          
          {/* SISI KIRI: KARTU INFORMASI */}
          <div className="w-full lg:w-5/12 flex flex-col gap-6">
            
            {/* Card 1: Alamat */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-sm border border-gray-200 dark:border-gray-700 flex gap-6 group hover:shadow-xl hover:border-emerald-200 transition-all scroll-anim-page opacity-0 -translate-x-24 duration-1000 ease-out">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-gray-900 text-emerald-700 dark:text-yellow-500 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-emerald-950 dark:text-white mb-2">Lokasi Pesantren</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Pondok Pesantren Cendekia Baznas<br />
                  Kota Palembang, Sumatera Selatan<br />
                  (Dekat area UIN Raden Fatah / Pusat Kota)
                </p>
              </div>
            </div>

            {/* Card 2: WhatsApp Admin */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-sm border border-gray-200 dark:border-gray-700 flex gap-6 group hover:shadow-xl hover:border-emerald-200 transition-all scroll-anim-page opacity-0 -translate-x-24 duration-1000 ease-out delay-100">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-gray-900 text-emerald-700 dark:text-yellow-500 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Phone size={24} />
              </div>
              <div className="flex-grow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg text-emerald-950 dark:text-white mb-1">Admin PPDB (Nanda)</h3>
                  <p className="font-semibold text-base text-gray-800 dark:text-gray-200 tracking-wide">0852-6796-2898</p>
                </div>
                <a href="https://wa.me/6285267962898" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-xs font-bold bg-yellow-500 text-emerald-950 px-5 py-3 rounded-xl hover:bg-yellow-400 shadow-sm shrink-0 whitespace-nowrap active:scale-95 transition-all">
                  <MessageCircle size={16} /> Chat Sekarang
                </a>
              </div>
            </div>

            {/* Card 3: Waktu Operasional */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-sm border border-gray-200 dark:border-gray-700 flex gap-6 group hover:shadow-xl hover:border-emerald-200 transition-all scroll-anim-page opacity-0 -translate-x-24 duration-1000 ease-out delay-200">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-gray-900 text-emerald-700 dark:text-yellow-500 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-emerald-950 dark:text-white mb-2">Jam Operasional & Kunjung</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-2">
                  <span className="font-semibold">Senin - Jum'at:</span> 08.00 - 15.00 WIB
                </p>
                <p className="text-emerald-800 dark:text-yellow-500 text-sm font-semibold leading-relaxed p-3 bg-emerald-50 dark:bg-gray-900 rounded-xl border border-emerald-100 dark:border-gray-700">
                  Jadwal Kunjungan Wali Santri: <br/>Setiap Ahad (Minggu) pekan ke-2 & ke-4.
                </p>
              </div>
            </div>

          </div>

          {/* SISI KANAN: MAPS RAKSASA */}
          <div className="w-full lg:w-7/12 min-h-[400px] lg:min-h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800 relative scroll-anim-page opacity-0 translate-x-24 transition-all duration-1000 ease-out delay-200 group">
            {/* Ganti src ini dengan link embed Google Maps asli nantinya */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127504.4234053913!2d104.66444874052309!3d-2.95608779642571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b75e8fc27a3e3%3A0x3039d80b22070c0!2sPalembang%2C%20Kota%20Palembang%2C%20Sumatera%20Selatan!5e0!3m2!1sid!2sid!4v1709210000000!5m2!1sid!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '100%' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
            
            {/* Overlay Gradient sedikit di atas peta biar makin cantik */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent pointer-events-none" />
            
            {/* Label Petunjuk Map */}
            <div className="absolute bottom-8 right-8 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 pointer-events-none">
              <p className="text-sm font-black text-emerald-900 dark:text-yellow-500 flex items-center gap-2 uppercase tracking-wide">
                <MapPin size={16} /> Navigasi Maps
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}