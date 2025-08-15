import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { auth } from '../firebase';

export default function UpgradePlan() {
  const categories = {
    'Core Packages': [
      {
        title: 'Plug and Play',
        price: '$250 flat-rate',
        features: ['Professional design and layout for services like WIX, GoDaddy, ect.'],
      },
      {
        title: 'Website Rebuild',
        price: '$350 flat-rate',
        features: ['Website refresh or rebuild']
      },
      {
        title: 'Standard Website',
        price: '$850 flat-rate',
        features: ['Home, About, Services, Contact pages'],
      },
      {
        title: 'E-Commerce Website',
        price: '$1100 flat-rate',
        features: ['Includes all Standard features', 'Online store & payment gateway', 'Basic inventory or vendor sync'],
      },
    ],
    'Premium Builds': [
      {
        title: '$2,000 Premium Build',
        desc: 'Advanced full-stack site with admin portal, dashboard, and tailored UX.',
      },
      {
        title: '$5,000 Agency Replacement',
        desc: 'Complete business system — CRM, client portals, APIs, and long-term scalability.',
      },
      {
        title: '$7,500 Enterprise Platform',
        desc: 'Large-scale tools: integrated admin, staff roles, automation, reports, and mobile support.',
      },
    ],
    'Add-Ons & Modules': [
      { title: 'Email Setup', desc: 'Professional business email setup: $25' },
      { title: 'Maintenance Plan', desc: '$50–$75/mo — updates, backups, and support' },
      { title: 'Form Generator', desc: 'Custom quote or intake forms — $100' },
      { title: 'Accounting Module', desc: 'Track expenses, invoices, generate reports — $150' },
      { title: 'Customer Dashboard', desc: 'Track jobs, quotes, tickets — $160' },
      { title: 'PDF Generator', desc: 'Branded PDFs (quotes, waivers, etc.) — $120' },
      { title: 'SEO Boost', desc: 'Structured metadata, sitemap, performance boost — $120' },
      { title: 'Image Optimizer', desc: 'Auto-compress and format images for faster load times - $90' },
      { title: 'Content Scheduler', desc: 'Plan and auto-publish blog or news updates - $115' },
      { title: 'Review Aggregator', desc: 'Pull Google/Facebook reviews into your site dynamically - $130' },
      { title: 'Blog Module', desc: 'SEO-friendly blog with categories, tags, and scheduling - $110' },
      { title: 'FAQ Manager', desc: 'Create and update interactive FAQ sections with search - $85' },
      { title: 'Multi-Language Support', desc: 'Translate and display content in multiple languages - $140' },
      { title: 'Appointment Booking', desc: 'Let clients schedule services online with reminders - $150' },
      { title: 'Social Media Feeds', desc: 'Auto-display Instagram, Facebook, or LinkedIn posts on your site - $95' },
      { title: 'Newsletter Signup', desc: 'Email marketing integration with Mailchimp, Constant Contact, etc. - $75' },
      { title: 'Event Calendar', desc: 'Public events page with RSVP and ticketing options - $135' },
      { title: 'Chat Widget Integration', desc: 'Live chat or chatbot embedded in your site - $100' },
      { title: 'Pop-Up Lead Capture', desc: 'Customizable pop-up forms for offers or mailing lists - $90' },
      { title: 'Simple eCommerce', desc: 'Basic product listing & checkout (up to 20 items) - $225' },
    ],
    'Advanced Tools': [
      { title: 'Dynamic Quote Builder', desc: 'Real-time pricing with branded output — $150' },
      { title: 'Staff Role Controls', desc: 'Define user roles & restricted access — $130' },
      { title: 'Job Ticketing System', desc: 'Service or task assignment system — $140' },
      { title: 'File Upload & Signing', desc: 'Clients upload docs or sign forms — $100' },
      { title: 'Multi-Location Support', desc: 'Manage branches or units separately — $175' },
      { title: 'Customer Rewards Tracker', desc: 'Loyalty points or discounts — $90' },
      { title: 'System Connector', desc: 'Automate workflows across tools — $120' },
      { title: 'Analytics Dashboard', desc: 'Visualized KPIs and usage metrics — $150' },
      { title: 'Onboarding Wizard', desc: 'Multi-step client intake — $110' },
      { title: 'AI Content Assistant', desc: 'AI-powered text generation for blog, social, or emails - $175' },
      { title: 'Membership Portal', desc: 'Member logins, subscription management, gated content - $200' },
      { title: 'Learning Management System (LMS)', desc: 'Host courses, quizzes, and track progress - $250' },
      { title: 'Inventory Management', desc: 'Track stock levels, supplier orders, and restocks - $200' },
      { title: 'Subscription Billing', desc: 'Automated recurring payments with invoicing - $180' },
      { title: 'Advanced eCommerce', desc: 'Product filters, upsells, and multi-currency checkout - $250' },
      { title: 'API Integration Hub', desc: 'Connect your site to third-party APIs and apps - $160' },
      { title: 'Workflow Automation', desc: 'Trigger actions based on form submissions or events - $150' },
      { title: 'Advanced CRM', desc: 'Lead scoring, sales pipeline tracking, and follow-up reminders - $210' },
      { title: 'Employee Scheduling', desc: 'Manage shifts, time-off requests, and availability - $180' },
      { title: 'Secure Document Portal', desc: 'Clients access protected documents online - $190' },
    ],
  };

  // Minimal, safe price display
  const money = (p) =>
    typeof p === 'number'
      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p)
      : String(p ?? '—');

  // Tiny helper to extract a dollar amount from strings like "$250 flat-rate" or "$50–$75/mo"
  const parsePrice = (p) => {
    if (typeof p === 'number') return p;
    if (typeof p === 'string') {
      const cleaned = p.replace(/,/g, '');
      const match = cleaned.match(/(\d+(\.\d+)?)/);
      return match ? Number(match[1]) : null;
    }
    return null;
  };

  const handleUpgrade = async (item) => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error('Not signed in');

      // Try to get a numeric amount for Checkout (fallback to null if not present)
      const amount = parsePrice(item.price);
      const payload = {
        items: [
          {
            // If your API expects Stripe price IDs, swap to `priceId` instead
            title: item.title,
            description: item.desc || item.features?.join(', '),
            amount,               // e.g., 250, 1100, etc. (server can convert to cents)
            currency: 'usd',
            quantity: 1,
          },
        ],
        email: auth.currentUser.email,
      };

      const response = await fetch('https://api.stephenscode.dev/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Checkout failed');
      }

      const { url } = await response.json();
      if (!url) throw new Error('No checkout URL returned');
      window.location.href = url;
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

                {/* ✅ FIXED: use item.price (not s.price) and no extra '$' */}
                {item.price && (
                  <p className="text-gray-600 mb-2">
                    {money(item.price)}
                  </p>
                )}

                {item.desc && <p className="text-gray-600 text-sm mb-2">{item.desc}</p>}
                {item.features && (
                  <ul className="text-gray-600 text-sm list-disc list-inside mb-2">
                    {item.features.map((feat, j) => <li key={j}>{feat}</li>)}
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
