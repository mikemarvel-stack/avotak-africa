import React, { useState } from 'react';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  const [showMessage, setShowMessage] = useState(false);

  const handleChatClick = () => {
    // Try to open Tawk if available
    if (window.Tawk_API) {
      window.Tawk_API.maximize();
    }
    // Show temporary message even if Tawk isn't configured
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 4000); // message disappears after 4s
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-12 relative">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-gray-600 mb-6">
        Send us an inquiry about consulting, produce supply, or partnerships.
      </p>

      <ContactForm />

      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Slide-up message */}
        {showMessage && (
          <div className="mb-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-up">
            Hi! How can we help?
          </div>
        )}

        <button
          onClick={handleChatClick}
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform transform hover:scale-110"
          aria-label="Chat with us"
        >
          💬
        </button>
      </div>

      {/* Optional: CSS animation */}
      <style>
        {`
          @keyframes slideUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-up {
            animation: slideUp 0.3s ease-out;
          }
        `}
      </style>
    </section>
  );
}
