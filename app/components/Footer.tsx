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
    <footer className="relative mt-80">
      {/* 1. SECTION MAPS (MELAYANG) */}
      <div className="absolute left-0 right-0 -top-48 z-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[450px]">
          
          {/* Info Alamat */}
          <div className="w-full md:w-5/12 p-10 md:p-14 flex flex-col justify-center bg-white">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-emerald-50 rounded-2xl">
                <MapPin className="text-emerald-800 w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-900 tracking-tight">Lokasi Yayasan</h3>
            </div>
            <p className="text-gray-500 leading-relaxed mb-10 text-lg">
              Jl. Raya Pendidikan Islam No. 45, Kebayoran Baru, Jakarta Selatan, 12150
            </p>
            <a 
              href="#" 
              target="_blank" 
              className="bg-emerald-900 text-white flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-bold hover:bg-emerald-800 transition-all hover:shadow-xl active:scale-95"
            >
              Petunjuk Arah <ArrowUpRight size={20} />
            </a>
          </div>

          {/* Google Maps */}
          <div className="w-full md:w-7/12 bg-gray-100">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126906.18341673992!2d106.71183186249999!3d-6.2875712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1ec2342337d%3A0x6b8159c191a92357!2sAl-Azhar%20Islamic%20School%20Kebayoran%20Baru!5e0!3m2!1sen!2sid!4v1710432000000!5m2!1sen!2sid"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* 2. BODY FOOTER (DENGAN BACKGROUND) */}

<div className="relative pt-80 pb-12 bg-emerald-950 text-white overflow-hidden">


{/* Background Gambar Ilustrasi */}

<div className="absolute inset-0 z-0">

<img

src="bgfooter2.png"

alt="Background Ponpes"

className="w-full h-full object-cover opacity-100"

/>

{/* Gradient agar teks terbaca */}

<div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-transparent" />

</div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
            
            {/* Kolom 1: Identitas & SOSMED (SVG MANUAL) */}
            <div className="md:col-span-5 relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-900 font-bold text-2xl shadow-xl">Az</div>
                <div>
                   <h2 className="text-2xl font-bold leading-none">Ponpes Al-Azhar</h2>
                   <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-[0.2em] mt-1">Center of Excellence</p>
                </div>
              </div>
              <p className="text-emerald-100/60 leading-relaxed text-sm max-w-sm mb-10">
                Lembaga pendidikan Islam yang berdedikasi melahirkan generasi pemimpin masa depan yang bertaqwa.
              </p>
              
              {/* SOSMED DENGAN SVG (ANTI-EROR) */}
              <div className="flex gap-4 relative z-[999]"> 
                {/* Instagram */}
                <a 
                  href="https://instagram.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center bg-white/5 hover:bg-white hover:text-emerald-900 transition-all duration-300 group cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>

                {/* Youtube */}
                <a 
                  href="https://youtube.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center bg-white/5 hover:bg-white hover:text-emerald-900 transition-all duration-300 group cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 10 10 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 10 10 0 0 1-15 0 2 2 0 0 1-2-2z"/><path d="m10 15 5-3-5-3z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Kolom 2: Tautan */}
            <div className="md:col-span-3">
              <h4 className="text-yellow-500 font-bold mb-8 uppercase text-xs tracking-widest border-b border-white/10 pb-2 inline-block">Tautan Cepat</h4>
              <ul className="space-y-4 text-emerald-100/70 text-sm">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span>›</span> Profil Kampus</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span>›</span> Pendaftaran Santri</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span>›</span> Fasilitas & Lab</a></li>
              </ul>
            </div>

            {/* Kolom 3: Kontak */}
            <div className="md:col-span-4">
              <h4 className="text-yellow-500 font-bold mb-8 uppercase text-xs tracking-widest border-b border-white/10 pb-2 inline-block">Hubungi Kami</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 bg-white/5 rounded-2xl border border-white/5">
                  <Phone size={20} className="text-yellow-500"/>
                  <div>
                    <p className="text-[10px] text-emerald-100/40 uppercase font-bold mb-1">Telepon</p>
                    <p className="text-sm font-semibold text-emerald-50">+62 (21) 1234 5678</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-white/5 rounded-2xl border border-white/5">
                  <Mail size={20} className="text-yellow-500"/>
                  <div>
                    <p className="text-[10px] text-emerald-100/40 uppercase font-bold mb-1">Email</p>
                    <p className="text-sm font-semibold text-emerald-50">info@alazhar.sch.id</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-white/10 text-center text-[11px] text-emerald-100/30">
            © 2026 Pondok Pesantren Al-Azhar. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;