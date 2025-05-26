import React, { useEffect, useState, useContext } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthProvider';
import UpdateRequestForm from '../components/UpdateRequestForm';
import ModuleRequestForm from '../components/ModuleRequestForm';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user) {
      console.log('No user from context yet.');
      return;
    }

    const fetchProfile = async () => {
      const docRef = doc(db, 'customers', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        console.log('No profile found.');
      }
    };

    fetchProfile();
  }, [user]);

  if (!profile) return <div className="text-center text-white mt-10">Loading...</div>;

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col">
      <header className="p-6 border-b border-gray-700 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Customer Dashboard</h1>
        <div>
          <span className="text-sm text-gray-400">{profile.fullName || profile.email}</span>
        </div>
      </header>

      <main className="flex-grow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-gray-800 rounded shadow p-4 text-white">
          <h2 className="text-xl font-semibold mb-2 text-orange-400">Profile</h2>
          <p><strong>Name:</strong> {profile.fullName || 'N/A'}</p>
          <p><strong>Email:</strong> {profile.email || 'N/A'}</p>
          <p><strong>Phone:</strong> {profile.phone || 'N/A'}</p>
          <p><strong>Address:</strong> {profile.address || 'N/A'}</p>
        </div>

        {/* Upgrade Plan Card */}
        <div className="bg-gray-800 rounded shadow p-4 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-orange-400">Upgrade Your Plan</h2>
            <p className="text-sm text-gray-300">Enhance your features and unlock more benefits.</p>
          </div>
          <Link
            to="/upgrade-plan"
            className="mt-4 bg-orange-500 text-center text-black py-2 rounded hover:bg-orange-600"
          >
            Go to Upgrade Page
          </Link>
        </div>

        {/* Submit Update Request */}
        <div className="bg-gray-800 rounded shadow p-4 md:col-span-2 text-white">
          <h2 className="text-xl font-semibold mb-2 text-orange-400">Submit Update Request</h2>
          <UpdateRequestForm />
        </div>

        {/* Request New Module */}
        <div className="bg-gray-800 rounded shadow p-4 md:col-span-2 text-white">
          <h2 className="text-xl font-semibold mb-2 text-orange-400">Request a New Module</h2>
          <ModuleRequestForm />
        </div>
      </main>

      <footer className="p-4 text-center text-gray-500 text-xs border-t border-gray-700">
        &copy; 2025 StephensCode
      </footer>
    </div>
  );
}
