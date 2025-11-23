export default function SocialProof() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-16">
          Trusted by Roamers around the world
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-gray-400 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl font-light mb-4 text-gray-800">
              7 global paths<br />unfolding to<br />Starter Stays
            </h3>
          </div>

          <div className="bg-[#d5e5d8] rounded-2xl p-8 flex items-center justify-center">
            <img src="/20.png" alt="Roammora" className="w-24 h-24 object-contain" />
          </div>

          <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center">
            <p className="text-lg leading-relaxed text-gray-800 italic">
              "I always thought moving abroad was for other people. Now it feels like it could be for me too."
            </p>
          </div>

          <div className="bg-[#e5e5dd] rounded-2xl p-8 flex items-center justify-center">
            <p className="text-lg leading-relaxed text-gray-800 italic">
              "I didn't expect to feel understood... but this feels like someone finally gets what I'm trying to do."
            </p>
          </div>

          <div className="bg-[#a8c4b5] rounded-2xl p-8 flex flex-col items-center justify-center text-center">
            <div className="text-6xl font-light mb-4 text-gray-900">92%</div>
            <p className="text-gray-900 leading-relaxed">
              of early Roamers say they finally feel like it's possible
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
