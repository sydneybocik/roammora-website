import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const heroImages = [
  'https://images.pexels.com/photos/6249520/pexels-photo-6249520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-3 gap-0">
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className="relative w-full h-screen overflow-hidden"
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover transition-opacity duration-1000"
              style={{
                opacity: currentImageIndex === idx ? 1 : 0.7,
              }}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight">
          Live where life<br />pulls you.
        </h1>
        <p className="text-xl md:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed">
          We're building a world where moving your life abroad feels human, possible, and deeply yours.
        </p>
        <button className="bg-white text-black px-8 py-4 rounded-full hover:bg-gray-100 transition-all text-lg font-medium inline-flex items-center gap-2 group">
          Join the early Roamer waitlist
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
