import { CardFeature } from "./card-feature"

export function Feature() {
  const features = [
    {
      title: "Donate to your favorite Creator.",
      description: "Donate your favorite creator with Cryptocurrency."
    },
    {
      title: "Be a Creator",
      description:
        "Share your passion, inspire your audience, and receive transparent donations powered by blockchain technology."
    },
    {
      title: "Track Donations with Full Transparency.",
      description:
        "Track where donations come from and ensure ethical contributions, like online gambling, are clearly visible on our platform."
    },
    {
      title: "Low Fees & Fast Transaction to the Blockchain",
      description: "Enjoy lightning-fast transactions with low fees."
    }
  ]

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-black">Explore Our Feature</h2>
        <p className="text-lg text-gray-600 mt-4">
          Discover the powerful features of Donatrue that make our platform
          stand out
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <CardFeature
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  )
}
