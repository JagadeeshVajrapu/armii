'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePlatform } from '../../context/PlatformContext';
import { v4 as uuidv4 } from 'uuid';

export default function AddAccountPlatform() {
  const router = useRouter();
  const { addAccount, addPlatform, linkAccountPlatform } = usePlatform();

  // Dynamic rows state
  const [rows, setRows] = useState([
    { id: uuidv4(), platformType: '', accountAddress: '' }
  ]);

  // Handle row change
  const handleRowChange = (id, field, value) => {
    setRows(rows => rows.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  // Add new row
  const handleAddRow = () => {
    setRows(rows => [...rows, { id: uuidv4(), platformType: '', accountAddress: '' }]);
  };

  // Remove row
  const handleRemoveRow = (id) => {
    setRows(rows => rows.length > 1 ? rows.filter(row => row.id !== id) : rows);
  };

  // Save all rows
  const handleSubmit = (e) => {
    e.preventDefault();
    for (const row of rows) {
      if (!row.platformType || !row.accountAddress) continue;
      const accountId = addAccount({ name: row.accountAddress, type: 'business', email: '', phone: '', status: 'Active' });
      const platformId = addPlatform({ name: row.platformType, url: '', apiKey: '', type: row.platformType, status: 'Active' });
      linkAccountPlatform(accountId, platformId);
    }
    alert('Accounts and Platforms added successfully!');
    router.push('/admin/view-account-platform');
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8 bg-gray-100 p-4 rounded-lg">
          <h1 className="text-3xl text-gray-900">ADMIN</h1>
          <h2 className="text-xl text-gray-800">Add Account & Platform</h2>
        </header>

        {/* Main Content */}
        <main className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h3 className="text-lg mb-4 pb-2 border-b border-gray-200">Accounts & Platforms</h3>
              {rows.map((row, idx) => (
                <div key={row.id} className="flex items-center space-x-2 mb-4">
                  <select
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    value={row.platformType}
                    onChange={e => handleRowChange(row.id, 'platformType', e.target.value)}
                    required
                  >
                    <option value="">Select platform</option>
                    <option value="instagram">Instagram</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="whatsapp_business">WhatsApp Business</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="facebook">Facebook</option>
                    <option value="youtube">YouTube</option>
                    <option value="gmail">Gmail</option>
                    <option value="twitter">Twitter</option>
                    <option value="telegram">Telegram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="snapchat">Snapchat</option>
                    <option value="pinterest">Pinterest</option>
                    <option value="other">Other</option>
                  </select>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Enter account address"
                    value={row.accountAddress}
                    onChange={e => handleRowChange(row.id, 'accountAddress', e.target.value)}
                    required
                  />
                  <button type="button" onClick={handleAddRow} className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">+</button>
                  <button type="button" onClick={() => handleRemoveRow(row.id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">x</button>
                </div>
              ))}
            </div>
            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <Link 
                href="/" 
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 transition-all duration-200"
              >
                Cancel
              </Link>
              <Link 
                href="/admin/view-account-platform" 
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 transition-all duration-200"
              >
                View All
              </Link>
              <button 
                type="submit" 
                className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-200"
              >
                Save
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}