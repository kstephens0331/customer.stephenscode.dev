import React from 'react';

export default function UpdateRequestForm() {
  return (
    <form
      action="https://formspree.io/f/mzzrlozo"
      method="POST"
      encType="multipart/form-data"
      className="bg-white rounded shadow p-4 text-black"
    >
      <div className="mb-2">
        <input
          type="file"
          name="file"
          className="w-full border border-gray-300 rounded p-2"
          required
        />
      </div>
      <div className="mb-2">
        <textarea
          name="note"
          placeholder="Notes about the update..."
          className="w-full border border-gray-300 rounded p-2"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-orange-500 text-black px-4 py-2 rounded hover:bg-orange-600 transition"
      >
        Submit Update
      </button>
    </form>
  );
}
