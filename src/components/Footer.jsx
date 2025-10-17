import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="font-semibold text-primary">Avotak Africa Ltd</div>
          <div className="text-sm text-gray-600">Sustainable agricultural consulting • Fruits & Herbs</div>
        </div>
        <div className="text-sm text-gray-500">© {new Date().getFullYear()} Avotak Africa</div>
      </div>
    </footer>
  )
}
