export default function SocialProof() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-16">
          Trusted by Roamers around the world
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-[#8b9a94] rounded-3xl p-12 flex items-center justify-center min-h-[280px]">
            <h3 className="text-3xl font-light text-black leading-tight">
              7 global paths<br />unfolding to<br />Starter Stays
            </h3>
          </div>

          <div className="bg-[#d5e5d8] rounded-3xl p-12 flex items-center justify-center min-h-[280px]">
            <img src="/finalwebsiteimages/roammoraiconblack.png" alt="Roammora" className="w-40 h-40 object-contain" />
          </div>

          <div className="bg-[#ede9e6] rounded-3xl p-12 flex items-center justify-center min-h-[280px]">
            <p className="text-xl font-light text-black italic leading-relaxed">
              "I always thought moving abroad was for other people. Now it feels like it could be for me too."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#ded9d3] rounded-3xl p-12 flex items-center justify-center min-h-[280px]">
            <p className="text-xl font-light text-black italic leading-relaxed">
              "I didn't expect to feel understood... but this feels like someone finally gets what I'm trying to do."
            </p>
          </div>

          <div className="bg-[#a8c4b5] rounded-3xl p-12 flex flex-col items-center justify-center text-center min-h-[280px]">
            <div className="text-7xl font-light mb-6 text-black">92%</div>
            <p className="text-xl text-black leading-relaxed">
              of early Roamers<br />say they finally feel<br />like it's possible
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
