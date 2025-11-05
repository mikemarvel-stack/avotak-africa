import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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
import appleImg from '../assets/apple.jpg';
import herbNurseryImg from '../assets/Herb Nursery.jpg';
import exportMangoImg from '../assets/Export Mango Pilot.jpg';
import exportProcessImg from '../assets/Export Process Facilitation.jpg';
import freshProduceImg from '../assets/Fresh Produce Market Linkages.jpg';
import basilCultivationImg from '../assets/Basil Cultivation Program.jpg';

const GALLERY_IMAGES = [
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
  { url: appleImg, title: 'Fresh Apples' },
  { url: herbNurseryImg, title: 'Herb Nursery Project' },
  { url: exportMangoImg, title: 'Export Mango Pilot' },
  { url: exportProcessImg, title: 'Export Facilitation' },
  { url: freshProduceImg, title: 'Fresh Produce Market' },
  { url: basilCultivationImg, title: 'Basil Cultivation' },
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = GALLERY_IMAGES;
  const visibleCount = 4;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const getVisibleImages = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      visible.push(images[(currentIndex + i) % images.length]);
    }
    return visible;
  };

  const nextImage = () => setLightboxIndex((lightboxIndex + 1) % images.length);
  const prevImage = () => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);

  return (
    <>
      {/* Auto-scrolling Carousel */}
      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {getVisibleImages().map((img, i) => {
              const actualIndex = (currentIndex + i) % images.length;
              return (
                <motion.div
                  key={actualIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                  onClick={() => setLightboxIndex(actualIndex)}
                >
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-sm font-semibold">{img.title}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? 'w-8 bg-green-600' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
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
