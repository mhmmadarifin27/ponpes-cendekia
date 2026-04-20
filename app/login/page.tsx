"use client";
import React, { useState } from 'react';
import { Mail, Lock, Home, Loader2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // --- STATE DAN FUNGSI BARU UNTUK ANIMASI TOMBOL HOME ---
  const [isHomeClicked, setIsHomeClicked] = useState(false);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsHomeClicked(true); // Mengaktifkan class animasi (geser & menghilang)
    
    // Menunda pindah halaman selama 300 milidetik agar animasi sempat diputar
    setTimeout(() => {
      router.push('/'); 
    }, 300);
  };
  // --------------------------------------------------------

  // --- FUNGSI UNTUK RESET / LUPA PASSWORD ---
  const handleResetPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!email) {
      alert("Silakan ketik alamat email Anda di kolom email terlebih dahulu, lalu klik Lupa Password.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`, 
    });

    if (error) {
      alert("Gagal mengirim link reset password: " + error.message);
    } else {
      alert("Berhasil! Silakan cek kotak masuk (atau folder spam) email Anda untuk link reset password.");
    }
    
    setLoading(false);
  };
  // --------------------------------------------------------

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
      
      {/* --- KOTAK LOGIN UTAMA --- */}
      <div className="w-full max-w-[1000px] relative bg-white dark:bg-gray-900 rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col-reverse md:flex-row animate-in fade-in zoom-in-[0.98] duration-1000 ease-out border border-gray-100 dark:border-gray-800">
        
        {/* --- TOMBOL KEMBALI KE BERANDA (Dengan Animasi Isi Meluncur) --- */}
        <button 
          onClick={handleHomeClick}
          // Button utama kita buat overflow-hidden dan efek geser dihapus dari sini
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-1.5 sm:pr-5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-full shadow-sm hover:border-emerald-500 hover:scale-105 transition-all duration-300 ease-in-out group animate-in fade-in slide-in-from-top-4 delay-500 fill-mode-both overflow-hidden"
        >
          {/* Wrapper untuk isi tombol (Ini yang akan meluncur ke kanan saat isHomeClicked true) */}
          <div className={`flex items-center gap-0 sm:gap-2 transition-all duration-300 ease-out ${isHomeClicked ? 'translate-x-24 opacity-0' : 'translate-x-0 opacity-100'}`}>
            
            <div className="w-8 h-8 shrink-0 rounded-full bg-emerald-50 dark:bg-gray-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <Home size={16} />
            </div>
            
            <span className="font-bold text-xs sm:text-sm text-gray-700 dark:text-gray-300 hidden sm:flex items-center gap-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Beranda
              
            </span>
            
          </div>
        </button>

        {/* BAGIAN KIRI: FORM LOGIN */}
        <div className="w-full md:w-1/2 p-6 sm:p-12 lg:p-16 flex flex-col justify-center">
          
          {/* ========================================================= */}
          {/* LOGO BARU (Cendekia & Baznas) */}
          {/* Ditambahkan justify-center md:justify-start agar rata tengah di HP */}
          {/* ========================================================= */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both">
            {/* 1. Logo Utama (Cendekia) */}
            <img 
              src="/logo.png" 
              alt="Logo Pondok Pesantren Cendekia" 
              className="h-10 md:h-12 w-auto object-contain drop-shadow-sm"
            />
            
            {/* Garis Pemisah */}
            <div className="h-8 w-[1px] md:w-[1.5px] bg-gray-200 dark:bg-gray-700 rounded-full mx-0.5" />

            {/* 2. Logo BAZNAS */}
            <img 
              src="/logo baznas.png" 
              alt="Logo Baznas" 
              className="h-8 md:h-10 w-auto object-contain drop-shadow-sm"
            />

            {/* Teks Pendamping - Ditambahkan text-center md:text-left */}
            <div className="flex flex-col justify-center ml-1 text-center md:text-left">
              <h1 className="text-gray-900 dark:text-white font-black text-sm md:text-lg leading-none tracking-tight">Pondok Pesantren</h1>
              <p className="text-[8px] md:text-[10px] text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-widest mt-0.5">
                Cendekia Baznas
              </p>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
            {/* Ditambahkan text-center md:text-left pada h1 dan p */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-2 text-center md:text-left">
              Selamat Datang!
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 md:mb-10 text-center md:text-left">
              Silakan login untuk mengakses Dashboard Admin.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
            
            {/* Input Email (Placeholder Dihapus) */}
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Email Address</label>
              <div className="relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="" 
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-3.5 px-10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm group-hover:border-emerald-200 dark:group-hover:border-emerald-900"
                  required
                />
                <Mail className="absolute left-3.5 top-3.5 text-gray-400 transition-colors group-focus-within:text-emerald-500" size={18} />
              </div>
            </div>

            {/* Input Password (Placeholder Dihapus) */}
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[400ms] fill-mode-both">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Password</label>
              <div className="relative group">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="" 
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-3.5 px-10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm group-hover:border-emerald-200 dark:group-hover:border-emerald-900"
                  required
                />
                <Lock className="absolute left-3.5 top-3.5 text-gray-400 transition-colors group-focus-within:text-emerald-500" size={18} />
              </div>
            </div>

            {/* Fitur Ekstra & Lupa Password yang Berfungsi */}
            <div className="flex items-center justify-between mt-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Ingat Saya</span>
              </label>
              
              {/* TOMBOL LUPA PASSWORD */}
              <button 
                onClick={handleResetPassword}
                type="button" 
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline disabled:opacity-50 active:scale-95 transition-transform"
                disabled={loading}
              >
                Lupa Password?
              </button>
            </div>

            {/* Tombol Submit */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md mt-4 disabled:opacity-70 disabled:cursor-not-allowed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : 'MASUK SEKARANG'}
            </button>
          </form>

          {/* Footer Login */}
          <div className="mt-8 md:mt-12 text-center md:text-left animate-in fade-in duration-1000 delay-700 fill-mode-both">
            <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
              © {new Date().getFullYear()} Website Pondok Pesantren Cendekia.<br className="md:hidden" /> Developed by IT Cendekia.
            </p>
          </div>
        </div>

        {/* BAGIAN KANAN: GAMBAR & TEKS OVERLAY */}
        <div className="w-full h-48 sm:h-64 md:h-auto md:w-1/2 relative bg-emerald-900 overflow-hidden flex flex-shrink-0">
          
          {/* Gambar Background dengan efek zoom lambat */}
          <img 
            src="flyercendekia.jpeg" 
            alt="Santri" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay animate-[spin_60s_linear_infinite] [animation-play-state:paused] hover:[animation-play-state:running] hover:scale-110 transition-transform duration-[10s]"
          />
          
          {/* Overlay Warna Hijau */}
          <div className="absolute inset-0 bg-emerald-900/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent opacity-80" />

          {/* Konten Teks di Atas Gambar */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-6 md:p-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-2 md:mb-6 leading-tight drop-shadow-md animate-in fade-in slide-in-from-right-8 duration-1000 delay-300 fill-mode-both">
              Pendidikan Qur&apos;ani <br className="hidden md:block" /> & Beradab
            </h2>
            <p className="text-emerald-50/90 text-sm lg:text-base leading-relaxed max-w-sm hidden sm:block animate-in fade-in slide-in-from-right-8 duration-1000 delay-500 fill-mode-both">
              &quot;Mewujudkan generasi masa depan yang cerdas, berakhlakul karimah, dan berwawasan global melalui pendidikan pesantren yang prima.&quot;
            </p>
            <div className="w-12 md:w-16 h-1 bg-yellow-500 rounded-full mt-3 md:mt-8 opacity-80 animate-in fade-in zoom-in duration-1000 delay-700 fill-mode-both"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;