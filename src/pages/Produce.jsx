import React, { useEffect, useState } from 'react'
import ProduceCard from '../components/ProduceCard'

// Import images from src/assets
import lemonImg from '../assets/lemon.jpg'
import basilImg from '../assets/basil.jpg'
import mangoImg from '../assets/mango.jpg'
import rosemaryImg from '../assets/rosemary.jpg'

export default function Produce() {
  const [list, setList] = useState([])

  useEffect(() => {
    setList([
      { id: 1, name: 'Lemon', description: 'Citrus', origin: 'Kiambu', image: lemonImg },
      { id: 2, name: 'Basil', description: 'Aromatic herb', origin: 'Nakuru', image: basilImg },
      { id: 3, name: 'Mango', description: 'Sweet fruit', origin: 'Coast', image: mangoImg },
      { id: 4, name: 'Rosemary', description: 'Fragrant herb', origin: 'Kericho', image: rosemaryImg }
    ])
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Produce</h1>
      <p className="text-gray-600 mb-6">Browse our produce curated for freshness and quality.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map(item => <ProduceCard key={item.id} item={item} />)}
      </div>
    </section>
  )
}
