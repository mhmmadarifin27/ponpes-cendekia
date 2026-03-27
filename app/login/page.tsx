"use client";
import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Home, ShieldCheck } from 'lucide-react';
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
      alert("Wah, gagal masuk Fin! Cek lagi email atau passwordnya ya. Error: " + error.message);
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-emerald-950 dark:bg-black relative overflow-hidden px-6 transition-colors duration-500">
      
      {/* --- 1. TOMBOL KEMBALI KE BERANDA (FITUR BARU) --- */}
      <Link 
        href="/" 
        className="absolute top-8 left-6 md:left-12 z-50 flex items-center gap-3 text-white/60 hover:text-yellow-500 transition-all group"
      >
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-emerald-950 group-hover:border-yellow-500 transition-all shadow-lg">
          <Home size={20} />
        </div>
        <span className="font-bold text-sm tracking-wide hidden sm:block">Kembali ke Beranda</span>
      </Link>

      {/* --- BACKGROUND DEKORASI (ORBS) --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-800/20 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-600/10 rounded-full blur-[120px] z-0" />

      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="bg-white/5 dark:bg-gray-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-yellow-500 rounded-[2rem] flex items-center justify-center text-emerald-950 font-black text-3xl mx-auto mb-6 shadow-xl shadow-yellow-500/20 rotate-3">
              Az
            </div>
            <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Admin Cendekia</h1>
            <p className="text-white/40 text-sm">Masuk untuk mengelola warta & fasilitas</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-yellow-500 uppercase tracking-[0.2em] ml-1">Email Sekolah</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cendekia.ac.id"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-12 text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-500 transition-all"
                  required
                />
                <Mail className="absolute left-4 top-4 text-white/20" size={20} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-yellow-500 uppercase tracking-[0.2em] ml-1">Kata Sandi</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-12 text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-500 transition-all"
                  required
                />
                <Lock className="absolute left-4 top-4 text-white/20" size={20} />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full bg-yellow-500 text-emerald-950 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg mt-8 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-400 hover:shadow-yellow-500/20'}`}
            >
              {loading ? 'Sedang Memeriksa...' : 'Masuk Sekarang'} <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-center gap-2 text-white/20">
            <ShieldCheck size={16} />
            <span className="text-[9px] uppercase font-bold tracking-[0.3em]">Protected by Supabase Auth</span>
          </div>
        </div>

        <p className="text-center mt-8 text-white/10 text-[10px] uppercase tracking-[0.5em]">
          Ponpes Cendekia © 2026
        </p>
      </div>
    </div>
  );
};

export default LoginPage;