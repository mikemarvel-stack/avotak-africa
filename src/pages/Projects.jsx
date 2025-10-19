import React from 'react';

// Dynamically import all images from assets folder
const images = import.meta.glob('../assets/*.jpg', { eager: true, as: 'url' });

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Herb Nursery',
      category: 'Agriculture',
      summary: 'Set up of herb propagation nursery to support local farmers.',
      impact: 'Seed stock for 120 farmers.',
      date: 'Jan 2024 - Mar 2024',
    },
    {
      id: 2,
      title: 'Export Mango Pilot',
      category: 'Export Facilitation',
      summary: 'Implemented quality improvement measures for mango exports.',
      impact: '20% increase in buyer acceptance.',
      date: 'Apr 2024 - Jun 2024',
    },
    {
      id: 3,
      title: 'Export Process Facilitation',
      category: 'Trade & Logistics',
      summary: 'Streamlined export procedures and documentation for small-scale farmers.',
      impact: 'Reduced export lead time by 30%.',
      date: 'Jul 2024 - Sep 2024',
    },
    {
      id: 4,
      title: 'Basil Cultivation Program',
      category: 'Agriculture',
      summary: 'Trained farmers on best practices for basil cultivation.',
      impact: '150 farmers trained; yield improved by 25%.',
      date: 'Oct 2024 - Dec 2024',
    },
    {
      id: 5,
      title: 'Fresh Produce Market Linkages',
      category: 'Market Access',
      summary: 'Connected local farmers to regional supermarkets and buyers.',
      impact: 'Increased farmer revenue by 40%.',
      date: 'Jan 2025 - Present',
    },
  ];

  // Match project title to corresponding image from assets
  const getImage = (title) => {
    const formattedTitle = title.replace(/\s/g, '%20'); // Replace spaces with %20 to match filenames
    const key = Object.keys(images).find((path) => path.includes(formattedTitle));
    return key ? images[key] : '';
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <div key={p.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <img
              src={getImage(p.title)}
              alt={p.title}
              className="w-full h-48 object-cover rounded-t-xl mb-4"
            />
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
