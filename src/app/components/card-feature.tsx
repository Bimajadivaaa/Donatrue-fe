interface CardFeatureProps {
  title: string
  description: string
}

export function CardFeature({ title, description }: CardFeatureProps) {
  return (
    <div className="flex flex-col justify-between p-6 bg-gradient-to-br from-white to-purple-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-2xl font-semibold text-black">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  )
}
