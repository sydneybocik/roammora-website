import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function FounderLetter() {
  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16 pt-32">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-16 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to homepage
        </button>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal mb-4 leading-tight">
          A letter from Sydney Bocik, Chief Executive Officer
        </h1>

        <img
          src="/founderheadshotletterpage.jpeg"
          alt="Sydney Bocik"
          className="w-full max-w-3xl h-auto object-cover my-16"
        />

        <p className="text-gray-500 text-lg mb-16">April 2024</p>

        <div className="prose prose-lg max-w-3xl">
          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            I've always believed the place you're born should not be the place your life ends. People feel pulled to different corners of the world for a reason. But for most of us, there has never been a clear way to follow that feeling.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Roammora exists because I refused to believe that longing and possibility should stay strangers.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            When I was nineteen, I studied abroad in France. It was the first time I recognized myself — not the version I had been, but the person I could become. Walking through unfamiliar streets, learning a new rhythm, feeling the world open — it wasn't just magical. It was clarifying.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            But here's the truth: it was only possible because the university did everything for me. They found the housing. Handled the forms. Held the logistics. All I had to do was show up and live.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Leaving felt like leaving a future I wasn't done with.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            After school, the world quietly closed again. Life got louder. Responsibilities grew. And the dream that felt so close at nineteen drifted out of reach. Not because I doubted the dream — but because the system didn't support it.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Trying to move abroad as an adult felt like trying to redesign my whole life from scratch, alone. Most people would call that unrealistic. I call it a design problem.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            It wasn't that I didn't know what I wanted. It's that no one had ever built the path. And that's when I realized: no one was coming to fix this. So I had to.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Roammora is my answer to every person who has ever felt pulled somewhere else but had no way to begin. It's the first step toward a world where moving your life abroad feels human, supported, and possible — not overwhelming.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            For the people who long for a different horizon. For the ones imagining a new chapter. For the ones waiting for a sign that it's finally time.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            Here it is.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
