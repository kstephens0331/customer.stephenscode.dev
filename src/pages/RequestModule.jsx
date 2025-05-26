import React from 'react';
import ModuleRequestForm from '../components/ModuleRequestForm';

export default function RequestModule() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Request a New Module</h1>
      <ModuleRequestForm />
    </div>
  );
}