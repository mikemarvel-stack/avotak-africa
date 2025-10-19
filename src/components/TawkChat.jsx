import { useEffect, useState, useRef } from 'react';
import {
  ChatBubbleLeftIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  FaceSmileIcon,
} from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

export default function TawkChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const emojis = ['😀', '👍', '❤️', '🎉', '😮'];

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Load Tawk script
  useEffect(() => {
    if (!window.Tawk_API) {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://embed.tawk.to/YOUR_WIDGET_ID/default'; // Replace with your Tawk widget ID
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      document.body.appendChild(script);
    }
  }, []);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    // Welcome message on first open
    if (!isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{ text: 'Hi! How can we help you today? Chat with us.', sender: 'bot' }]);
      }, 300);
    }
  };

  const handleSend = (text = input) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { text, sender: 'user' }]);
    setInput('');

    // Show typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { text: 'Thanks for your message! Our team will respond shortly.', sender: 'bot' },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleEmoji = emoji => handleSend(emoji);

  const openTawk = () => {
    if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
      window.Tawk_API.maximize();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat button */}
      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="group bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center relative"
        aria-label="Chat with us"
      >
        <ChatBubbleLeftIcon className="w-6 h-6" />
        <span className="absolute -left-32 top-1/2 transform -translate-y-1/2 bg-green-700 text-white text-sm px-3 py-1 rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Chat with us
        </span>
      </motion.button>

      {/* Mini chat box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-3 w-80 bg-white rounded-xl shadow-lg flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green-600 text-white px-4 py-2 flex justify-between items-center">
              <span>Chat with us</span>
              <button onClick={toggleChat}>
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 p-3 h-60 overflow-y-auto space-y-2 flex flex-col">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm px-3 py-2 rounded-lg max-w-[75%] ${
                    msg.sender === 'user'
                      ? 'bg-green-100 self-end'
                      : 'bg-gray-200 self-start'
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm px-3 py-2 rounded-lg max-w-[50%] bg-gray-200 self-start flex items-center space-x-1"
                >
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    •
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                  >
                    •
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                  >
                    •
                  </motion.span>
                  <span>Typing...</span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Emoji picker */}
            <div className="flex space-x-1 p-2 border-t border-gray-200">
              {emojis.map((e, i) => (
                <button
                  key={i}
                  onClick={() => handleEmoji(e)}
                  className="text-xl hover:bg-gray-100 p-1 rounded"
                >
                  {e}
                </button>
              ))}
            </div>

            {/* Input area */}
            <div className="flex border-t border-gray-200">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-grow px-3 py-2 focus:outline-none"
              />
              <button
                onClick={() => handleSend()}
                className="bg-green-600 hover:bg-green-700 text-white px-3 flex items-center justify-center"
              >
                <PaperAirplaneIcon className="w-5 h-5 rotate-45" />
              </button>
            </div>

            {/* Optional Tawk integration */}
            <div
              className="text-xs text-gray-500 p-1 text-center cursor-pointer hover:text-green-700"
              onClick={openTawk}
            >
              Open full Tawk chat
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
