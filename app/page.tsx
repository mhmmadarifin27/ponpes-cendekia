import Navbar from '../components/Navbar'; 
import Hero from '../components/Hero';
import AboutTeaser from '../components/AboutTeaser';
import Features from '../components/Features';
import Facilities from '../components/Facilities';
import CTA from '@/components/CTA';
import News from '../components/News';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <AboutTeaser />
      <Features />
      <Facilities />
      <CTA />
      <News />
      <Footer />
      
      {/* Nanti isi bagian Hero, Sambutan, Fasilitas di bawah sini */}
      

    </main>
  );
}