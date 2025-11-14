import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { FaUser, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaRocket } from 'react-icons/fa';

export default function Onboarding() {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = auth.currentUser.uid;
    const userRef = doc(db, 'customers', userId);

    await setDoc(userRef, {
      fullName: form.fullName,
      phone: form.phone,
      address: form.address,
      email: auth.currentUser.email
    });

    // Redirect to Dashboard
    window.location.href = '/';
  };

  const features = [
    {
      icon: FaCheckCircle,
      title: 'Premium Support',
      description: 'Get dedicated support from our expert team'
    },
    {
      icon: FaRocket,
      title: 'Fast Delivery',
      description: 'Quick turnaround on all your requests'
    },
    {
      icon: FaUser,
      title: 'Personal Dashboard',
      description: 'Track all your projects in one place'
    }
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-4xl"
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome to StephensCode!
            </h1>
            <p className="text-slate-300 text-lg mb-2">Let's complete your profile to get started</p>
            <p className="text-slate-400 text-sm">Just a few more details and you'll be all set</p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Features */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">What You'll Get</h2>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 p-6 border border-slate-600/30 backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                  }} />
                </div>
                <div className="relative flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
                    <feature.icon className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                    <p className="text-slate-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-2">
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

              <form onSubmit={handleSubmit} className="relative space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Complete Your Profile</h2>
                  <p className="text-slate-400 text-sm mb-6">
                    This information helps us provide you with better service
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaUser className="text-slate-500" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaPhone className="text-slate-500" />
                    </div>
                    <input
                      type="text"
                      name="phone"
                      placeholder="(123) 456-7890"
                      onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="text-slate-500" />
                    </div>
                    <input
                      type="text"
                      name="address"
                      placeholder="123 Main St, City, State"
                      onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="bg-slate-900/30 border border-slate-600/30 rounded-xl p-4">
                  <p className="text-slate-300 text-sm">
                    Your information is secure and will only be used to provide you with our services.
                  </p>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
                >
                  <FaRocket />
                  Complete Profile & Get Started
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
