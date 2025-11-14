import React from 'react';
import { motion } from 'framer-motion';
import AccountSettingsForm from '../components/AccountSettingsForm';
import { FaUserCog, FaShieldAlt, FaUserCircle } from 'react-icons/fa';

export default function AccountSettings() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
          Account Settings
        </h1>
        <p className="text-slate-300 text-lg">
          Manage your profile information and security settings
        </p>
      </motion.div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 p-6 border border-slate-600/30 backdrop-blur-sm overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }} />
          </div>
          <div className="relative">
            <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
              <FaUserCircle className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Profile Info</h3>
            <p className="text-slate-400 text-sm">Update your personal and company details</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 p-6 border border-slate-600/30 backdrop-blur-sm overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }} />
          </div>
          <div className="relative">
            <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-pink-500 to-red-500 mb-4">
              <FaShieldAlt className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Security</h3>
            <p className="text-slate-400 text-sm">Change your password to keep your account secure</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 p-6 border border-slate-600/30 backdrop-blur-sm overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }} />
          </div>
          <div className="relative">
            <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-red-500 to-purple-500 mb-4">
              <FaUserCog className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Preferences</h3>
            <p className="text-slate-400 text-sm">Customize your account preferences</p>
          </div>
        </motion.div>
      </div>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <AccountSettingsForm />
      </motion.div>
    </div>
  );
}