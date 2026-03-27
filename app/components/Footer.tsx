"use client";
import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUpRight 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative mt-64 md:mt-80 transition-colors duration-500">
      
      {/* --- 1. SECTION MAPS (MELAYANG) --- */}
      <div className="absolute left-0 right-0 -top-40 md:-top-48 z-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-[30px] md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[400px] md:min-h-[450px] border border-gray-100 dark:border-gray-800 transition-colors duration-500">
          
          {/* Info Alamat */}
          <div className="w-full md:w-5/12 p-8 md:p-14 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="p-3 md:p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl">
                <MapPin className="text-emerald-800 dark:text-yellow-500 w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-emerald-900 dark:text-white tracking-tight">Lokasi Yayasan</h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8 md:mb-10 text-base md:text-lg">
              Jl. Lintas Timur, Indralaya, Ogan Ilir, Sumatera Selatan, 30862
            </p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              className="bg-emerald-900 dark:bg-yellow-500 text-white dark:text-emerald-950 flex items-center justify-center gap-3 w-full py-4 md:py-5 rounded-2xl font-bold hover:opacity-90 transition-all hover:shadow-xl active:scale-95"
            >
              Petunjuk Arah <ArrowUpRight size={20} />
            </a>
          </div>

          {/* Google Maps (Iframe) */}
          <div className="w-full md:w-7/12 bg-gray-100 dark:bg-gray-800 h-[250px] md:h-auto">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.44464!2d104.62312!3d-3.21312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMTInNDcuMiJTIDEwNMKwMzcnMjMuMiJF!5e0!3m2!1sid!2sid!4v1711550000000!5m2!1sid!2sid"
              className="w-full h-full border-0 grayscale dark:invert dark:opacity-80 transition-all"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* --- 2. BODY FOOTER --- */}
      <div className="relative pt-72 md:pt-80 pb-12 bg-emerald-950 dark:bg-black text-white overflow-hidden transition-colors duration-500">
        
        {/* Background Gambar Ilustrasi */}
        <div className="absolute inset-0 z-0">
          <img
            src="bgfooter2.png" // Pastikan file ini ada di folder public/
            alt="Background Ponpes"
            className="w-full h-full object-cover opacity-80 dark:opacity-80"
          />
          {/* Gradient agar teks tetap terbaca tajam */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 dark:from-black dark:via-black/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-20">
            
            {/* Kolom 1: Identitas & SOSMED */}
            <div className="md:col-span-5 relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-900 font-bold text-2xl shadow-xl">
                  Az
                </div>
                <div>
                   <h2 className="text-2xl font-bold leading-none">Ponpes Cendekia</h2>
                   <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-[0.2em] mt-1">Membangun Generasi Qur'ani</p>
                </div>
              </div>
              <p className="text-emerald-100/60 dark:text-gray-400 leading-relaxed text-sm max-w-sm mb-10">
                Lembaga pendidikan Islam yang berdedikasi melahirkan generasi pemimpin masa depan yang bertaqwa, beradab, dan berwawasan global.
              </p>
              
              {/* SOSMED (SVG Manual - Anti-Error) */}
              <div className="flex gap-4"> 
                <a 
                  href="#" 
                  className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center bg-white/5 hover:bg-yellow-500 hover:text-emerald-900 transition-all duration-300 group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center bg-white/5 hover:bg-yellow-500 hover:text-emerald-900 transition-all duration-300 group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                </a>
              </div>
            </div>

            {/* Kolom 2: Tautan */}
            <div className="md:col-span-3">
              <h4 className="text-yellow-500 font-bold mb-8 uppercase text-xs tracking-widest border-b border-white/10 pb-2 inline-block">Tautan Cepat</h4>
              <ul className="space-y-4 text-emerald-100/70 dark:text-gray-400 text-sm font-medium">
                <li><a href="#" className="hover:text-yellow-500 transition-colors flex items-center gap-2"><span>›</span> Tentang Pondok</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors flex items-center gap-2"><span>›</span> Pendaftaran Santri</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors flex items-center gap-2"><span>›</span> Fasilitas & Lab</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors flex items-center gap-2"><span>›</span> Kurikulum</a></li>
              </ul>
            </div>

            {/* Kolom 3: Kontak */}
            <div className="md:col-span-4">
              <h4 className="text-yellow-500 font-bold mb-8 uppercase text-xs tracking-widest border-b border-white/10 pb-2 inline-block">Hubungi Kami</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-colors">
                  <Phone size={20} className="text-yellow-500 shrink-0"/>
                  <div>
                    <p className="text-[10px] text-emerald-100/40 uppercase font-bold mb-0.5">Telepon</p>
                    <p className="text-sm font-semibold text-emerald-50">+62 812 3456 7890</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-colors">
                  <Mail size={20} className="text-yellow-500 shrink-0"/>
                  <div>
                    <p className="text-[10px] text-emerald-100/40 uppercase font-bold mb-0.5">Email</p>
                    <p className="text-sm font-semibold text-emerald-50">info@cendekia.ac.id</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-white/10 text-center text-[10px] md:text-[11px] text-emerald-100/30 tracking-[0.3em] uppercase">
            © {new Date().getFullYear()} Pondok Pesantren Cendekia. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;