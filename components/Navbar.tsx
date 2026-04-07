"use client"; 

import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, Moon, Sun, Menu, X } from 'lucide-react'; 
import { useTheme } from 'next-themes';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex flex-col w-full shadow-md bg-white dark:bg-gray-900 transition-colors duration-300">
      
      {/* --- INJEKSI CSS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 45s linear infinite; 
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .fade-edges {
          -webkit-mask-image: linear-gradient(to right, transparent, black 3%, black 97%, transparent);
          mask-image: linear-gradient(to right, transparent, black 3%, black 97%, transparent);
        }
      `}} />

      {/* --- 1. MAIN NAVBAR --- */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 relative z-10 transition-colors duration-300">
        
        {/* Logo Sekaligus Tombol Login Rahasia */}
        <a href="/login" className="flex items-center gap-2 cursor-pointer group" title="Area Admin">
          <div className="w-10 h-10 bg-emerald-800 dark:bg-emerald-700 rounded-lg flex items-center justify-center text-white font-bold group-hover:bg-emerald-700 transition-colors shadow-sm">
            Az
          </div>
          <div>
            <h1 className="text-emerald-900 dark:text-emerald-50 font-bold leading-none tracking-tight transition-colors">Cendekia</h1>
            <p className="text-[10px] text-yellow-600 dark:text-yellow-500 font-semibold uppercase transition-colors">Pondok Pesantren</p>
          </div>
        </a>

        {/* Menu Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-emerald-900 dark:text-gray-200 transition-colors">
          <a href="/" className="hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors">Beranda</a>
          
          <div 
            className="relative group cursor-pointer"
            onMouseEnter={() => setIsProfileOpen(true)}
            onMouseLeave={() => setIsProfileOpen(false)}
          >
            <div className="flex items-center gap-1 hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors py-2">
              Profil <ChevronDown size={16} className={`transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </div>
            
            {isProfileOpen && (
              <div className="absolute top-full -left-4 w-64 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-xl rounded-xl py-3 z-50 animate-in fade-in slide-in-from-top-2 transition-colors">
                <a href="/tentang" className="block px-5 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-200 text-sm font-medium transition-colors">Tentang Kami</a>
                <a href="guru" className="block px-5 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-200 text-sm font-medium transition-colors">Guru Kami</a>
                <a href="/fasilitas" className="block px-5 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-200 text-sm font-medium transition-colors">Fasilitas</a>
                <a href="Kurikulum" className="block px-5 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-200 text-sm font-medium transition-colors">Kurikulum</a>
                <a href="program" className="block px-5 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-200 text-sm font-medium transition-colors">Program & Dokumentasi</a>
              </div>
            )}
          </div>

          <a href="/penerimaan" className="hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors">Penerimaan Santri Baru</a>
          <a href="/warta" className="hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors">Berita</a>
          <a href="/hubungi" className="hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors">Hubungi Kami</a>
        </div>

        {/* Fitur Kanan */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex relative group">
            <input 
              type="text" 
              placeholder="Cari informasi..." 
              className="pl-10 pr-4 py-2 w-48 lg:w-64 bg-gray-100 dark:bg-gray-800 border border-transparent dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-full text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder-gray-400 dark:placeholder-gray-500"
            />
            <Search className="absolute left-3.5 top-2.5 text-gray-400 dark:text-gray-500 group-focus-within:text-emerald-600 transition-colors" size={16} />
          </div>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
            aria-label="Toggle Dark Mode"
          >
            {!mounted ? (
              <Moon size={18} className="opacity-40" />
            ) : theme === 'dark' ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

          <button 
            className="md:hidden p-2 text-emerald-900 dark:text-gray-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* --- PERBAIKAN MENU HP (ABSOLUTE AGAR TIDAK MENDORONG HERO) --- */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full flex flex-col px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-xl z-[100]">
            <a href="/" className="py-3 text-emerald-900 dark:text-gray-200 font-medium border-b border-gray-100 dark:border-gray-700">Beranda</a>
            
            <div className="py-3 border-b border-gray-100 dark:border-gray-700 flex flex-col">
              <span className="text-emerald-900 dark:text-gray-200 font-medium mb-2">Profil</span>
              <div className="flex flex-col pl-4 border-l-2 border-emerald-300 dark:border-gray-600 gap-3 mt-1">
                <a href="/tentang" className="text-sm text-gray-600 dark:text-gray-400">Tentang Kami</a>
                <a href="guru" className="text-sm text-gray-600 dark:text-gray-400">Guru Kami</a>
                <a href="/fasilitas" className="text-sm text-gray-600 dark:text-gray-400">Fasilitas</a>
                <a href="/Kurikulum" className="text-sm text-gray-600 dark:text-gray-400">Kurikulum</a>
                <a href="/program" className="text-sm text-gray-600 dark:text-gray-400">Program & Dokumentasi</a>
              </div>
            </div>
            
            <a href="/penerimaan" className="py-3 text-emerald-900 dark:text-gray-200 font-medium border-b border-gray-100 dark:border-gray-700">Penerimaan Santri Baru</a>
            <a href="/warta" className="py-3 text-emerald-900 dark:text-gray-200 font-medium border-b border-gray-100 dark:border-gray-700">Berita</a>
            <a href="/hubungi" className="py-3 text-emerald-900 dark:text-gray-200 font-medium">Hubungi Kami</a>
          </div>
        )}
      </nav>

      {/* --- GARIS EMAS PEMISAH (GOLD LINE) --- */}
      <div className="h-[2px] w-full bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 shadow-[0_0_8px_rgba(250,204,21,0.5)] z-20"></div>

      
    </header>
  );
};

export default Navbar;