import React from 'react';

export default function ModuleRequestForm() {
  return (
    <form
      action="https://formspree.io/f/mpwdgbwv"
      method="POST"
      className="bg-white rounded shadow p-4 text-black"
    >
      <div className="mb-2">
        <textarea
          name="description"
          placeholder="Describe the module or feature you need..."
          className="w-full border border-gray-300 rounded p-2"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-orange-500 text-black px-4 py-2 rounded hover:bg-orange-600 transition"
      >
        Submit Request
      </button>
    </form>
  );
}
