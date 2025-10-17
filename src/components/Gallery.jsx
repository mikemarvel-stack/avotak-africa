import React from 'react'

export default function Gallery({ images = [] }){
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {images.map((src, i) => (
        <img key={i} src={src} alt={`img-${i}`} className="w-full h-36 object-cover rounded-lg" />
      ))}
    </div>
  )
}
