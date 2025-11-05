import React, { useState, useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (window.Tawk_API && window.Tawk_API.maximize) {
      window.Tawk_API.setAttributes({
        name: formData.name,
        email: formData.email
      });
      
      window.Tawk_API.addEvent('contact-form-submission', {
        name: formData.name,
        email: formData.email,
        message: formData.message
      });
      
      window.Tawk_API.maximize();
      
      setTimeout(() => {
        if (window.Tawk_API.sendMessage) {
          window.Tawk_API.sendMessage(`Contact Form Submission:\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
        }
      }, 500);
    }
  };

  const openChat = () => {
    if (window.Tawk_API && window.Tawk_API.maximize) {
      window.Tawk_API.maximize();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-600">We'd love to hear from you. Send us a message or start a live chat.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <ContactForm onSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Live Chat Support</h2>
              <p className="mb-6">Get instant answers to your questions. Our team is ready to help!</p>
              <button
                onClick={openChat}
                className="w-full bg-white text-green-700 font-bold py-4 px-6 rounded-xl hover:bg-green-50 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Start Live Chat
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-gray-600">East Africa (Kenya, Uganda, Tanzania)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">admin@avotak.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-600">Available via live chat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
