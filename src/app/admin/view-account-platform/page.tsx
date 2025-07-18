'use client';

import React from 'react';
import Link from 'next/link';
import { usePlatform } from '../../context/PlatformContext';

export default function ViewAccountPlatform() {
  const { accounts, platforms } = usePlatform();

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl text-gray-900">View Accounts & Platforms</h1>
          <p className="text-gray-600 mt-2">View all your registered accounts and platforms</p>
        </header>

        {/* Main Content */}
        <main className="bg-gray-50 p-6 rounded-lg shadow-sm">
          {/* Accounts Section */}
          <div className="mb-8">
            <h3 className="text-lg mb-4 pb-2 border-b border-gray-200">Accounts</h3>
            
            {accounts.length === 0 ? (
              <div className="text-gray-500 py-4">No accounts added yet. Add an account from the Add Account & Platform page.</div>
            ) : (
              <div className="grid gap-4">
                {accounts.map(account => (
                  <div key={account.id} className="bg-white p-4 rounded-md border border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-gray-900">{account.name}</h4>
                        <p className="text-sm text-gray-500">Type: {account.type}</p>
                      </div>
                      <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Platforms Section */}
          <div className="mb-8">
            <h3 className="text-lg mb-4 pb-2 border-b border-gray-200">Platforms</h3>
            
            {platforms.length === 0 ? (
              <div className="text-gray-500 py-4">No platforms added yet. Add a platform from the Add Account & Platform page.</div>
            ) : (
              <div className="grid gap-4">
                {platforms.map(platform => (
                  <div key={platform.id} className="bg-white p-4 rounded-md border border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-gray-900">{platform.name}</h4>
                        <p className="text-sm text-gray-500">Type: {platform.type}</p>
                        <p className="text-sm text-gray-500">URL: {platform.url}</p>
                      </div>
                      <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Link href="/" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Back to Home
            </Link>
            <Link 
              href="/admin/set-account-platform" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Configure Accounts & Platforms
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}