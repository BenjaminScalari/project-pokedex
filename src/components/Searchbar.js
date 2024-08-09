// src/components/Searchbar.js
import React from "react";

function Searchbar() {
  return (
    <div className="relative w-1/3">
      <input
        type="text"
        placeholder="Cerca un Pokémon..."
        className="w-full px-4 py-2 pl-12 pr-20 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
      <span className="absolute inset-y-0 left-0 flex items-center pl-4">
        <svg
          className="w-5 h-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex items-center px-4 py-2 text-white bg-violet-500 rounded-full shadow-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default Searchbar;
