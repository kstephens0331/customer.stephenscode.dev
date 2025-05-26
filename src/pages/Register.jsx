import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

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
        createdAt: new Date().toISOString()
      });

      window.location.href = '/';
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded w-80">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} className="border p-2 w-full mb-2" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-2" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-2" required />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="border p-2 w-full mb-2" required />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} className="border p-2 w-full mb-2" required />
        <button type="submit" className="bg-green-500 text-white p-2 w-full rounded hover:bg-green-600">
          Register
        </button>
      </form>
    </div>
  );
}
