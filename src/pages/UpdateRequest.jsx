import React from 'react';
import { motion } from 'framer-motion';
import UpdateRequestForm from '../components/UpdateRequestForm';
import { FaFileUpload, FaClock, FaCheckCircle } from 'react-icons/fa';

export default function UpdateRequest() {
  const infoCards = [
    {
      icon: FaFileUpload,
      title: 'Upload Files',
      description: 'Attach documents, images, or any files related to your update',
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      icon: FaClock,
      title: 'Quick Turnaround',
      description: 'Most updates are reviewed within 24 hours',
      gradient: 'from-amber-500 to-yellow-500'
    },
    {
      icon: FaCheckCircle,
      title: 'Track Progress',
      description: 'Monitor your request status in real-time from your dashboard',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
          Submit Update Request
        </h1>
        <p className="text-slate-300 text-lg">
          Need changes to your website? Submit your update request below and our team will get started right away.
        </p>
      </motion.div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {infoCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 p-6 border border-slate-600/30 backdrop-blur-sm overflow-hidden group hover:border-orange-500/50 transition-all duration-300"
          >
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '32px 32px'
              }} />
            </div>
            <div className="relative">
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${card.gradient} mb-4`}>
                <card.icon className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
              <p className="text-slate-400 text-sm">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-8 border border-slate-600/50 backdrop-blur-sm overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>
        <div className="relative">
          <UpdateRequestForm />
        </div>
      </motion.div>
    </div>
  );
}
