import React from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Login() {
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = '/';
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google sign-in success:', result.user);

      const userId = result.user.uid;
      const userDocRef = doc(db, 'customers', userId);
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) {
        await setDoc(userDocRef, {
          email: result.user.email,
          fullName: result.user.displayName || '',
          phone: '',
          address: '',
          createdAt: new Date().toISOString()
        });
      }

      window.location.href = '/';
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow rounded w-80">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input type="email" name="email" placeholder="Email" className="border p-2 w-full mb-2" required />
        <input type="password" name="password" placeholder="Password" className="border p-2 w-full mb-2" required />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600">
          Login
        </button>
        <hr className="my-4" />
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="bg-red-500 text-white p-2 w-full rounded hover:bg-red-600"
        >
          Sign in with Google
        </button>
        <p className="text-center mt-4 text-sm text-gray-500">
          Don&apos;t have an account? <a href="/register" className="text-blue-500 underline">Register here</a>
        </p>
      </form>
    </div>
  );
}
