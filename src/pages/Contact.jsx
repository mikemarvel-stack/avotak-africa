import React from 'react'
import ContactForm from '../components/ContactForm'

export default function Contact(){
  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-gray-600 mb-6">Send us an inquiry about consulting, produce supply, or partnerships.</p>
      <ContactForm />
    </section>
  )
}
