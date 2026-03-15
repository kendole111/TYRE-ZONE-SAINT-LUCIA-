import React from 'react';
import { motion } from 'motion/react';

const inventoryVideos = [
  {
    id: 1,
    title: "Premium Tire Selection",
    src: "https://raw.githubusercontent.com/kendole111/tyre-zone-/f6e7af9fd20b98c5093fefa2cd7ac36b934bf179/Tyre%20Zone%20la%20clery%20sain%20lucia%20video.mp4",
    description: "Check out our latest stock of high-performance tires."
  },
  {
    id: 2,
    title: "Brake System Components",
    src: "https://raw.githubusercontent.com/kendole111/tyre-zone-/f6e7af9fd20b98c5093fefa2cd7ac36b934bf179/Tyre%20Zone%20la%20clery%20sain%20lucia%20video.mp4", // Reusing for now
    description: "Quality brake pads and discs for all vehicle types."
  },
  {
    id: 3,
    title: "Suspension & Alignment",
    src: "https://raw.githubusercontent.com/kendole111/tyre-zone-/f6e7af9fd20b98c5093fefa2cd7ac36b934bf179/Tyre%20Zone%20la%20clery%20sain%20lucia%20video.mp4", // Reusing for now
    description: "Precision alignment tools and suspension parts."
  }
];

export default function Inventory() {
  return (
    <div className="min-h-screen bg-[#141414] text-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold uppercase mb-12 border-l-8 border-red-600 pl-6"
        >
          Our Inventory
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {inventoryVideos.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 group"
            >
              <div className="aspect-video relative overflow-hidden bg-black">
                <video 
                  src={item.src} 
                  controls 
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
