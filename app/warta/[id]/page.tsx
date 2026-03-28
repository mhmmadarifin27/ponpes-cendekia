"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
// PERBAIKAN: Pakai alias @ agar path komponen selalu tepat
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, User, Eye, ChevronRight, Loader2, Share2, Printer,  Mail } from 'lucide-react';
import Link from 'next/link';

const WartaDetail = () => {
  const params = useParams();
  const id = params.id; 
  
  const [artikel, setArtikel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtikel = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('warta')
        .select('*')
        .eq('id', id)
        .single(); 
      
      if (data) setArtikel(data);
      setLoading(false);
    };
    
    if (id) fetchArtikel();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-emerald-600 mb-4" size={40} />
        <p className="text-gray-500">Membaca data berita...</p>
      </div>
    );
  }

  if (!artikel) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Berita Tidak Ditemukan</h1>
        <Link href="/warta" className="text-emerald-600 mt-4 underline">Kembali ke daftar berita</Link>
      </div>
    );
  }

  return (
    // PERBAIKAN: Dibuat standard block layout tanpa flex-col agar Footer tidak tertekan
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <Navbar />
      
      {/* PERBAIKAN: min-h-[70vh] memastikan ruang konten cukup panjang untuk mendorong Footer ke bawah */}
      <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto min-h-[70vh]">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8 truncate">
          <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/warta" className="hover:text-emerald-600 transition-colors">Berita</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 dark:text-white font-medium truncate">{artikel.judul}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* KIRI: Konten Utama Berita */}
          <div className="lg:col-span-8">
            
            {/* JUDUL BERITA */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
              {artikel.judul}
            </h1>
            
            {/* META INFO (Penulis, Tanggal, Views) */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
              <div className="font-semibold text-emerald-600 dark:text-emerald-400">{artikel.penulis || 'Admin Cendekia'}</div>
              <div>{formatDate(artikel.created_at)}</div>
              <div className="flex items-center gap-1"><Printer size={14} className="ml-2" /> <Eye size={14} className="ml-2" /> {Math.floor(Math.random() * 500) + 100} Views</div>
            </div>

            {/* GAMBAR HERO */}
            <div className="w-full mb-3">
              <img 
                src={artikel.gambar_url || "https://images.unsplash.com/photo-1546422904-90eab23c3d7e?q=80"} 
                alt={artikel.judul} 
                className="w-full max-h-[500px] object-cover rounded-md shadow-sm" 
              />
            </div>
            
            {/* CAPTION GAMBAR */}
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 italic mb-10">
              Ilustrasi dokumentasi kegiatan. (Foto: Humas Ponpes Cendekia)
            </p>

            {/* ISI KONTEN BERITA */}
            <div className="prose dark:prose-invert max-w-none mb-10">
              <p className="text-gray-800 dark:text-gray-200 text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                {artikel.konten}
              </p>
            </div>

            {/* TAGS & SHARE */}
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tags:</span>
                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded border border-gray-200 dark:border-gray-700">PonpesCendekia</span>
                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded border border-gray-200 dark:border-gray-700">BeritaTerkini</span>
              </div>
              
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Share:</span>
                <button className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center hover:bg-gray-600 transition-colors"><Mail size={14} /></button>
              </div>
            </div>

            {/* RELATED POSTS (Berita Terkait gaya list) */}
            <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Related Posts</h3>
              <ul className="space-y-3">
                <li className="flex gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors cursor-pointer">
                  <span className="text-gray-400">•</span> Pendaftaran PPDB Gelombang 2 Resmi Dibuka, Simak Syaratnya
                </li>
                <li className="flex gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors cursor-pointer">
                  <span className="text-gray-400">•</span> Santri Cendekia Raih Juara Umum MQK Tingkat Nasional
                </li>
                <li className="flex gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors cursor-pointer">
                  <span className="text-gray-400">•</span> Jadwal Kepulangan Santri Menjelang Libur Ramadhan 1447 H
                </li>
              </ul>
            </div>
            
          </div>

          {/* KANAN: Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              
              {/* Kategori Populer */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Kategori</h3>
                <div className="space-y-3 mt-4">
                  {['Kegiatan Santri', 'Akademik & Prestasi', 'Pengumuman Resmi', 'Artikel Islami'].map((cat, i) => (
                    <div key={i} className="flex justify-between items-center py-1 group cursor-pointer">
                      <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-emerald-600 transition-colors">{cat}</span>
                      <span className="text-xs text-gray-400">({Math.floor(Math.random() * 20) + 5})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Banner Iklan / Pengumuman (Opsional) */}
              <div className="bg-emerald-900 rounded-xl p-6 text-center text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="font-bold mb-2">Penerimaan Santri Baru</h4>
                  <p className="text-xs text-emerald-200 mb-4">Tahun Ajaran 2026/2027 telah dibuka.</p>
                  <button className="bg-yellow-500 text-emerald-950 text-xs font-bold px-4 py-2 rounded hover:bg-yellow-400 transition-colors">
                    Daftar Sekarang
                  </button>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-20"><User size={100} /></div>
              </div>

            </div>
          </div>

        </div>
      </main>
      
      {/* Footer dipanggil langsung tanpa div khusus */}
      <Footer />
      
    </div>
  );
};

export default WartaDetail;