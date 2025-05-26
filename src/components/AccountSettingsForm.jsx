import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

export default function AccountSettingsForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    address: '',
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = auth.currentUser.uid;
      const docRef = doc(db, 'customers', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setForm({
          name: data.fullName || '',
          email: data.email || '',
          company: data.company || '',
          phone: data.phone || '',
          address: data.address || '',
        });
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = auth.currentUser.uid;

    try {
      // Update profile in Firestore
      const docRef = doc(db, 'customers', userId);
      await updateDoc(docRef, {
        fullName: form.name,
        email: form.email,
        company: form.company,
        phone: form.phone,
        address: form.address,
      });

      // If password change requested
      if (currentPassword && newPassword && confirmNewPassword) {
        if (newPassword !== confirmNewPassword) {
          alert('New passwords do not match.');
          return;
        }

        // Re-authenticate before changing password
        const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
        await reauthenticateWithCredential(auth.currentUser, credential);

        // Update password
        await updatePassword(auth.currentUser, newPassword);
        alert('Profile and password updated!');
      } else {
        alert('Profile updated!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded shadow p-6 text-black max-w-lg mx-auto"
    >
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Full Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
          placeholder="Your full name"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
          placeholder="you@example.com"
          disabled
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Company Name</label>
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
          placeholder="Your company"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
          placeholder="(123) 456-7890"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Address</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
          placeholder="Your address"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Current Password (to change password)</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          placeholder="Current password"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          placeholder="New password"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Confirm New Password</label>
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          placeholder="Confirm new password"
        />
      </div>

      <button
        type="submit"
        className="bg-orange-500 text-black px-4 py-2 rounded hover:bg-orange-600 transition w-full"
      >
        Update Settings
      </button>
    </form>
  );
}
