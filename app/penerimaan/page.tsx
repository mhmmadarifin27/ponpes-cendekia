"use client";
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  CheckCircle2, 
  FileText, 
  MessageCircle, 
  ArrowRight, 
  BookOpen, 
  ShieldCheck, 
  Languages, 
  Users, 
  Lightbulb, 
  Briefcase 
} from 'lucide-react';
import Link from 'next/link';

const PenerimaanPage = () => {

  // --- EFEK ANIMASI SCROLL ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
          entry.target.classList.remove('opacity-0', 'translate-y-24', 'scale-95');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.scroll-anim-ppdb');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Format Pesan WhatsApp Otomatis
  const waNumber = "6285267962898"; // Nomor Nanda dari flyer
  const waMessage = encodeURIComponent("Assalamu'alaikum Kak Nanda, saya ingin mendapatkan informasi lebih lanjut mengenai Pendaftaran Santri Baru di Pondok Pesantren Cendekia Tahun Ajaran 2026/2027.");
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  const keunggulan = [
    { title: "Islamic Character Building", desc: "Membentuk pondasi karakter Islami sejak dini melalui pembiasaan adab, akhlak, disiplin, dan tanggung jawab.", icon: <ShieldCheck size={24} /> },
    { title: "Tahfidz Quran Intensive", desc: "Membimbing siswa menghafal Al-Qur'an secara bertahap dengan metode terstruktur dan pendampingan rutin.", icon: <BookOpen size={24} /> },
    { title: "Tajwid & Qiraat Intensive", desc: "Menguatkan kemampuan membaca Al-Qur'an dengan benar sesuai makhraj dan tajwid, sekaligus membiasakan irama yang baik.", icon: <FileText size={24} /> },
    { title: "English & Arabic Day", desc: "Melatih komunikasi aktif melalui hari khusus berbahasa Inggris dan Arab, membangun keberanian berbicara.", icon: <Languages size={24} /> },
    { title: "Al-Qur'an Buddy", desc: "Program pendampingan berkelompok untuk murojaah, agar anak saling menguatkan dan merasa punya teman perjuangan.", icon: <Users size={24} /> },
    { title: "Project Based Learning", desc: "Mengasah cara berpikir kritis, kreativitas, dan problem solving melalui proyek nyata lintas pelajaran.", icon: <Lightbulb size={24} /> },
    { title: "Kajian Kitab Kuning", desc: "Pendalaman literatur Islam klasik untuk memperkuat fondasi keilmuan syariat bermazhab Ahlussunnah wal Jama'ah.", icon: <BookOpen size={24} /> },
    { title: "Program Entrepreneur", desc: "Membekali santri dengan jiwa kemandirian dan kewirausahaan untuk bekal masa depan yang cemerlang.", icon: <Briefcase size={24} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 font-sans text-gray-800 dark:text-gray-300">
      <Navbar />
      
      <main className="pt-32 pb-20 overflow-hidden">
        
        {/* ========================================= */}
        {/* 1. HEADER & FLYER SECTION                 */}
        {/* ========================================= */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 text-center mb-20">
          <div className="scroll-anim-ppdb opacity-0 translate-y-24 transition-all duration-1000 ease-out">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
              Penerimaan Santri Baru 2026/2027
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              Bergabunglah Bersama <br className="hidden md:block" />
              <span className="text-emerald-700 dark:text-yellow-500">Generasi Emas Cendekia</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
              Pondok Pesantren Cendekia Baznas Kota Palembang dengan bangga membuka Penerimaan Santri Baru Tahun Ajaran 2026/2027 (Khusus Putra). Kami menghadirkan pendidikan Islami yang seimbang antara kecerdasan akademik, pembiasaan adab, dan pembentukan karakter.
            </p>
          </div>

          {/* FLYER IMAGE */}
          <div className="relative max-w-5xl mx-auto rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 scroll-anim-ppdb opacity-0 scale-95 transition-all duration-1000 delay-200 ease-out group">
            <img 
              src="/flyercendekia.jpeg" 
              alt="Flyer Penerimaan Santri Baru" 
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Aksen kilauan di ujung flyer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none translate-x-[-100%] group-hover:translate-x-[100%] ease-in-out" style={{ transitionDuration: '1.5s' }} />
          </div>
        </section>

        {/* ========================================= */}
        {/* 2. SYARAT PENDAFTARAN                     */}
        {/* ========================================= */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 mb-24">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 md:p-12 scroll-anim-ppdb opacity-0 translate-y-24 transition-all duration-1000 ease-out">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="w-full md:w-1/3 text-center md:text-left border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 pb-8 md:pb-0 md:pr-8">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Persyaratan Pendaftaran</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Siapkan dokumen berikut sebelum melakukan pendaftaran. Kuota Terbatas!
                </p>
              </div>
              <div className="w-full md:w-2/3">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Fotocopy Akte Kelahiran",
                    "Fotocopy Kartu Keluarga (KK)",
                    "Fotocopy KTP Orang Tua/Wali",
                    "Fotocopy Ijazah SD/MI Sederajat",
                    "Surat Keterangan Sehat",
                    "Pas Foto 3x4",
                    "Surat Keterangan Tidak Mampu (Bagi Yatim Dhuafa)"
                  ].map((syarat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="text-emerald-600 dark:text-yellow-500 shrink-0 mt-0.5" size={20} />
                      <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{syarat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 3. KEUNGGULAN PROGRAM                     */}
        {/* ========================================= */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
          <div className="text-center mb-16 scroll-anim-ppdb opacity-0 translate-y-24 transition-all duration-1000 ease-out">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Kenapa Memilih Kami?
            </h2>
            <div className="w-20 h-1 bg-yellow-500 mx-auto rounded-full" />
            <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Setiap program yang dirancang berfokus pada penguatan nilai Qur'ani sekaligus membekali santri dengan kesiapan menghadapi tantangan masa depan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keunggulan.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group scroll-anim-ppdb opacity-0 translate-y-24 ease-out"
                style={{ transitionDelay: `${(idx % 4) * 100}ms` }}
              >
                <div className="w-12 h-12 bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-yellow-500 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white dark:group-hover:bg-yellow-500 dark:group-hover:text-emerald-950 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================= */}
        {/* 4. CTA PENDAFTARAN WHATSAPP               */}
        {/* ========================================= */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 text-center scroll-anim-ppdb opacity-0 scale-95 transition-all duration-1000 ease-out">
          <div className="bg-emerald-900 dark:bg-gray-800 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden shadow-2xl border border-emerald-800 dark:border-gray-700">
            
            {/* Ornamen Background CTA */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 dark:bg-gray-700 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                Siap Mendaftar?
              </h2>
              <p className="text-emerald-100 dark:text-gray-300 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
                Pendaftaran sangat mudah! Silakan klik tombol di bawah ini untuk langsung terhubung dengan panitia penerimaan santri baru melalui WhatsApp.
              </p>
              
              <a 
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-yellow-500 text-emerald-950 font-extrabold text-lg px-8 py-5 rounded-2xl hover:bg-yellow-400 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(234,179,8,0.3)] group"
              >
                <MessageCircle size={24} className="group-hover:animate-bounce" />
                Daftar via WhatsApp Sekarang
              </a>
              
              <p className="mt-6 text-emerald-200/70 dark:text-gray-500 text-xs uppercase tracking-widest">
                Layanan Informasi Aktif (Nanda)
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default PenerimaanPage;