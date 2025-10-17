import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HomeSlider from '../components/HomeSlider'
import ProduceCard from '../components/ProduceCard'
import Gallery from '../components/Gallery'

// Featured produce images
import lemonImg from '../assets/lemon.jpg'
import basilImg from '../assets/basil.jpg'
import mangoImg from '../assets/mango.jpg'
import herbFieldImg from '../assets/herb-field.jpg'

export default function Home() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    setFeatured([
      { id: 1, name: 'Lemon', description: 'Fresh citrus from Kenyan highlands', origin: 'Kiambu', image: lemonImg },
      { id: 2, name: 'Basil', description: 'Aromatic culinary herb', origin: 'Nakuru', image: basilImg },
      { id: 3, name: 'Mango', description: 'Sweet seasonal mango', origin: 'Coast', image: mangoImg }
    ])
  }, [])

  return (
    <div>
      {/* Slider with Hero overlay */}
      <HomeSlider>
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Welcome to Our Farm</h1>
          <p className="text-lg md:text-xl mb-6 drop-shadow-md">
            Fresh, organic produce straight from our fields
          </p>
          <Link to="/produce">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition">
              Our Produce
            </button>
          </Link>
        </div>
      </HomeSlider>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Produce</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(f => <ProduceCard key={f.id} item={f} />)}
        </div>
      </section>

      <section className="bg-green-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Our Farm Gallery</h2>
          <Gallery images={[lemonImg, basilImg, mangoImg, herbFieldImg]} />
        </div>
      </section>
    </div>
  )
}
