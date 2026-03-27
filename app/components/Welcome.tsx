import React from 'react';
import { Quote } from 'lucide-react';

const Welcome = () => {
  return (
    <section className="py-20 px-12 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Sisi Kiri: Foto Pimpinan */}
        <div className="relative w-full md:w-1/3">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-500/10 rounded-full -z-10" />
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=600" 
              alt="Pimpinan Pondok" 
              className="w-full aspect-[3/4] object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-full bg-emerald-900 p-6 rounded-xl shadow-lg">
            <p className="text-yellow-500 font-bold text-lg">KH. Ahmad Ridwan, Lc.</p>
            <p className="text-white/70 text-xs uppercase tracking-widest">Pimpinan Pondok Pesantren</p>
          </div>
        </div>

        {/* Sisi Kanan: Teks Sambutan */}
        <div className="w-full md:w-2/3">
          <Quote className="text-emerald-800/20 w-20 h-20 mb-[-40px]" />
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-emerald-900 mb-6">
              Membangun Peradaban Melalui <br />
              <span className="text-emerald-700">Pendidikan Berbasis Adab</span>
            </h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Assalamu'alaikum Warahmatullahi Wabarakatuh.
              </p>
              <p>
                Segala puji bagi Allah SWT yang telah memberikan kita kekuatan untuk terus berjuang di jalan dakwah dan pendidikan. Pondok Pesantren Al-Azhar hadir bukan sekadar sebagai tempat belajar, melainkan sebagai kawah candradimuka bagi para pejuang Al-Qur'an.
              </p>
              <p>
                Kami percaya bahwa kepintaran tanpa adab hanya akan melahirkan kesombongan. Oleh karena itu, kurikulum kami menitikberatkan pada pembentukan karakter (akhlaqul karimah) yang disandingkan dengan kemapanan ilmu syar'i dan wawasan modern.
              </p>
            </div>
            
            <button className="mt-8 text-emerald-800 font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Baca Selengkapnya <span className="text-xl">→</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Welcome;