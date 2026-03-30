"use client";
import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Home, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert("Gagal masuk! Cek lagi email atau passwordnya ya. Error: " + error.message);
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-950 relative p-4 sm:p-6 transition-colors duration-500 font-sans">
      
      {/* --- KOTAK LOGIN UTAMA (SPLIT LAYOUT) --- */}
      {/* PERBAIKAN: Tambah class "relative" agar tombol Home bisa menempel di dalam kotak ini */}
      <div className="w-full max-w-[1000px] relative bg-white dark:bg-gray-900 rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-500 border border-gray-100 dark:border-gray-800">
        
        {/* --- TOMBOL KEMBALI KE BERANDA (PINDAH KE DALAM KARTU POJOK KANAN ATAS) --- */}
        <Link 
          href="/" 
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 flex items-center gap-2 p-1.5 pr-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-full shadow-sm hover:border-emerald-500 transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-gray-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
            <Home size={16} />
          </div>
          <span className="font-bold text-xs sm:text-sm text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 hidden sm:block">
            Home
          </span>
        </Link>

        {/* BAGIAN KIRI: FORM LOGIN */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          
          {/* Logo Kecil */}
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-black text-xl mb-8">
            Az
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
            Selamat Datang!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-10">
            Silakan login untuk mengakses Dashboard Cendekia.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Input Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cendekia.ac.id"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-3.5 px-10 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm"
                  required
                />
                <Mail className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-3.5 px-10 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm"
                  required
                />
                <Lock className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
              </div>
            </div>

            {/* Fitur Ekstra (Ingat Saya & Lupa Password) */}
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Ingat Saya</span>
              </label>
              <a href="#" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                Lupa Password?
              </a>
            </div>

            {/* Tombol Submit */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : 'MASUK SEKARANG'}
            </button>
          </form>

          {/* Footer Login */}
          <div className="mt-12 text-center">
            <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
              © {new Date().getFullYear()} Website Pondok Pesantren Cendekia.<br className="md:hidden" /> Developed by IT Cendekia.
            </p>
          </div>
        </div>

        {/* BAGIAN KANAN: GAMBAR & TEKS OVERLAY (Sembunyi di HP) */}
        <div className="hidden md:flex w-1/2 relative bg-emerald-900 overflow-hidden">
          {/* Gambar Background */}
          <img 
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80" 
            alt="Santri" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
          />
          {/* Overlay Warna Hijau */}
          <div className="absolute inset-0 bg-emerald-900/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent opacity-80" />

          {/* Konten Teks di Atas Gambar */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-6 leading-tight">
              Pendidikan Qur&apos;ani <br /> & Beradab
            </h2>
            <p className="text-emerald-50/90 text-sm lg:text-base leading-relaxed max-w-sm">
              "Mewujudkan generasi masa depan yang cerdas, berakhlakul karimah, dan berwawasan global melalui pendidikan pesantren yang prima."
            </p>
            <div className="w-16 h-1 bg-yellow-500 rounded-full mt-8 opacity-80"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;