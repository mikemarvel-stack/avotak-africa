import React from 'react';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Herb Nursery',
      category: 'Agriculture',
      summary: 'Set up of herb propagation nursery to support local farmers.',
      impact: 'Seed stock for 120 farmers.',
      date: 'Jan 2024 - Mar 2024',
      image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68',
    },
    {
      id: 2,
      title: 'Export Mango Pilot',
      category: 'Export Facilitation',
      summary: 'Implemented quality improvement measures for mango exports.',
      impact: '20% increase in buyer acceptance.',
      date: 'Apr 2024 - Jun 2024',
      image: 'https://images.unsplash.com/photo-1603052875342-2f8d8b2d0e3b',
    },
    {
      id: 3,
      title: 'Export Process Facilitation',
      category: 'Trade & Logistics',
      summary: 'Streamlined export procedures and documentation for small-scale farmers.',
      impact: 'Reduced export lead time by 30%.',
      date: 'Jul 2024 - Sep 2024',
      image: 'https://images.unsplash.com/photo-1588702547922-4e8e1b2d9b3b',
    },
    {
      id: 4,
      title: 'Basil Cultivation Program',
      category: 'Agriculture',
      summary: 'Trained farmers on best practices for basil cultivation.',
      impact: '150 farmers trained; yield improved by 25%.',
      date: 'Oct 2024 - Dec 2024',
      image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68',
    },
    {
      id: 5,
      title: 'Fresh Produce Market Linkages',
      category: 'Market Access',
      summary: 'Connected local farmers to regional supermarkets and buyers.',
      impact: 'Increased farmer revenue by 40%.',
      date: 'Jan 2025 - Present',
      image: 'https://images.unsplash.com/photo-1561948955-4f3e4d3e5b2d',
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <div key={p.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <img src={p.image} alt={p.title} className="w-full h-48 object-cover rounded-t-xl mb-4" />
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <span className="text-sm text-gray-500">{p.date}</span>
            </div>
            <p className="text-gray-700 mb-2">{p.summary}</p>
            <div className="text-sm text-gray-600">Category: {p.category}</div>
            <div className="mt-2 text-sm font-medium text-green-600">Impact: {p.impact}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
