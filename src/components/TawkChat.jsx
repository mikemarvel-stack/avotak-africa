import { useEffect, useState, useRef } from 'react';
import {
  ChatBubbleLeftIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  FaceSmileIcon,
} from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

// Modernized TawkChat component with Contact page integration
export default function TawkChat({ openFromContact }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: '👋 Hi there! Welcome to Avotak Africa. How can we help you today?\n\nYou can use this chat to ask about our services, products, or any inquiry. Our team is ready to assist you! (You can also use the green chat icon at any time.)',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Hardcoded Tawk.to Widget ID and property from provided code
  const TAWK_PROPERTY_ID = '68ffda2105d3d8194aaa21ad';
  const TAWK_WIDGET_ID = '1j8jmo4rv';

  // Load Tawk.to script
  useEffect(() => {
    if (!window.Tawk_API) {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      document.body.appendChild(script);
    }
  }, []);

  // Allow external open (from Contact page)
  useEffect(() => {
    if (openFromContact) setIsOpen(true);
  }, [openFromContact]);

  const emojis = ['😀','👍','❤️','🎉','😮','🙏','🌱','📞'];

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const handleSend = (text = input) => {
    if (!text.trim()) return;
    setMessages(prev => [
      ...prev,
      { text, sender: 'user', timestamp: new Date() },
    ]);
    setInput('');

    // Show typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          text: '✅ Thank you for reaching out! Our team will respond as soon as possible. You can also leave your email for a follow-up.',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleEmoji = emoji => handleSend(emoji);

  const openTawk = () => {
    if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
      window.Tawk_API.maximize();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Modern Chat Button */}
      <motion.button
        onClick={toggleChat}
        className="bg-gradient-to-br from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white p-4 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110 border-4 border-white"
        aria-label="Chat with us"
      >
        <ChatBubbleLeftIcon className="w-7 h-7" />
        <span className="ml-2 font-semibold hidden sm:inline">Chat</span>
      </motion.button>

      {/* Modern Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-3 w-80 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-green-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-700 to-green-500 text-white px-4 py-3 flex justify-between items-center">
              <span className="font-bold tracking-wide text-lg">Avotak Africa</span>
              <button onClick={toggleChat} className="hover:bg-green-700 rounded-full p-1">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 p-4 h-64 overflow-y-auto space-y-3 flex flex-col bg-gray-50">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm px-4 py-2 rounded-2xl max-w-[80%] shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-green-100 self-end text-right'
                      : 'bg-white self-start border border-green-100'
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm px-4 py-2 rounded-2xl max-w-[60%] bg-white self-start flex items-center space-x-1 border border-green-100"
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
            <div className="flex space-x-2 p-3 border-t border-gray-200 bg-white">
              {emojis.map((e, i) => (
                <button
                  key={i}
                  onClick={() => handleEmoji(e)}
                  className="text-xl hover:bg-green-50 p-1 rounded transition"
                >
                  {e}
                </button>
              ))}
            </div>

            {/* Input area */}
            <div className="flex border-t border-gray-200 bg-white">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type your message or inquiry for Avotak Africa..."
                className="flex-grow px-4 py-3 focus:outline-none rounded-l-2xl"
              />
              <button
                onClick={() => handleSend()}
                className="bg-green-600 hover:bg-green-700 text-white px-4 flex items-center justify-center rounded-r-2xl"
              >
                <PaperAirplaneIcon className="w-5 h-5 rotate-45" />
              </button>
            </div>

            {/* Optional Tawk integration */}
            <div
              className="text-xs text-gray-500 p-2 text-center cursor-pointer hover:text-green-700 border-t border-green-50 bg-gray-50"
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
