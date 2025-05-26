import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import CustomerLayout from './components/CustomerLayout';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import AccountSettings from './pages/AccountSettings';
import RequestModule from './pages/RequestModule';
import UpdateRequest from './pages/UpdateRequest';
import UpgradePlan from './pages/UpgradePlan';
import Analytics from './pages/Analytics';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Protected Routes with Sidebar */}
          <Route element={<PrivateRoute><CustomerLayout /></PrivateRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/submit-update" element={<UpdateRequest />} />
            <Route path="/request-module" element={<RequestModule />} />
            <Route path="/settings" element={<AccountSettings />} />
            <Route path="/upgrade-plan" element={<UpgradePlan />} />
            <Route path="/analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
