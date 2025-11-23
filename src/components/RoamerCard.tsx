interface RoamerCardProps {
  badge: string;
  name: string;
  description: string;
  nextStep: string;
  image: string;
}

export default function RoamerCard({ badge, name, description, nextStep, image }: RoamerCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative h-80">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-gray-400 text-white px-4 py-2 rounded-full text-sm font-medium">
          {badge}
        </div>
        <div className="absolute bottom-4 left-4 right-4 bg-gray-800/90 text-white p-4 rounded-lg">
          <p className="text-xs text-gray-300 mb-1">{nextStep}</p>
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-semibold mb-4">
          {name.split('–')[0].trim()}
          {name.includes('–') && (
            <span className="text-gray-400"> – {name.split('–')[1].trim()}</span>
          )}
        </h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
