import React from 'react';
import { motion } from 'motion/react';
import { 
  FileVideo, 
  MessageSquare, 
  Mail, 
  Upload, 
  Info, 
  Users, 
  LogOut, 
  LayoutDashboard,
  ChevronRight,
  Settings,
  Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const navigate = useNavigate();

  const adminSections = [
    {
      id: 'content',
      title: 'Content Management',
      description: 'Edit videos, photos, and descriptions.',
      icon: <FileVideo className="text-red-500" size={24} />,
      color: 'bg-red-500/10',
      borderColor: 'border-red-500/20'
    },
    {
      id: 'chat',
      title: 'Chat Logs',
      description: 'View customer conversations.',
      icon: <MessageSquare className="text-blue-500" size={24} />,
      color: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      id: 'subs',
      title: 'Subscriptions',
      description: 'Manage email subscribers.',
      icon: <Mail className="text-green-500" size={24} />,
      color: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      id: 'upload',
      title: 'Data Upload',
      description: 'Upload Excel/PDF files.',
      icon: <Upload className="text-purple-500" size={24} />,
      color: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      id: 'inquiries',
      title: 'General Inquiries',
      description: 'View customer inquiries.',
      icon: <Info className="text-yellow-500" size={24} />,
      color: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20'
    },
    {
      id: 'users',
      title: 'User Management',
      description: 'Manage admin accounts and roles.',
      icon: <Users className="text-cyan-500" size={24} />,
      color: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20'
    }
  ];

  const handleSectionClick = (id: string) => {
    // For now, show an alert or just log it
    console.log(`Navigating to ${id}...`);
    alert(`${id} management is coming soon!`);
  };

  const handleLogout = () => {
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="bg-red-600 p-3 rounded-xl shadow-lg shadow-red-600/20">
              <LayoutDashboard size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight uppercase">Admin Dashboard</h1>
              <p className="text-gray-400 mt-1">Welcome back, Administrator</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <button className="p-2 bg-gray-900 rounded-lg border border-gray-800 hover:bg-gray-800 transition relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
            <button className="p-2 bg-gray-900 rounded-lg border border-gray-800 hover:bg-gray-800 transition">
              <Settings size={20} />
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold transition shadow-lg shadow-red-600/20"
            >
              <LogOut size={18} />
              Logout
            </button>
          </motion.div>
        </div>

        {/* Stats Overview (Optional but professional) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Visits', value: '1,284', change: '+12%' },
            { label: 'Active Chats', value: '5', change: 'Live' },
            { label: 'New Reviews', value: '24', change: '+3 today' },
            { label: 'System Status', value: 'Online', change: 'Stable' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm"
            >
              <p className="text-sm font-bold uppercase text-gray-500 tracking-wider">{stat.label}</p>
              <div className="flex items-end justify-between mt-2">
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.includes('+') ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                  {stat.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adminSections.map((section, index) => (
            <motion.button
              key={section.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSectionClick(section.id)}
              className={`group relative text-left bg-gray-900 p-8 rounded-3xl border ${section.borderColor} hover:border-white/20 transition-all duration-300 shadow-xl overflow-hidden`}
            >
              {/* Background Glow Effect */}
              <div className={`absolute -right-12 -top-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${section.color}`}></div>
              
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-2xl ${section.color} border ${section.borderColor}`}>
                  {section.icon}
                </div>
                <ChevronRight className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
              </div>

              <h2 className="text-2xl font-bold mb-3 group-hover:text-red-500 transition-colors">{section.title}</h2>
              <p className="text-gray-400 leading-relaxed">{section.description}</p>
              
              <div className="mt-8 flex items-center text-sm font-bold text-gray-500 group-hover:text-white transition-colors uppercase tracking-widest">
                Manage Section
                <div className="ml-2 h-px w-0 group-hover:w-12 bg-red-600 transition-all duration-500"></div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
