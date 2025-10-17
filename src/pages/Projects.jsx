import React from 'react'

export default function Projects(){
  const projects = [
    {id:1, title:'Herb Nursery', summary:'Set up of herb propagation nursery', impact:'Seed stock for 120 farmers'},
    {id:2, title:'Export Mango Pilot', summary:'Quality improvement for export', impact:'20% increase in buyer acceptance'}
  ]
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="space-y-6">
        {projects.map(p => (
          <div key={p.id} className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold">{p.title}</h3>
            <p className="text-gray-600">{p.summary}</p>
            <div className="mt-2 text-sm text-gray-700">Impact: {p.impact}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
