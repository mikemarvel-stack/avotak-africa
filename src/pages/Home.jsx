import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import ProduceCard from '../components/ProduceCard'
import Gallery from '../components/Gallery'

export default function Home(){
  const [featured, setFeatured] = useState([])
  useEffect(()=> {
    setFeatured([
      {id:1, name:'Lemon', description:'Fresh citrus from Kenyan highlands', origin:'Kiambu', image:'/assets/lemon.jpg'},
      {id:2, name:'Basil', description:'Aromatic culinary herb', origin:'Nakuru', image:'/assets/basil.jpg'},
      {id:3, name:'Mango', description:'Sweet seasonal mango', origin:'Coast', image:'/assets/mango.jpg'}
    ])
  },[])
  return (
    <div>
      <Hero />
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Produce</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(f => <ProduceCard key={f.id} item={f} />)}
        </div>
      </section>

      <section className="bg-green-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Our Farm Gallery</h2>
          <Gallery images={['/assets/lemon.jpg','/assets/basil.jpg','/assets/mango.jpg','/assets/herb-field.jpg']} />
        </div>
      </section>
    </div>
  )
}
