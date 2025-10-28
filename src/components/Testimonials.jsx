
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'FarmFresh Exporters',
    quote: "Avotak Africa's consultancy transformed our supply chain. Their expertise in sustainable farming is unmatched.",
    avatar: 'https://i.pravatar.cc/150?img=1', // Placeholder image
    rating: 5,
  },
  {
    name: 'GreenLeaf Organics',
    quote: 'The quality of herbs we source through Avotak is consistently excellent. They are a reliable and valuable partner.',
    avatar: 'https://i.pravatar.cc/150?img=2', // Placeholder image
    rating: 5,
  },
  {
    name: 'AgriInvest Corp',
    quote: 'Their market insights and project management for our avocado plantation were instrumental to our success.',
    avatar: 'https://i.pravatar.cc/150?img=3', // Placeholder image
    rating: 4,
  },
];

export default function Testimonials() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Partners Say</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          We are proud to have built lasting relationships with clients who trust our expertise and commitment to quality.
        </p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mb-4 border-4 border-green-200"
              />
              <Quote className="w-8 h-8 text-green-400 mb-4" />
              <p className="text-gray-600 italic mb-6 flex-grow">"{testimonial.quote}"</p>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <h4 className="font-bold text-lg mt-4">{testimonial.name}</h4>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
