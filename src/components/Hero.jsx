import React from 'react'
import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <section className="bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl md:text-5xl font-bold text-primary">Avotak Africa</motion.h1>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}} className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Empowering farmers and agribusinesses with sustainable practices, market linkages and fresh produce expertise.
        </motion.p>
        <div className="mt-8 flex justify-center gap-4">
          <a href="/services" className="px-6 py-3 bg-primary text-white rounded-xl">Our Services</a>
          <a href="/contact" className="px-6 py-3 border rounded-xl">Get in touch</a>
        </div>
      </div>
    </section>
  )
}
