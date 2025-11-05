import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

export default function ContactForm({ onSubmit: customOnSubmit, formData, setFormData }){
  const { register, handleSubmit, reset } = useForm()
  const onSubmit = async (data) => {
    if (customOnSubmit) {
      customOnSubmit({ preventDefault: () => {} });
    }
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input 
        {...register('name')} 
        required 
        placeholder="Your Name" 
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        onChange={(e) => setFormData && setFormData(prev => ({ ...prev, name: e.target.value }))}
      />
      <input 
        {...register('email')} 
        required 
        placeholder="Your Email" 
        type="email" 
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        onChange={(e) => setFormData && setFormData(prev => ({ ...prev, email: e.target.value }))}
      />
      <input 
        {...register('company')} 
        placeholder="Company (optional)" 
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent" 
      />
      <textarea 
        {...register('message')} 
        required 
        placeholder="Your Message" 
        className="w-full border border-gray-300 rounded-lg p-3 h-36 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        onChange={(e) => setFormData && setFormData(prev => ({ ...prev, message: e.target.value }))}
      />
      <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg py-3 transition-colors">Send Message</button>
    </form>
  )
}
