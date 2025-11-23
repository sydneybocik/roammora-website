export default function SocialProof() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-normal text-black text-center mb-12">
          Trusted by Roamers around the world
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div className="bg-[#9CA5A0] rounded-xl p-10 flex items-start justify-start min-h-[300px]">
            <h3 className="text-2xl font-normal text-black leading-snug">
              7 global paths<br />unfolding to<br />Starter Stays
            </h3>
          </div>

          <div className="bg-[#D8E5DC] rounded-xl p-10 flex items-center justify-center min-h-[300px]">
            <img src="/finalwebsiteimages/roammoraiconblack.png" alt="Roammora" className="w-32 h-32 object-contain" />
          </div>

          <div className="bg-[#F5F2EF] rounded-xl p-10 flex items-start justify-start min-h-[300px]">
            <p className="text-xl font-normal text-black italic leading-relaxed">
              "I always thought moving abroad was for other people. Now it feels like it could be for me too."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-[#E8E4DF] rounded-xl p-10 flex items-start justify-start min-h-[300px]">
            <p className="text-xl font-normal text-black italic leading-relaxed">
              "I didn't expect to feel understood... but this feels like someone finally gets what I'm trying to do."
            </p>
          </div>

          <div className="bg-[#B5CFC1] rounded-xl p-10 flex flex-col items-center justify-center text-center min-h-[300px]">
            <div className="text-7xl font-normal mb-4 text-black">92%</div>
            <p className="text-lg text-black font-normal leading-relaxed">
              of early Roamers say<br />they finally feel like it's<br />possible
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
