import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/finalwebsiteimages/herotwopeopleatairport.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium mb-6 leading-tight">
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
