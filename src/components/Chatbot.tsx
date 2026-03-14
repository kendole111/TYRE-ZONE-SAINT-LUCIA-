import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden"
          >
            <div className="bg-red-600 p-4 flex justify-between items-center text-white">
              <h3 className="font-bold">Tyre Zone Assistant</h3>
              <button onClick={() => setIsOpen(false)}><X size={20} /></button>
            </div>
            <div className="h-64 p-4 text-gray-400 text-sm">
              <p>How can I help you with your vehicle today?</p>
            </div>
            <div className="p-4 border-t border-gray-800 flex gap-2">
              <input type="text" placeholder="Type a message..." className="flex-1 bg-gray-800 rounded-lg p-2 text-white outline-none" />
              <button className="bg-red-600 p-2 rounded-lg text-white"><Send size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
