import React from 'react';
import { motion } from 'motion/react';
import { Wrench, Gauge, ShieldCheck, Zap, Thermometer, Search } from 'lucide-react';

const services = [
  {
    title: "Tyre Fitting & Balancing",
    description: "Professional tire mounting and computer-aided balancing for a smooth ride.",
    icon: <Gauge size={32} />
  },
  {
    title: "Brake Service",
    description: "Comprehensive inspection and replacement of pads, discs, and brake fluid.",
    icon: <ShieldCheck size={32} />
  },
  {
    title: "Oil & Filter Change",
    description: "Premium oil and filter changes to keep your engine running efficiently.",
    icon: <Wrench size={32} />
  },
  {
    title: "Wheel Alignment",
    description: "Precision 3D alignment to prevent uneven tire wear and improve handling.",
    icon: <Zap size={32} />
  },
  {
    title: "AC Service",
    description: "Recharging and repairing air conditioning systems for maximum comfort.",
    icon: <Thermometer size={32} />
  },
  {
    title: "Full Diagnostics",
    description: "Advanced scanning for error codes and hidden mechanical issues.",
    icon: <Search size={32} />
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#141414] text-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl font-bold uppercase mb-12 border-l-8 border-red-600 pl-6"
        >
          Our Services
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-red-600 transition-all duration-300 group"
            >
              <div className="text-red-600 mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
