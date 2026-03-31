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
    <footer className="relative bg-gray-50 dark:bg-gray-900 pt-32 transition-colors duration-500">
      
      {/* --- 1. SECTION MAPS (MENUMPUK NATURAL) --- */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 -mb-40 md:-mb-48">
        <div className="bg-white dark:bg-gray-800 rounded-[30px] md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[400px] md:min-h-[450px] border border-gray-100 dark:border-gray-700 transition-colors duration-500">
          
          {/* Info Alamat */}
          <div className="w-full md:w-5/12 p-8 md:p-14 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="p-3 md:p-4 bg-emerald-50 dark:bg-gray-700 rounded-2xl border border-emerald-100 dark:border-gray-600">
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
              className="bg-emerald-900 dark:bg-yellow-500 text-white dark:text-emerald-950 flex items-center justify-center gap-3 w-full py-4 md:py-5 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              Petunjuk Arah <ArrowUpRight size={20} />
            </a>
          </div>

          {/* Google Maps (Iframe) */}
          <div className="w-full md:w-7/12 bg-gray-100 dark:bg-gray-900 h-[250px] md:h-auto border-l border-gray-100 dark:border-gray-700">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.44464!2d104.62312!3d-3.21312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMTInNDcuMiJTIDEwNMKwMzcnMjMuMiJF!5e0!3m2!1sid!2sid!4v1711550000000!5m2!1sid!2sid"
              className="w-full h-full border-0 grayscale dark:invert dark:opacity-70 transition-all"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* --- 2. BODY FOOTER --- */}
      <div className="relative pt-56 md:pt-64 pb-12 bg-emerald-950 dark:bg-gray-950 text-white overflow-hidden transition-colors duration-500">
        
        {/* PERBAIKAN: Background Gambar Ilustrasi */}
        {/* Tinggi gambar di HP dibatasi maksimal 300px agar tidak nge-zoom, menempel di bawah */}
        <div className="absolute bottom-0 left-0 right-0 h-[300px] md:h-full z-0 pointer-events-none">
          <img
            src="/bgfooter3.png" 
            alt="Background Ponpes"
            className="w-full h-full object-cover object-bottom opacity-60 dark:opacity-60"
          />
          {/* Gradient untuk menghilangkan garis potongan atas gambar di HP */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-emerald-950/50 to-emerald-950 dark:via-gray-950/50 dark:to-gray-950" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-12 md:mb-16">
            
            {/* Kolom 1: Identitas & SOSMED */}
            <div className="md:col-span-5 relative">
              <div className="flex items-center gap-4 mb-5 md:mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center text-emerald-900 dark:text-white font-bold text-xl md:text-2xl shadow-xl">
                  Az
                </div>
                <div>
                   <h2 className="text-xl md:text-2xl font-bold leading-none text-white">Ponpes Cendekia</h2>
                   <p className="text-[9px] md:text-[10px] text-yellow-500 font-bold uppercase tracking-[0.2em] mt-1">Membangun Generasi Qur'ani</p>
                </div>
              </div>
              <p className="text-emerald-100/70 dark:text-gray-400 leading-relaxed text-sm max-w-sm mb-8 md:mb-10">
                Lembaga pendidikan Islam yang berdedikasi melahirkan generasi pemimpin masa depan yang bertaqwa, beradab, dan berwawasan global.
              </p>
              
              {/* SOSMED (As-is) */}
              <div className="flex gap-3 md:gap-4"> 
                <a href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-white/20 dark:border-gray-700 flex items-center justify-center bg-white/5 dark:bg-gray-800 hover:bg-yellow-500 hover:text-emerald-950 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-white/20 dark:border-gray-700 flex items-center justify-center bg-white/5 dark:bg-gray-800 hover:bg-yellow-500 hover:text-emerald-950 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                </a>
              </div>
            </div>

            {/* Kolom 2: Tautan */}
            <div className="md:col-span-3 mt-4 md:mt-0">
              <h4 className="text-yellow-500 font-bold mb-4 md:mb-6 uppercase text-xs tracking-widest border-b border-white/10 dark:border-gray-800 pb-3 inline-block">Tautan Cepat</h4>
              <ul className="space-y-3 md:space-y-4 text-emerald-100/80 dark:text-gray-400 text-sm font-medium">
                <li><a href="tentang" className="hover:text-yellow-400 transition-colors flex items-center gap-2"><span>›</span> Tentang kami</a></li>
                <li><a href="penerimaan" className="hover:text-yellow-400 transition-colors flex items-center gap-2"><span>›</span> Penerimaan Santri baru</a></li>
                <li><a href="fasilitas" className="hover:text-yellow-400 transition-colors flex items-center gap-2"><span>›</span> Fasilitas & Lab</a></li>
                <li><a href="Kurikulum" className="hover:text-yellow-400 transition-colors flex items-center gap-2"><span>›</span> Kurikulum</a></li>
              </ul>
            </div>

            {/* Kolom 3: Kontak */}
            <div className="md:col-span-4 mt-4 md:mt-0">
              <h4 className="text-yellow-500 font-bold mb-4 md:mb-6 uppercase text-xs tracking-widest border-b border-white/10 dark:border-gray-800 pb-3 inline-block">Hubungi Kami</h4>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white/5 dark:bg-gray-800/50 rounded-2xl border border-white/10 dark:border-gray-700 hover:border-yellow-500/50 transition-colors">
                  <Phone size={18} className="text-yellow-500 shrink-0 mt-0.5 md:w-5 md:h-5"/>
                  <div>
                    <p className="text-[9px] md:text-[10px] text-emerald-200/50 dark:text-gray-500 uppercase font-bold mb-0.5 md:mb-1">Telepon</p>
                    <p className="text-xs md:text-sm font-semibold text-white">+6285267962898</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white/5 dark:bg-gray-800/50 rounded-2xl border border-white/10 dark:border-gray-700 hover:border-yellow-500/50 transition-colors">
                  <Mail size={18} className="text-yellow-500 shrink-0 mt-0.5 md:w-5 md:h-5"/>
                  <div>
                    <p className="text-[9px] md:text-[10px] text-emerald-200/50 dark:text-gray-500 uppercase font-bold mb-0.5 md:mb-1">Email</p>
                    <p className="text-xs md:text-sm font-semibold text-white">info@cendekia.ac.id</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-6 md:pt-8 border-t border-white/10 dark:border-gray-800 text-center text-[9px] md:text-xs text-emerald-100/50 dark:text-gray-500 tracking-widest uppercase font-medium">
            © {new Date().getFullYear()} Pondok Pesantren Cendekia. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;