import React from 'react';
import AccountSettingsForm from '../components/AccountSettingsForm';

export default function AccountSettings() {
  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col">
      <header className="p-6 border-b border-gray-700 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Account Settings</h1>
      </header>

      <main className="flex-grow p-6">
        <AccountSettingsForm />
      </main>
    </div>
  );
}