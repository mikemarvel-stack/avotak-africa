import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function ProduceCard({ item: produce, index }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group"
    >
      <Link to={`/produce/${produce.slug}`} className="block">
        <div className="relative h-56">
          <LazyLoadImage
            src={produce.imageUrl}
            alt={produce.name}
            effect="blur"
            className="w-full h-full object-cover"
            wrapperClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-white text-xl font-bold">{produce.name}</h3>
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-600 text-sm mb-2">{produce.shortDescription}</p>
          <span className="text-green-600 font-semibold hover:text-green-700 transition-colors duration-300">
            Learn More &rarr;
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
