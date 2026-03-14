import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { Wrench, Gauge, ShieldCheck, Clock } from "lucide-react";
import { VoiceAgentSection } from '../components/VoiceAgentSection';

const media = [
  { type: 'video', src: 'https://raw.githubusercontent.com/kendole111/tyre-zone-/f6e7af9fd20b98c5093fefa2cd7ac36b934bf179/Tyre%20Zone%20la%20clery%20sain%20lucia%20video.mp4' },
  { type: 'image', src: 'https://raw.githubusercontent.com/kendole111/tyre-zone-/f5e332bcce1b72ac8743f2a45fb7aaa01ce499bb/facebook%20tyre%20zone%20%20photocapture_260314_031427.png' },
  { type: 'image', src: 'https://raw.githubusercontent.com/kendole111/tyre-zone-/f5e332bcce1b72ac8743f2a45fb7aaa01ce499bb/rimz%20%201%20%20capture_260314_023510.png' },
  { type: 'image', src: 'https://raw.githubusercontent.com/kendole111/tyre-zone-/f5e332bcce1b72ac8743f2a45fb7aaa01ce499bb/riz%202%20capture_260314_023608.png' },
  { type: 'image', src: 'https://raw.githubusercontent.com/kendole111/tyre-zone-/f5e332bcce1b72ac8743f2a45fb7aaa01ce499bb/rimz%203%20capture_260314_023704.png' },
  { type: 'image', src: 'https://raw.githubusercontent.com/kendole111/tyre-zone-/f5e332bcce1b72ac8743f2a45fb7aaa01ce499bb/rimz%204%20capture_260314_023850.png' },
  { type: 'image', src: 'https://raw.githubusercontent.com/kendole111/tyre-zone-/f5e332bcce1b72ac8743f2a45fb7aaa01ce499bb/rimz%205%20capture_260314_023919.png' },
  { type: 'image', src: 'https://raw.githubusercontent.com/kendole111/tyre-zone-/f5e332bcce1b72ac8743f2a45fb7aaa01ce499bb/tyre%20zone%20%20white%20van%20capture_260314_031619.png' },
];

function HeroBackground() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % media.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {media[index].type === 'video' ? (
            <video src={media[index].src} autoPlay muted loop className="w-full h-full object-cover opacity-60" />
          ) : (
            <img src={media[index].src} className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#141414] text-white font-sans pt-20">
      {/* Hero Section */}
      <header className="relative h-screen flex flex-col justify-center items-center text-center p-6">
        <HeroBackground />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-4">
            TYRE ZONE<br />SAINT LUCIA<br />
            <span className="text-3xl md:text-4xl font-light italic text-gray-300 block mt-4">Tire Shop In La Clery</span>
          </h1>
        </motion.div>
      </header>

      {/* AI Voice Agent Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-3xl font-bold uppercase mb-6">Ask our Tyre Zone Mechanic Voice Agent questions.</h2>
        <p className="text-gray-400 mb-4">Experience our concierge service with our new AI Voice Agents.</p>
        <p className="text-gray-400 mb-8">Speak naturally to explore the repairs and maintenance we cover — tyres, brakes, oil changes, alignments, AC, diagnostics, and more — all tailored for your vehicle.</p>
        
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-xl font-bold">Tyre Zone Mechanic Voice Agent</h3>
          <VoiceAgentSection />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-black py-8 border-y border-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <StatItem number="15" label="Years of Experience" />
          <StatItem number="100+" label="Daily Services" />
          <StatItem number="100%" label="Customer Satisfaction" />
        </div>
      </section>

      {/* Services Section (Diagnostics) */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold uppercase mb-12 border-l-4 border-red-600 pl-4">Diagnostics</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <video 
            src="https://raw.githubusercontent.com/kendole111/tyre-zone-/f6e7af9fd20b98c5093fefa2cd7ac36b934bf179/Tyre%20Zone%20la%20clery%20sain%20lucia%20video.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline
            className="rounded-xl shadow-2xl w-full aspect-video object-cover" 
          />
          <div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Our advanced diagnostic tools ensure your vehicle is running at peak performance. 
              We focus on precision, from tire pressure monitoring to complex engine diagnostics.
            </p>
            <div className="flex gap-4">
              <span className="bg-gray-800 px-4 py-2 rounded text-sm">Tire Alignment</span>
              <span className="bg-gray-800 px-4 py-2 rounded text-sm">Engine Check</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-red-600 py-3 overflow-hidden">
        <div className="whitespace-nowrap animate-marquee font-bold uppercase tracking-widest">
          Uncompromising Performance • Professional Care • Top-Level Diagnostics • Fast Service • Uncompromising
        </div>
      </div>

      {/* Services List */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold uppercase mb-12">Our Services</h2>
        <div className="space-y-8">
          <ServiceItem title="Tyre Service and Geometry" time="45 Minutes" icon={<Gauge />} />
          <ServiceItem title="Oil Change & Filter" time="30 Minutes" icon={<Wrench />} />
          <ServiceItem title="Brake Inspection" time="60 Minutes" icon={<ShieldCheck />} />
        </div>
      </section>

      {/* Footer / Testimonial */}
      <footer className="bg-black py-20 px-6 text-center">
        <h3 className="text-3xl font-bold uppercase mb-8">Discover Expertise</h3>
        <p className="max-w-2xl mx-auto text-gray-400 italic text-xl">
          "We approach every car as if it were our own. We emphasize detail, precision and, most importantly, transparency towards the customer."
        </p>
        <p className="mt-6 font-bold text-red-600">— Chief Mechanic</p>
      </footer>
    </div>
  );
}

function StatItem({ number, label }: { number: string, label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold text-red-600">{number}</div>
      <div className="text-sm uppercase tracking-widest text-gray-400">{label}</div>
    </div>
  );
}

function ServiceItem({ title, time, icon }: { title: string, time: string, icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between bg-gray-900 p-6 rounded-xl hover:bg-gray-800 transition">
      <div className="flex items-center gap-4">
        <div className="text-red-600">{icon}</div>
        <h4 className="text-xl font-semibold">{title}</h4>
      </div>
      <div className="text-gray-400 flex items-center gap-2">
        <Clock size={16} />
        {time}
      </div>
    </div>
  );
}
