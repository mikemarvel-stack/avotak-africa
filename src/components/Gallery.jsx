import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import avocadoImg from '../assets/avocado.jpg';
import mangoImg from '../assets/mango.jpg';
import basilImg from '../assets/basil.jpg';
import gingerImg from '../assets/ginger.jpg';
import herbsImg from '../assets/herb-field.jpg';
import tomatoImg from '../assets/tomato.jpg';
import rosemaryImg from '../assets/rosemary.jpg';
import corianderImg from '../assets/coriander.jpg';
import turmericImg from '../assets/turmeric.jpg';
import spinachImg from '../assets/spinach.jpg';
import carrotImg from '../assets/carrot.jpg';
import bananaImg from '../assets/banana.jpg';

const FALLBACK_IMAGES = [
  { url: avocadoImg, title: 'Fresh Avocados' },
  { url: mangoImg, title: 'Ripe Mangoes' },
  { url: basilImg, title: 'Organic Basil' },
  { url: gingerImg, title: 'Fresh Ginger' },
  { url: herbsImg, title: 'Herb Field' },
  { url: tomatoImg, title: 'Vine Tomatoes' },
  { url: rosemaryImg, title: 'Fresh Rosemary' },
  { url: corianderImg, title: 'Coriander Leaves' },
  { url: turmericImg, title: 'Organic Turmeric' },
  { url: spinachImg, title: 'Green Spinach' },
  { url: carrotImg, title: 'Fresh Carrots' },
  { url: bananaImg, title: 'Ripe Bananas' },
];

export default function Gallery() {
  const { data: galleryData } = useFetch('/content/gallery');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const images = (galleryData && galleryData.length > 0) ? galleryData : FALLBACK_IMAGES;

  const nextImage = () => setLightboxIndex((lightboxIndex + 1) % images.length);
  const prevImage = () => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer group"
            onClick={() => setLightboxIndex(i)}
          >
            <img 
              src={img.url || img.imageUrl || img} 
              alt={img.title || `Gallery ${i + 1}`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <p className="text-white text-sm font-medium">{img.title || 'View Image'}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>
            
            <motion.img
              key={lightboxIndex}
              src={images[lightboxIndex].url || images[lightboxIndex].imageUrl || images[lightboxIndex]}
              alt={images[lightboxIndex].title || `Gallery ${lightboxIndex + 1}`}
              className="max-w-full max-h-full rounded-lg shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
            
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight className="w-12 h-12" />
            </button>
            
            <div className="absolute bottom-4 text-white text-sm">
              {lightboxIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
