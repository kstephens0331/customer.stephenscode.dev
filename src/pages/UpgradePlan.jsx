import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { auth } from '../firebase';

export default function UpgradePlan() {
  const categories = {
    'Core Packages': [
      {
        title: 'Standard Website',
        price: 350.00,
        features: ['Home, About, Services, Contact pages', 'Admin back office & customer login', 'Responsive design'],
      },
      {
        title: 'E-Commerce Website',
        price: 450.00,
        features: ['Includes all Standard features', 'Online store & payment gateway', 'Basic inventory or vendor sync'],
      },
    ],
    'Premium Builds': [
      {
        title: '$5,000 Premium Build',
        price: 5000.00,
        desc: 'Advanced full-stack site with admin portal, dashboard, and tailored UX.',
      },
      {
        title: '$8,500 Agency Replacement',
        price: 8500.00,
        desc: 'Complete business system — CRM, client portals, APIs, and long-term scalability.',
      },
      {
        title: '$10,000 Enterprise Platform',
        price: 10000.00,
        desc: 'Large-scale tools: integrated admin, staff roles, automation, reports, and mobile support.',
      },
    ],
    'Add-Ons & Modules': [
      { title: 'Email Setup', price: 15.00, desc: 'Professional business email setup' },
      { title: 'Maintenance Plan', price: 50.00, desc: 'Updates, backups, and support' },
      { title: 'Form Generator', price: 75.00, desc: 'Custom quote or intake forms' },
      { title: 'Accounting Module', price: 120.00, desc: 'Track expenses, invoices, generate reports' },
      { title: 'Customer Dashboard', price: 125.00, desc: 'Track jobs, quotes, tickets' },
      { title: 'PDF Generator', price: 95.00, desc: 'Branded PDFs (quotes, waivers, etc.)' },
      { title: 'SEO Boost', price: 95.00, desc: 'Structured metadata, sitemap, performance boost' },
    ],
    'Advanced Tools': [
      { title: 'Dynamic Quote Builder', price: 150.00, desc: 'Real-time pricing with branded output' },
      { title: 'Staff Role Controls', price: 130.00, desc: 'Define user roles & restricted access' },
      { title: 'Job Ticketing System', price: 140.00, desc: 'Service or task assignment system' },
      { title: 'File Upload & Signing', price: 100.00, desc: 'Clients upload docs or sign forms' },
      { title: 'Multi-Location Support', price: 175.00, desc: 'Manage branches or units separately' },
      { title: 'Customer Rewards Tracker', price: 90.00, desc: 'Loyalty points or discounts' },
      { title: 'System Connector', price: 120.00, desc: 'Automate workflows across tools' },
      { title: 'Analytics Dashboard', price: 150.00, desc: 'Visualized KPIs and usage metrics' },
      { title: 'Onboarding Wizard', price: 110.00, desc: 'Multi-step client intake' },
    ],
  };

  const handleUpgrade = async (item) => {
    try {
      const uid = auth.currentUser.uid;
      const response = await fetch("https://api.stephenscode.dev/create-checkout-session", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              price: item.price,
              title: item.title,
              description: item.desc || item.features?.join(', '),
              quantity: 1
            }
          ],
          email: auth.currentUser.email // Use the logged-in customer’s email
        }),
      });

      const { url } = await response.json();
      window.location.href = url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 pt-24">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Upgrade Your Plan</h1>
      {Object.keys(categories).map((group, i) => (
        <div key={i} className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-orange-500">{group}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories[group].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white shadow rounded p-4 flex flex-col justify-between"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx, duration: 0.5 }}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
                {item.price && <p className="text-gray-600 mb-2">${item.price.toFixed(2)}</p>}
                {item.desc && <p className="text-gray-600 text-sm mb-2">{item.desc}</p>}
                {item.features && (
                  <ul className="text-gray-600 text-sm list-disc list-inside mb-2">
                    {item.features.map((feat, i) => <li key={i}>{feat}</li>)}
                  </ul>
                )}
                <button
                  onClick={() => handleUpgrade(item)}
                  className="mt-auto bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
                >
                  Upgrade
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
