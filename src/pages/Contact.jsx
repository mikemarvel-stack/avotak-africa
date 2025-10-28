import React, { useState } from 'react';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  const [showMessage, setShowMessage] = useState(false);

    // Load and configure Tawk.to script
  React.useEffect(() => {
    // Initialize Tawk
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Configure Tawk
    window.Tawk_API.onBeforeLoad = function() {
      window.Tawk_API.hideWidget();
    };

    window.Tawk_API.onLoad = function() {
      window.Tawk_API.hideWidget();
      // Set chat page title and welcome message
      if (window.Tawk_API.setAttributes) {
        window.Tawk_API.setAttributes({
          'pageTitle': 'Avotak Africa',
        }, function(error) {});
      }
      if (window.Tawk_API.addEvent) {
        window.Tawk_API.addEvent('Welcome', {
          message: '👋 Hi there! Welcome to Avotak Africa. How can we help you today?\n\nYou can use this chat to ask about our services, products, or any inquiry. Our team is ready to assist you!'
        }, function(error) {});
      }
    };

    // Load Tawk script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/68ffda2105d3d8194aaa21ad/1j8jmo4rv';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);
  }, []);

  const handleChatClick = () => {
    // Try to open Tawk if available
    if (window.Tawk_API && window.Tawk_API.maximize) {
      window.Tawk_API.maximize();
    }
    // Show temporary message even if Tawk isn't configured
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 4000); // message disappears after 4s
  };

  return (
    <>
      <section className="max-w-3xl mx-auto px-4 py-12 relative">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="text-gray-600 mb-6">
          Send us an inquiry about consulting, produce supply, or partnerships.
        </p>

        <ContactForm />

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            For immediate assistance, you can also use our live chat.
          </p>
        </div>
      </section>

      {/* Avotak Africa Chat Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Slide-up message */}
        {showMessage && (
          <div className="mb-2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-up max-w-xs">
            <p className="font-semibold mb-1">Welcome to Avotak Africa!</p>
            <p className="text-sm">Our team is ready to assist you with any inquiries about our services and products.</p>
          </div>
        )}

        <button
          onClick={handleChatClick}
          className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white px-6 py-4 rounded-xl shadow-xl flex items-center justify-center transition-all hover:scale-105 border-2 border-green-400 font-bold text-lg gap-2"
          aria-label="Chat with Avotak Africa"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Chat with Avotak Africa
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
    </>
  );
}
