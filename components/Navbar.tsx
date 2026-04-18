"use client"; 

import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, Moon, Sun, Menu, X, ArrowRight } from 'lucide-react'; 
import { useTheme } from 'next-themes';
import Link from 'next/link';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efek untuk mendeteksi scroll agar navbar bisa berubah sedikit saat discroll (opsional tapi keren)
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex flex-col w-full transition-all duration-300">
      
      
      {/* --- 1. MAIN NAVBAR (Glassmorphism Effect) --- */}
      <nav className={`
        relative px-6 md:px-12 py-4 transition-all duration-300 border-b
        ${scrolled 
          ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-gray-200/50 dark:border-gray-800/50 shadow-sm' 
          : 'bg-white dark:bg-gray-950 border-transparent'
        }
      `}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo, Teks, dan Logo Baznas (Tetap bisa diklik ke halaman Login Admin) */}
          <Link href="/login" className="flex items-center gap-3 md:gap-4 cursor-pointer group" title="Area Admin">
            
            {/* Kumpulan Gambar Logo */}
            <div className="flex items-center gap-1.5 md:gap-3">
              {/* 1. Logo Utama (Cendekia) */}
              <img 
                src="/logo.png" 
                alt="Logo Pondok Pesantren Cendekia" 
                className="h-10 md:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
              />
              
              {/* Garis Pemisah Vertikal (Sekarang muncul di HP juga tapi lebih kecil) */}
              <div className="h-6 md:h-10 w-[1px] md:w-[1.5px] bg-gray-200 dark:bg-gray-700 rounded-full mx-0.5 md:mx-1" />

              {/* 2. Logo BAZNAS (Sekarang muncul di HP, ukuran h-8) */}
              <img 
                src="/logo baznas.png" // PASTIKAN NAMA FILE-NYA SESUAI, JANGAN ADA SPASI
                alt="Logo Baznas" 
                className="h-8 md:h-15 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
              />
            </div>

            {/* Teks Pendamping Logo (Dikecilkan sedikit di HP agar tidak nabrak menu) */}
            <div className="flex flex-col justify-center">
              <h1 className="text-emerald-950 dark:text-white font-black text-sm md:text-lg leading-none tracking-tight">Pondok Pesantren</h1>
              <p className="text-[8px] md:text-[10px] text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-widest mt-0.5 md:mt-1">
                Cendekia Baznas
              </p>
            </div>

          </Link>

          {/* Menu Links (Desktop) - Menggunakan Micro-interaction Underline */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-700 dark:text-gray-300">
            <Link href="/" className="relative group py-2">
              <span className="group-hover:text-emerald-700 dark:group-hover:text-yellow-400 transition-colors">Beranda</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 dark:bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            {/* Dropdown Profil */}
            <div 
              className="relative group cursor-pointer py-2"
              onMouseEnter={() => setIsProfileOpen(true)}
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              <div className="flex items-center gap-1 group-hover:text-emerald-700 dark:group-hover:text-yellow-400 transition-colors">
                Profil <ChevronDown size={14} className={`transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </div>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 dark:bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              
              {/* Menu Dropdown - Dipertebal dengan z-50 dan shadow-2xl */}
              <div className={`absolute top-full -left-4 w-56 pt-2 z-50 transition-all duration-300 ${isProfileOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                {/* bg-white murni (tanpa transparansi) agar solid dan tidak nembus */}
                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl rounded-2xl py-2 overflow-hidden">
                  <Link href="/tentang" className="block px-5 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-yellow-400 text-sm font-medium transition-colors">Tentang Kami</Link>
                  <Link href="/guru" className="block px-5 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-yellow-400 text-sm font-medium transition-colors">Guru & Asatidz</Link>
                  <Link href="/fasilitas" className="block px-5 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-yellow-400 text-sm font-medium transition-colors">Fasilitas Ponpes</Link>
                  <Link href="/Kurikulum" className="block px-5 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-yellow-400 text-sm font-medium transition-colors">Sistem Kurikulum</Link>
                </div>
              </div>
            </div>

            <Link href="/penerimaan" className="relative group py-2">
              <span className="group-hover:text-emerald-700 dark:group-hover:text-yellow-400 transition-colors">Penerimaan</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 dark:bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/warta" className="relative group py-2">
              <span className="group-hover:text-emerald-700 dark:group-hover:text-yellow-400 transition-colors">Berita</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 dark:bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/hubungi" className="relative group py-2">
              <span className="group-hover:text-emerald-700 dark:group-hover:text-yellow-400 transition-colors">FAQ</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 dark:bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

         {/* Fitur Kanan (Search, Theme, Mobile Menu) */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Search Input Sleek */}
            <div className="hidden lg:flex relative group">
              <Search className="absolute left-3.5 top-2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Pencarian..." 
                className="pl-10 pr-4 py-1.5 w-48 bg-gray-100/80 dark:bg-gray-900 border border-transparent dark:border-gray-800 focus:border-emerald-500/50 dark:focus:border-emerald-500/50 rounded-full text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder-gray-400"
              />
            </div>

            {/* Dark Mode Toggle - Ditambahkan active:scale-90 */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100/80 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-yellow-400 active:scale-90 transition-all duration-200 border border-transparent dark:border-gray-800"
              aria-label="Toggle Dark Mode"
            >
              {!mounted ? <Moon size={16} className="opacity-0" /> : theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile Menu Button - Ditambahkan active:scale-90 */}
            <button 
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-emerald-50 dark:bg-gray-900 text-emerald-900 dark:text-gray-200 border border-emerald-100 dark:border-gray-800 active:scale-90 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================================= */}
      {/* BACKDROP KLIK BEBAS (Klik di luar menu untuk menutup) */}
      {/* ========================================================= */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 w-full h-screen bg-black/20 backdrop-blur-[2px] -z-10 animate-in fade-in duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* --- 2. MOBILE MENU DROPDOWN (Clean Design dengan Efek Sentuh) --- */}
      <div className={`
        md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden transition-all duration-300 ease-in-out origin-top
        ${isMobileMenuOpen ? 'max-h-[500px] opacity-100 py-2' : 'max-h-0 opacity-0 py-0'}
      `}>
        {/* Ditambahkan flex-col tanpa gap besar, diganti dengan padding pada masing-masing link agar area klik lebih luas */}
        <div className="flex flex-col px-4">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3.5 text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-emerald-600 active:bg-emerald-50 dark:active:bg-gray-800 rounded-xl transition-all">Beranda</Link>
          
          <div className="px-4 py-2 flex flex-col">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Profil Pesantren</span>
            <div className="flex flex-col border-l-2 border-emerald-100 dark:border-gray-800 ml-1">
              <Link href="/tentang" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-emerald-600 active:bg-gray-50 dark:active:bg-gray-800 rounded-r-lg transition-all">Tentang Kami</Link>
              <Link href="/guru" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-emerald-600 active:bg-gray-50 dark:active:bg-gray-800 rounded-r-lg transition-all">Guru & Asatidz</Link>
              <Link href="/fasilitas" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-emerald-600 active:bg-gray-50 dark:active:bg-gray-800 rounded-r-lg transition-all">Fasilitas</Link>
              <Link href="/Kurikulum" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-emerald-600 active:bg-gray-50 dark:active:bg-gray-800 rounded-r-lg transition-all">Kurikulum</Link>
            </div>
          </div>
          
          <Link href="/penerimaan" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3.5 text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-emerald-600 active:bg-emerald-50 dark:active:bg-gray-800 rounded-xl transition-all">Penerimaan Santri Baru</Link>
          <Link href="/warta" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3.5 text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-emerald-600 active:bg-emerald-50 dark:active:bg-gray-800 rounded-xl transition-all">Berita Terkini</Link>
          <Link href="/hubungi" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3.5 text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-emerald-600 active:bg-emerald-50 dark:active:bg-gray-800 rounded-xl transition-all">FAQ</Link>
        </div>
      </div>

      <div className="h-[2px] w-full bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 shadow-[0_0_8px_rgba(250,204,21,0.5)] z-20"></div>

    </header>
  );
};

export default Navbar;