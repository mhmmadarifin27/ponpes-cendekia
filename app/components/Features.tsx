import React from 'react';
import { BookOpen, Users, ShieldCheck, Star } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Tahfidz Al-Qur'an",
      desc: "Program menghafal Al-Qur'an dengan metode mutqin dan sanad yang terjaga.",
      icon: <BookOpen className="w-8 h-8 text-yellow-500" />,
    },
    {
      title: "Kitab Kuning",
      desc: "Pendalaman literatur Islam klasik melalui kajian kitab-kitab muktabarah.",
      icon: <Star className="w-8 h-8 text-yellow-500" />,
    },
    {
      title: "Karakter Adab",
      desc: "Menitikberatkan pembentukan akhlakul karimah sebagai fondasi utama santri.",
      icon: <ShieldCheck className="w-8 h-8 text-yellow-500" />,
    },
    {
      title: "Fasilitas Modern",
      desc: "Lingkungan belajar yang asri, nyaman, dan didukung teknologi informasi.",
      icon: <Users className="w-8 h-8 text-yellow-500" />,
    },
  ];

  return (
    <section className="py-20 px-12 bg-emerald-50">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-emerald-900 text-3xl font-bold mb-4">Pilar Pendidikan Kami</h2>
        <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {features.map((item, index) => (
          <div 
            key={index} 
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 border border-emerald-100 group"
          >
            <div className="mb-6 bg-emerald-50 w-16 h-16 rounded-xl flex items-center justify-center group-hover:bg-yellow-500 transition-colors">
              <div className="group-hover:text-white transition-colors">
                {item.icon}
              </div>
            </div>
            <h3 className="text-xl font-bold text-emerald-900 mb-3">{item.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;