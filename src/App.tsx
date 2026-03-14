/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Team from './pages/Team';
import Reviews from './pages/Reviews';
import AboutUs from './pages/AboutUs';
import Inventory from './pages/Inventory';
import Chatbot from './components/Chatbot';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#141414] text-white font-sans">
        {/* Navigation Header */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md p-6 flex justify-center items-center gap-8 uppercase tracking-widest font-bold text-sm">
          <Link to="/" className="hover:text-red-600 transition text-lg">Tyre Zone</Link>
          <Link to="/inventory" className="hover:text-red-600 transition">Inventory</Link>
          <Link to="/services" className="hover:text-red-600 transition">Services</Link>
          <Link to="/team" className="hover:text-red-600 transition">Team</Link>
          <Link to="/reviews" className="hover:text-red-600 transition">Reviews</Link>
          <Link to="/about-us" className="hover:text-red-600 transition">About Us</Link>
          <Link to="/admin-login" className="hover:text-red-600 transition text-red-500 font-bold">Admin Login</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
        </Routes>

        <Chatbot />

        <footer className="bg-black py-12 px-6 text-center text-gray-400 border-t border-gray-800">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-bold mb-4">Contact Us</h4>
              <p>La Clery, Saint Lucia</p>
              <p>Phone: (758) 555-0123</p>
              <p>Email: info@tyrezone.lc</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Hours</h4>
              <p>Mon-Fri: 8am - 6pm</p>
              <p>Sat: 9am - 2pm</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Follow Us</h4>
              <p>Facebook / Instagram</p>
            </div>
          </div>
          <p className="mt-12 text-sm">&copy; 2026 Tyre Zone Saint Lucia. All rights reserved. | <Link to="/admin-login" className="text-red-500 hover:underline">Admin Login</Link></p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
