import Navbar from './components/Navbar'; 
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import Features from './components/Features';
import Facilities from './components/Facilities';
import News from './components/News';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <Welcome />
      <Features />
      <Facilities />
      <News />
      <Footer />
      
      {/* Nanti isi bagian Hero, Sambutan, Fasilitas di bawah sini */}
      

    </main>
  );
}