import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCloudUploadAlt, FaSpinner } from 'react-icons/fa';
import { auth, db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function UpdateRequestForm() {
  const [note, setNote] = useState('');
  const [file, setFile] = useState(null);
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

      let fileUrl = null;
      let fileName = null;

      // Upload file to Firebase Storage if provided
      if (file) {
        const storageRef = ref(storage, `updateRequests/${userId}/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        fileUrl = await getDownloadURL(snapshot.ref);
        fileName = file.name;
      }

      // Create document in Firestore
      await addDoc(collection(db, 'updateRequests'), {
        customerId: userId,
        customerEmail: auth.currentUser.email,
        note: note,
        fileUrl: fileUrl,
        fileName: fileName,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      alert('Update request submitted successfully!');
      setNote('');
      setFile(null);
      e.target.reset();
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
          Upload Files
        </label>
        <div className="relative">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-orange-500 file:to-amber-500 file:text-white file:font-semibold file:cursor-pointer hover:file:from-orange-600 hover:file:to-amber-600"
          />
        </div>
        <p className="text-slate-500 text-xs mt-2">
          Accepted formats: images, documents, PDFs, etc. (Optional)
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Update Details
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Describe the changes you need... Be as specific as possible to help us understand your requirements."
          rows="6"
          className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all resize-none"
          required
        ></textarea>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 px-6 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <FaSpinner className="text-xl animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <FaCloudUploadAlt className="text-xl" />
            Submit Update Request
          </>
        )}
      </motion.button>

      <p className="text-slate-400 text-sm text-center">
        We'll review your request and get back to you within 24 hours
      </p>
    </form>
  );
}
