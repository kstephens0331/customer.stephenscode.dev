import React from 'react';
import { auth } from '../firebase'; // Make sure this path matches your setup
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error(error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <div className="absolute bottom-4 left-4">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}