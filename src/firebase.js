import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCN8KHXDHnXglsiCnGox40G_fQZGxFJbdw",
  authDomain: "customer-stephenscode.firebaseapp.com",
  projectId: "customer-stephenscode",
  storageBucket: "customer-stephenscode.firebasestorage.app",
  messagingSenderId: "1004875053671",
  appId: "1:1004875053671:web:67079df56e91e5dc7572c2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };