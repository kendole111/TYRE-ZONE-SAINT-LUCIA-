import React from 'react';

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-bold mb-4">Content Management</h2>
          <p className="text-gray-400">Edit videos, photos, and descriptions.</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-bold mb-4">Chat Logs</h2>
          <p className="text-gray-400">View customer conversations.</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-bold mb-4">Subscriptions</h2>
          <p className="text-gray-400">Manage email subscribers.</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-bold mb-4">Data Upload</h2>
          <p className="text-gray-400">Upload Excel/PDF files.</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-bold mb-4">General Inquiries</h2>
          <p className="text-gray-400">View customer inquiries.</p>
        </div>
      </div>
    </div>
  );
}
