"use client";
import React, { useState } from 'react';
import { Lock, Loader2, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 6) {
      alert("Password baru minimal harus 6 karakter!");
      return;
    }

    setLoading(true);

    // Fungsi sakti Supabase untuk mengubah password user yang sedang aktif dari link email
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      alert("Gagal memperbarui password: " + error.message);
      setLoading(false);
    } else {
      alert("Berhasil! Password Anda telah diperbarui.");
      // Arahkan kembali ke halaman login
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-[2rem] shadow-xl p-8 border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-500">
        
        {/* Ikon & Judul */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Buat Password Baru</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Silakan masukkan password baru untuk akun Admin Anda.
          </p>
        </div>

        {/* Form Ubah Password */}
        <form onSubmit={handleUpdatePassword} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Password Baru</label>
            <div className="relative group">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter" 
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-3.5 px-10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm"
                required
              />
              <Lock className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : 'SIMPAN PASSWORD BARU'}
          </button>
        </form>

      </div>
    </div>
  );
}