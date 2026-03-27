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
    // z-[100] supaya di atas segala-galanya
    <header className="sticky top-0 z-[100] flex flex-col w-full shadow-md bg-white dark:bg-gray-900 transition-colors duration-300">
      
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
        .fade-edges {
          -webkit-mask-image: linear-gradient(to right, transparent, black 3%, black 97%, transparent);
          mask-image: linear-gradient(to right, transparent, black 3%, black 97%, transparent);
        }
      `}} />

      {/* --- 1. MAIN NAVBAR (Bagian Atas) --- */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 relative z-[110] bg-white dark:bg-gray-900 transition-colors">
        
        {/* Logo */}
        <a href="/login" className="flex items-center gap-2 cursor-pointer group">
          <div className="w-10 h-10 bg-emerald-800 dark:bg-emerald-700 rounded-lg flex items-center justify-center text-white font-bold group-hover:bg-emerald-700 transition-colors">
            Az
          </div>
          <div>
            <h1 className="text-emerald-900 dark:text-emerald-50 font-bold leading-none tracking-tight">Cendekia</h1>
            <p className="text-[10px] text-yellow-600 dark:text-yellow-500 font-semibold uppercase">Pondok Pesantren</p>
          </div>
        </a>

        {/* Menu Links Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-emerald-900 dark:text-gray-200">
          <a href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">Beranda</a>
          
          <div 
            className="relative group cursor-pointer"
            onMouseEnter={() => setIsProfileOpen(true)}
            onMouseLeave={() => setIsProfileOpen(false)}
          >
            <div className="flex items-center gap-1 hover:text-emerald-700 dark:hover:text-emerald-400 py-2">
              Profil <ChevronDown size={16} className={`transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </div>
            
            {isProfileOpen && (
              <div className="absolute top-full -left-4 w-64 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-xl rounded-xl py-3 z-50 animate-in fade-in slide-in-from-top-2">
                <a href="#" className="block px-5 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-200 text-sm font-medium">Tentang Kami</a>
                <a href="#" className="block px-5 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-200 text-sm font-medium">Fasilitas</a>
                <a href="#" className="block px-5 py-2.5 hover:bg-emerald-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-200 text-sm font-medium">Kurikulum</a>
              </div>
            )}
          </div>

          <a href="/ppdb" className="hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold underline underline-offset-4">Penerimaan Santri Baru</a>
          <a href="#" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">Berita</a>
        </div>

        {/* Action Buttons (Dark Mode & Mobile Toggle) */}
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            {!mounted ? <Moon size={18} className="opacity-40" /> : theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button 
            className="md:hidden p-2 text-emerald-900 dark:text-gray-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* --- MENU DROPDOWN KHUSUS HP (MELAYANG/OVERLAY) --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full h-[calc(100vh-80px)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg z-[150] flex flex-col px-6 py-8 animate-in slide-in-from-top-5 duration-300 border-t border-gray-100 dark:border-gray-800 shadow-2xl">
          <a href="/" onClick={() => setIsMobileMenuOpen(false)} className="py-4 text-xl text-emerald-900 dark:text-gray-200 font-bold border-b border-gray-100 dark:border-gray-800">Beranda</a>
          
          <div className="py-6 border-b border-gray-100 dark:border-gray-800">
            <span className="text-xs font-bold text-yellow-600 uppercase tracking-widest">Informasi Utama</span>
            <div className="flex flex-col gap-4 mt-4">
              <a href="#" className="text-lg text-emerald-900 dark:text-gray-200 font-medium">Profil Ponpes</a>
              <a href="#" className="text-lg text-emerald-900 dark:text-gray-200 font-medium">Fasilitas</a>
              <a href="#" className="text-lg text-emerald-900 dark:text-gray-200 font-medium">Kurikulum & Program</a>
            </div>
          </div>
          
          <a href="/ppdb" onClick={() => setIsMobileMenuOpen(false)} className="py-5 text-xl text-emerald-800 dark:text-emerald-400 font-extrabold">Penerimaan Santri Baru</a>
          <button className="mt-auto mb-10 w-full bg-emerald-800 text-white py-4 rounded-xl font-bold shadow-lg">Hubungi Kami</button>
        </div>
      )}

      {/* --- GARIS EMAS & RUNNING TEXT (Tetap di bawah Nav) --- */}
      <div className="h-[2px] w-full bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 shadow-[0_0_8px_rgba(250,204,21,0.5)] z-20"></div>

      <div className="bg-emerald-950 dark:bg-gray-900 text-yellow-400 py-3 overflow-hidden flex items-center w-full shadow-inner transition-colors duration-300 relative">
        <div className="w-full fade-edges relative overflow-hidden">
          <div className="animate-marquee text-[13px] font-bold tracking-[0.2em] cursor-default">
            <span className="mx-8 whitespace-nowrap">✨ SELAMAT DATANG DI WEBSITE RESMI PONDOK PESANTREN CENDEKIA ✨</span>
            <span className="mx-8 text-white dark:text-gray-500">•</span>
            <span className="mx-8 text-emerald-100 dark:text-gray-300 whitespace-nowrap">Membangun Generasi Qur'ani, Beradab, dan Berwawasan Global</span>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Navbar;