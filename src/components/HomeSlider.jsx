import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import slide5 from "../assets/slider/slide5.jpg";
import slide3 from "../assets/slider/slide3.jpg";
import slide2 from "../assets/slider/slide2.jpg";
import slide1 from "../assets/slider/slide1.jpg";
import slide4 from "../assets/slider/slide4.jpg";

// Static fallback images
const staticImages = [slide1, slide2, slide3, slide4, slide5];

export default function HomeSlider({ children, sliderImages }) {
  const [current, setCurrent] = useState(0);
  
  // Use dynamic images if available, otherwise use static ones
  const images = sliderImages && sliderImages.length > 0 ? sliderImages : staticImages;

  useEffect(() => {
    if (images.length === 0) return; // Don't start timer if no images
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);

  if (images.length === 0) {
    return (
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] bg-gray-200 flex items-center justify-center">
        <p>No images to display.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Responsive height: 500px desktop, 400px tablet, 300px mobile */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
        {/* Slider images with slide + fade */}
        <AnimatePresence>
          <motion.img
            key={current}
            src={images[current]}
            alt={`Slide ${current}`}
            className="absolute w-full h-full object-cover"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Overlay content */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          {children}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          &#10095;
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                idx === current ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => setCurrent(idx)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
