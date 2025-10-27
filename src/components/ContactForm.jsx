import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

export default function ContactForm(){
  const { register, handleSubmit, reset } = useForm()
  const onSubmit = async (data) => {
    try {
      // Send to Formspree
      await axios.post('https://formspree.io/f/yourformid', data)

      // Also send to Tawk.to chat if available
      if (window.Tawk_API && typeof window.Tawk_API.addEvent === 'function') {
        window.Tawk_API.addEvent('Contact Form Submission', {
          name: data.name,
          email: data.email,
          company: data.company,
          message: data.message
        }, function(error){
          if(error) console.error('Tawk.to event error:', error);
        });
      } else if (window.Tawk_API && typeof window.Tawk_API.addTags === 'function') {
        // Fallback: add tags and send a message
        window.Tawk_API.addTags(['contact-form']);
        window.Tawk_API.sendMessage && window.Tawk_API.sendMessage(`Contact form: ${data.name} (${data.email})\n${data.company ? 'Company: ' + data.company + '\n' : ''}${data.message}`);
      }

      alert('Message sent — thank you!')
      reset()
    } catch (err) {
      console.error(err)
      alert('Failed to send — try again later')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
      <input {...register('name')} required placeholder="Name" className="w-full border rounded-lg p-3" />
      <input {...register('email')} required placeholder="Email" type="email" className="w-full border rounded-lg p-3" />
      <input {...register('company')} placeholder="Company (optional)" className="w-full border rounded-lg p-3" />
      <textarea {...register('message')} required placeholder="Message" className="w-full border rounded-lg p-3 h-36" />
      <button type="submit" className="w-full bg-primary text-white rounded-lg py-3">Send Message</button>
    </form>
  )
}
