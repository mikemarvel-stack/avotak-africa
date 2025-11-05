import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

export default function ContactForm(){
  const { register, handleSubmit, reset } = useForm()
  const onSubmit = async (data) => {
    try {
      if (!data.name || !data.email || !data.message) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Send to Formspree
      await axios.post('https://formspree.io/f/xqkrznyg', data, {
        headers: { 'Content-Type': 'application/json' }
      })

      // Format the message for Tawk
      const formattedMessage = `New Contact Form Submission:\n\nName: ${data.name}\nEmail: ${data.email}\n${data.company ? `Company: ${data.company}\n` : ''}Message: ${data.message}`;

      // Initialize Tawk if needed
      if (typeof window.Tawk_API === 'undefined') {
        window.Tawk_API = {};
        window.Tawk_LoadStart = new Date();
        
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://embed.tawk.to/68ffda2105d3d8194aaa21ad/1j8jmo4rv';
        script.charset = 'UTF-8';
        script.setAttribute('crossorigin', '*');
        
        script.onload = () => {
          // Once script is loaded, set attributes and send message
          sendTawkMessage();
        };
        
        document.body.appendChild(script);
      } else {
        // If Tawk is already loaded, send message directly
        sendTawkMessage();
      }

      function sendTawkMessage() {
        if (window.Tawk_API) {
          // Set visitor information first
          window.Tawk_API.setAttributes({
            name: data.name,
            email: data.email
          }, function(error) {
            if (error) {
              console.error('Tawk.to set attributes error:', error);
            } else {
              // After attributes are set, open chat and send message
              window.Tawk_API.maximize();
              setTimeout(() => {
                window.Tawk_API.onLoad = function() {
                  window.Tawk_API.sendMessage(formattedMessage);
                };
                if (window.Tawk_API.isChatMaximized()) {
                  window.Tawk_API.sendMessage(formattedMessage);
                }
              }, 1500);
            }
          });
        }
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
