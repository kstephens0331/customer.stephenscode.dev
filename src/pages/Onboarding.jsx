import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

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

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded w-80">
        <h1 className="text-2xl font-bold mb-4">Complete Your Profile</h1>
        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} className="border p-2 w-full mb-2" />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="border p-2 w-full mb-2" />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} className="border p-2 w-full mb-2" />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600">
          Save Profile
        </button>
      </form>
    </div>
  );
}
