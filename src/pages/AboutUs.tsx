import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#141414] text-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl font-bold uppercase mb-12 border-l-8 border-red-600 pl-6"
        >
          About Tyre Zone
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://raw.githubusercontent.com/kendole111/tyre-zone-/f5e332bcce1b72ac8743f2a45fb7aaa01ce499bb/facebook%20tyre%20zone%20%20photocapture_260314_031427.png" 
              alt="Tyre Zone Shop" 
              className="rounded-2xl shadow-2xl border border-gray-800"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <div className="space-y-8">
            <h2 className="text-3xl font-bold uppercase">Our Mission</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Tyre Zone Saint Lucia is dedicated to providing the highest quality vehicle maintenance and tire services in La Clery. 
              We believe in transparency, precision, and uncompromised safety for every vehicle that enters our garage.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="bg-red-600/20 p-3 rounded-lg text-red-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold uppercase text-sm text-gray-300">Location</h4>
                  <p className="text-gray-400">La Clery, Castries<br />Saint Lucia</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-red-600/20 p-3 rounded-lg text-red-600">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold uppercase text-sm text-gray-300">Business Hours</h4>
                  <p className="text-gray-400">Mon-Fri: 8am - 6pm<br />Sat: 9am - 2pm</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-red-600/20 p-3 rounded-lg text-red-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold uppercase text-sm text-gray-300">Call Us</h4>
                  <p className="text-gray-400">(758) 555-0123</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-red-600/20 p-3 rounded-lg text-red-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold uppercase text-sm text-gray-300">Email</h4>
                  <p className="text-gray-400">info@tyrezone.lc</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
