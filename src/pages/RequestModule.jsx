import React from 'react';
import { motion } from 'framer-motion';
import ModuleRequestForm from '../components/ModuleRequestForm';
import { FaRocket, FaLightbulb, FaCode } from 'react-icons/fa';

export default function RequestModule() {
  const infoCards = [
    {
      icon: FaLightbulb,
      title: 'Custom Features',
      description: 'Request any custom functionality or feature for your website',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FaCode,
      title: 'Expert Development',
      description: 'Our team will build exactly what you need with clean, maintainable code',
      gradient: 'from-cyan-500 to-teal-500'
    },
    {
      icon: FaRocket,
      title: 'Fast Delivery',
      description: 'Get a quote within 48 hours and see your module live soon after approval',
      gradient: 'from-teal-500 to-blue-500'
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
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
          Request a New Module
        </h1>
        <p className="text-slate-300 text-lg">
          Need a custom feature or functionality? Tell us what you need and we'll build it for you.
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
            className="relative rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 p-6 border border-slate-600/30 backdrop-blur-sm overflow-hidden group hover:border-cyan-500/50 transition-all duration-300"
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
          <ModuleRequestForm />
        </div>
      </motion.div>
    </div>
  );
}