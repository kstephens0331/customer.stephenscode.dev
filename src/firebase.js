import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**
 * Multi-Project Firebase Configuration
 *
 * StephensCode uses 2 Firebase projects for the customer portal:
 * 1. customer-stephenscode - Customer data and authentication
 * 2. stephenscode-12f75 - Orders database
 */

// Project 1: Customer Database (customer-stephenscode)
const customerConfig = {
  apiKey: "AIzaSyCN8KHXDHnXglsiCnGox40G_fQZGxFJbdw",
  authDomain: "customer-stephenscode.firebaseapp.com",
  projectId: "customer-stephenscode",
  storageBucket: "customer-stephenscode.firebasestorage.app",
  messagingSenderId: "1004875053671",
  appId: "1:1004875053671:web:67079df56e91e5dc7572c2"
};

// Project 2: Orders Database (stephenscode-12f75)
const ordersConfig = {
  apiKey: "AIzaSyCfeUf56zdhPtsV0QkVqjd_WBP5OuFLQBA",
  authDomain: "stephenscode-12f75.firebaseapp.com",
  projectId: "stephenscode-12f75",
  storageBucket: "stephenscode-12f75.firebasestorage.app",
  messagingSenderId: "960805602405",
  appId: "1:960805602405:web:6d5fa556d89ca2ccabb28c"
};

// Initialize Firebase apps
const app =
  getApps().find((a) => a.name === "[DEFAULT]") ||
  initializeApp(customerConfig);

const ordersApp =
  getApps().find((a) => a.name === "orders") ||
  initializeApp(ordersConfig, "orders");

// Get services
const auth = getAuth(app);
const db = getFirestore(app); // Customer database
const ordersDb = getFirestore(ordersApp); // Orders database
const storage = getStorage(app);

export { app, auth, db, ordersDb, storage };