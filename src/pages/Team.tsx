import React from 'react';
import { motion } from 'motion/react';
import { User, Shield, Star } from 'lucide-react';

const teamMembers = [
  {
    name: "Kennady",
    role: "Chief Mechanic & Founder",
    bio: "With over 15 years of experience in automotive repair, Kennady leads the team with precision and passion.",
    image: "https://picsum.photos/seed/mechanic1/400/400"
  },
  {
    name: "Marcus",
    role: "Tire Specialist",
    bio: "Marcus is our expert in wheel alignment and tire geometry, ensuring your safety on the road.",
    image: "https://picsum.photos/seed/mechanic2/400/400"
  },
  {
    name: "Elena",
    role: "Diagnostic Technician",
    bio: "Elena specializes in advanced electronic diagnostics and error code scanning for modern vehicles.",
    image: "https://picsum.photos/seed/mechanic3/400/400"
  }
];

export default function Team() {
  return (
    <div className="min-h-screen bg-[#141414] text-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl font-bold uppercase mb-12 border-l-8 border-red-600 pl-6"
        >
          Meet The Team
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 group"
            >
              <div className="h-80 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                <p className="text-red-600 font-bold uppercase text-sm mb-4 tracking-widest">{member.role}</p>
                <p className="text-gray-400 leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
