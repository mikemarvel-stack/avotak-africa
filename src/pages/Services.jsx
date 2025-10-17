import React from 'react'

export default function Services(){
  const services = [
    {id:1, title:'Farm Advisory', desc:'Soil testing, crop planning and yield optimization'},
    {id:2, title:'Post-harvest Handling', desc:'Sorting, packing and cold chain guidance'},
    {id:3, title:'Market Linkages', desc:'Connecting growers to buyers and export channels'},
    {id:4, title:'Training & Workshops', desc:'Practical training for farmers and agribusiness teams'}
  ]
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map(s => (
          <article key={s.id} className="bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold text-xl mb-2">{s.title}</h3>
            <p className="text-gray-600">{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
