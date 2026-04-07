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
      
      

      {/* --- 2. MAIN NAVBAR (Glassmorphism Effect) --- */}
      <nav className={`
        relative px-6 md:px-12 py-4 transition-all duration-300 border-b
        ${scrolled 
          ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-gray-200/50 dark:border-gray-800/50 shadow-sm' 
          : 'bg-white dark:bg-gray-950 border-transparent'
        }
      `}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/login" className="flex items-center gap-3 cursor-pointer group" title="Area Admin">
            <div className="w-10 h-10 bg-emerald-800 dark:bg-emerald-700 rounded-xl flex items-center justify-center text-white font-black group-hover:bg-emerald-700 group-hover:scale-105 transition-all shadow-sm">
              Az
            </div>
            <div className="flex flex-col">
              <h1 className="text-emerald-950 dark:text-white font-black text-lg leading-none tracking-tight">Cendekia</h1>
              <p className="text-[9px] text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-widest mt-0.5">Pondok Pesantren</p>
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
              
              {/* Menu Dropdown - Smooth Fade */}
              <div className={`absolute top-full -left-4 w-56 pt-2 transition-all duration-300 ${isProfileOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl rounded-2xl py-2 overflow-hidden">
                  <Link href="/tentang" className="block px-5 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-yellow-400 text-sm font-medium transition-colors">Tentang Kami</Link>
                  <Link href="/guru" className="block px-5 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-yellow-400 text-sm font-medium transition-colors">Guru & Asatidz</Link>
                  <Link href="/fasilitas" className="block px-5 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-yellow-400 text-sm font-medium transition-colors">Fasilitas Ponpes</Link>
                  <Link href="/Kurikulum" className="block px-5 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-yellow-400 text-sm font-medium transition-colors">Sistem Kurikulum</Link>
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
              <span className="group-hover:text-emerald-700 dark:group-hover:text-yellow-400 transition-colors">Kontak</span>
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

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100/80 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-yellow-400 transition-all border border-transparent dark:border-gray-800"
              aria-label="Toggle Dark Mode"
            >
              {!mounted ? <Moon size={16} className="opacity-0" /> : theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-emerald-50 dark:bg-gray-900 text-emerald-900 dark:text-gray-200 border border-emerald-100 dark:border-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- 3. MOBILE MENU DROPDOWN (Clean Design) --- */}
      <div className={`
        md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden transition-all duration-300 ease-in-out origin-top
        ${isMobileMenuOpen ? 'max-h-[500px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}
      `}>
        <div className="flex flex-col px-6 gap-1">
          <Link href="/" className="py-3 text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-emerald-600 transition-colors border-b border-gray-100 dark:border-gray-800/50">Beranda</Link>
          
          <div className="py-3 border-b border-gray-100 dark:border-gray-800/50 flex flex-col">
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">Profil Pesantren</span>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-emerald-100 dark:border-gray-800">
              <Link href="/tentang" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-yellow-400 transition-colors">Tentang Kami</Link>
              <Link href="/guru" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-yellow-400 transition-colors">Guru & Asatidz</Link>
              <Link href="/fasilitas" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-yellow-400 transition-colors">Fasilitas</Link>
              <Link href="/Kurikulum" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-yellow-400 transition-colors">Kurikulum</Link>
            </div>
          </div>
          
          <Link href="/penerimaan" className="py-3 text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-emerald-600 transition-colors border-b border-gray-100 dark:border-gray-800/50">Penerimaan Santri Baru</Link>
          <Link href="/warta" className="py-3 text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-emerald-600 transition-colors border-b border-gray-100 dark:border-gray-800/50">Berita Terkini</Link>
          <Link href="/hubungi" className="py-3 text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-emerald-600 transition-colors">Hubungi Kami</Link>
        </div>
      </div>
{/* --- GARIS EMAS PEMISAH (GOLD LINE) --- */}
      <div className="h-[2px] w-full bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 shadow-[0_0_8px_rgba(250,204,21,0.5)] z-20"></div>

    </header>
  );
};

export default Navbar;