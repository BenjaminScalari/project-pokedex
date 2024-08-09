import React from "react";

const DexFilters = ({ selectedFilter, onFilterChange, onReset }) => {
  return (
    <div className="flex flex-col items-center mt-4 mb-4">
      <div className="bg-gray-800 p-4 mt-4 rounded-lg shadow-lg text-white">
        <h2 className="text-lg font-bold mb-2">Ordina per:</h2>
        <div className="grid grid-cols-3 gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="filter"
              value="lightest"
              checked={selectedFilter === "lightest"}
              onChange={(e) => onFilterChange(e.target.value)}
              className="mr-2"
            />
            Dal più leggero
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="filter"
              value="shortest"
              checked={selectedFilter === "shortest"}
              onChange={(e) => onFilterChange(e.target.value)}
              className="mr-2"
            />
            Dal più basso
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="filter"
              value="az"
              checked={selectedFilter === "az"}
              onChange={(e) => onFilterChange(e.target.value)}
              className="mr-2"
            />
            A-Z
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="filter"
              value="heaviest"
              checked={selectedFilter === "heaviest"}
              onChange={(e) => onFilterChange(e.target.value)}
              className="mr-2"
            />
            Dal più pesante
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="filter"
              value="tallest"
              checked={selectedFilter === "tallest"}
              onChange={(e) => onFilterChange(e.target.value)}
              className="mr-2"
            />
            Dal più alto
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="filter"
              value="za"
              checked={selectedFilter === "za"}
              onChange={(e) => onFilterChange(e.target.value)}
              className="mr-2"
            />
            Z-A
          </label>
        </div>
      </div>
      <button
        onClick={onReset}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
      >
        Reset
      </button>
    </div>
  );
};

export default DexFilters;
