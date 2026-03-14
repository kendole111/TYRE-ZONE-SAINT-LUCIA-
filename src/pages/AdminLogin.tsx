import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple mock authentication for now
      navigate('/admin-panel');
    } else {
      alert('Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#141414] text-white">
      <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800">
        <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" 
          className="w-full bg-gray-800 rounded-lg p-3 mb-4 text-white outline-none"
        />
        <button type="submit" className="w-full bg-red-600 p-3 rounded-lg font-bold hover:bg-red-700 transition">Login</button>
      </form>
    </div>
  );
}
