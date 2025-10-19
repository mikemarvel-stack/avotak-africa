import React from 'react'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function StickySocials() {
  return (
    <motion.div
      className="fixed top-1/3 left-0 flex flex-col gap-3 p-2 z-50"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <a href="#" aria-label="Facebook" className="bg-blue-600 text-white p-3 rounded-r-lg shadow hover:bg-blue-700 transition">
        <Facebook className="w-5 h-5" />
      </a>
      <a href="#" aria-label="Twitter" className="bg-sky-400 text-white p-3 rounded-r-lg shadow hover:bg-sky-500 transition">
        <Twitter className="w-5 h-5" />
      </a>
      <a href="#" aria-label="Instagram" className="bg-pink-500 text-white p-3 rounded-r-lg shadow hover:bg-pink-600 transition">
        <Instagram className="w-5 h-5" />
      </a>
      <a href="#" aria-label="LinkedIn" className="bg-blue-700 text-white p-3 rounded-r-lg shadow hover:bg-blue-800 transition">
        <Linkedin className="w-5 h-5" />
      </a>
    </motion.div>
  )
}
