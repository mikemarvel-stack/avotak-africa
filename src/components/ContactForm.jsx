import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

export default function ContactForm(){
  const { register, handleSubmit, reset } = useForm()
  const onSubmit = async (data) => {
    try {
      await axios.post('https://formspree.io/f/yourformid', data)
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
