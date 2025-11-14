import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaCode } from 'react-icons/fa';

export default function Register() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
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
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const userId = userCredential.user.uid;

      await setDoc(doc(db, 'customers', userId), {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        createdAt: Timestamp.now(),
        status: 'active',
        referralCredits: 0,
        googleAnalyticsId: '',
        updatedAt: Timestamp.now()
      });

      window.location.href = '/';
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

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
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 mb-4"
          >
            <FaCode className="text-white text-4xl" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-slate-400">Join StephensCode and start building amazing websites</p>
        </div>

        {/* Registration Form */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-8 border border-slate-600/50 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }} />
          </div>

          <form onSubmit={handleSubmit} className="relative space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="text-slate-500" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    onChange={handleChange}
                    className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-slate-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    onChange={handleChange}
                    className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-slate-500" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create a strong password"
                    onChange={handleChange}
                    className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                    required
                  />
                </div>
                <p className="text-slate-500 text-xs mt-1">Must be at least 6 characters long</p>
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
                    className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
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
                    className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-900/30 border border-slate-600/30 rounded-xl p-4">
              <p className="text-slate-300 text-sm">
                By creating an account, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-3 px-6 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg shadow-emerald-500/25"
            >
              Create Account
            </motion.button>
          </form>
        </div>

        {/* Login Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6 text-slate-400"
        >
          Already have an account?{' '}
          <a href="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
            Sign in here
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}
