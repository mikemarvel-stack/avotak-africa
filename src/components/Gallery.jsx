import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Import all images from src/assets
    const modules = import.meta.glob('../assets/*.{jpg,jpeg,png,svg}', { eager: true, import: 'default' });
    const imgs = Object.values(modules);
    setImages(imgs);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({ left: direction * clientWidth * 0.8, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="relative">
        {/* Arrows */}
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100"
        >
          &#8592;
        </button>
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100"
        >
          &#8594;
        </button>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 py-4 snap-x snap-mandatory scroll-smooth"
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-64 h-40 rounded-lg overflow-hidden shadow-lg cursor-pointer snap-center"
              whileHover={{ scale: 1.05 }}
              onClick={() => setLightboxIndex(i)}
            >
              <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.img
              key={lightboxIndex}
              src={images[lightboxIndex]}
              alt={`Gallery ${lightboxIndex + 1}`}
              className="max-w-full max-h-full rounded-lg shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
