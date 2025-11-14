import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { auth, db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function ModuleRequestForm() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        alert('You must be logged in to submit a request');
        setLoading(false);
        return;
      }

      // Create document in Firestore
      await addDoc(collection(db, 'moduleRequests'), {
        customerId: userId,
        customerEmail: auth.currentUser.email,
        description: description,
        status: 'pending',
        quoteAmount: null,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      alert('Module request submitted successfully! We\'ll review it and provide a quote within 48 hours.');
      setDescription('');
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error submitting request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Module Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the module or feature you need in detail...&#10;&#10;Examples:&#10;• E-commerce shopping cart with payment integration&#10;• User authentication system with social login&#10;• Real-time chat feature&#10;• Custom dashboard with analytics&#10;&#10;Be as specific as possible about functionality, design, and any integrations needed."
          rows="10"
          className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none"
          required
        ></textarea>
        <p className="text-slate-500 text-xs mt-2">
          The more detail you provide, the more accurate our quote will be
        </p>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <FaSpinner className="text-xl animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <FaPaperPlane className="text-xl" />
            Submit Module Request
          </>
        )}
      </motion.button>

      <div className="bg-slate-900/50 border border-slate-600/30 rounded-xl p-4">
        <p className="text-slate-300 text-sm font-semibold mb-2">What happens next?</p>
        <ul className="text-slate-400 text-sm space-y-1">
          <li>• We'll review your request within 48 hours</li>
          <li>• You'll receive a detailed quote and timeline</li>
          <li>• Upon approval, development begins immediately</li>
          <li>• Track progress in real-time from your dashboard</li>
        </ul>
      </div>
    </form>
  );
}
