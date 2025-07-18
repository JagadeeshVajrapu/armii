'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePlatform } from '../../context/PlatformContext';

export default function SetAccountPlatform() {
  const router = useRouter();
  const { accounts, platforms, linkAccountPlatform, deleteAccount } = usePlatform();
  
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [formData, setFormData] = useState({
    accountStatus: 'active',
    accountEmail: '',
    accountPhone: '',
    platformStatus: 'active',
    apiEndpoint: '',
    webhookURL: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  
  const handleAccountSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccount(e.target.value);
  };
  
  const handlePlatformSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlatform(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If both account and platform are selected, link them
    if (selectedAccount && selectedPlatform) {
      linkAccountPlatform(selectedAccount, selectedPlatform);
    }
    
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8 bg-gray-100 p-4 rounded-lg">
          <h1 className="text-3xl text-gray-900">ADMIN</h1>
          <h2 className="text-xl text-gray-800">Set Account & Platform</h2>
          <p className="text-gray-700 mt-2">Configure your account and platform settings</p>
        </header>

        {/* Main Content */}
        <main className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit}>
            {/* Account Settings Section */}
            <div className="mb-8">
              <h3 className="text-lg mb-4 pb-2 border-b border-gray-200 font-bold text-blue-700">Account Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="accountSelect" className="block text-sm text-gray-700 mb-1">Select Account</label>
                  <div className="flex space-x-2">
                    <select 
                      id="accountSelect" 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      value={selectedAccount}
                      onChange={handleAccountSelect}
                    >
                      <option value="">Choose an account</option>
                      {accounts.map(account => (
                        <option key={account.id} value={account.id}>
                          {account.name} ({account.type})
                        </option>
                      ))}
                    </select>
                    <button 
                      type="button"
                      onClick={() => router.push('/admin/add-account-platform')}
                      className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      title="Add New Account"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="accountStatus" className="block text-sm text-gray-700 mb-1">Account Status</label>
                  <select 
                    id="accountStatus" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    value={formData.accountStatus}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="accountEmail" className="block text-sm text-gray-700 mb-1">Account Email</label>
                  <input 
                    type="email" 
                    id="accountEmail" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900" 
                    placeholder="Enter account email (e.g., business@company.com)"
                    value={formData.accountEmail}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="accountPhone" className="block text-sm text-gray-700 mb-1">Account Phone</label>
                  <input 
                    type="tel" 
                    id="accountPhone" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900" 
                    placeholder="Enter business phone number"
                    value={formData.accountPhone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Platform Settings Section */}
            <div className="mb-8">
              <h3 className="text-lg mb-4 pb-2 border-b border-gray-200 font-bold text-green-700">Platform Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="platformSelect" className="block text-sm text-gray-700 mb-1">Select Platform</label>
                  <div className="flex space-x-2">
                    <select 
                      id="platformSelect" 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      value={selectedPlatform}
                      onChange={handlePlatformSelect}
                    >
                      <option value="">Choose a platform</option>
                      {platforms.map(platform => (
                        <option key={platform.id} value={platform.id}>
                          {platform.name} ({platform.type})
                        </option>
                      ))}
                    </select>
                    <button 
                      type="button"
                      onClick={() => router.push('/admin/add-account-platform')}
                      className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      title="Add New Platform"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="platformStatus" className="block text-sm text-gray-700 mb-1">Platform Status</label>
                  <select 
                    id="platformStatus" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    value={formData.platformStatus}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="apiEndpoint" className="block text-sm text-gray-700 mb-1">API Endpoint</label>
                  <input 
                    type="url" 
                    id="apiEndpoint" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900" 
                    placeholder="Enter API endpoint (e.g., https://graph.facebook.com/v18.0)"
                    value={formData.apiEndpoint}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="webhookURL" className="block text-sm text-gray-700 mb-1">Webhook URL</label>
                  <input 
                    type="url" 
                    id="webhookURL" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900" 
                    placeholder="Enter webhook URL for notifications"
                    value={formData.webhookURL}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 items-center">
              <Link 
                href="/" 
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-200 border-none"
              >
                Cancel
              </Link>
              <Link 
                href="/admin/view-account-platform" 
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200 border-none"
              >
                View All
              </Link>
              <button 
                type="submit" 
                className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-200"
              >
                Save Settings
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 flex items-center"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this account? This action cannot be undone.')) {
                    deleteAccount(selectedAccount);
                    setSelectedAccount('');
                    setFormData({
                      accountStatus: 'active',
                      accountEmail: '',
                      accountPhone: '',
                      platformStatus: 'active',
                      apiEndpoint: '',
                      webhookURL: '',
                    });
                    alert('Account deleted!');
                  }
                }}
                title="Delete Account"
                disabled={!selectedAccount}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                Delete Account
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}