"use client";
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Phone, Clock, MessageCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function HubungiPage() {

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

      {/* KONTEN UTAMA (Kiri: Info, Kanan: Maps) */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 md:px-12 py-16 md:py-24">
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
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-emerald-950 dark:text-white mb-2">Admin PPDB (Nanda)</h3>
                <p className="font-semibold text-base text-gray-800 dark:text-gray-200 mb-4 tracking-wide">0852-6796-2898</p>
                <a href="https://wa.me/6285267962898" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold bg-yellow-500 text-emerald-950 px-5 py-2.5 rounded-xl hover:bg-yellow-400 transition-colors shadow-sm w-fit active:scale-95">
                  <MessageCircle size={16} /> Chat WhatsApp Sekarang
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