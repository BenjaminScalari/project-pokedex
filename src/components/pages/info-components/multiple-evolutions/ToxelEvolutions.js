import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const toxtricityForms = [
  { name: "toxtricity", id: 849 }, // ID di Toxtricity (forma base)
  { name: "toxtricity-gmax", id: 10184 }, // ID di Toxtricity G-Max (forma speciale, se presente)
];

const ToxelEvolutions = () => {
  const [currentFormIndex, setCurrentFormIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentFormIndex(
        (prevIndex) => (prevIndex + 1) % toxtricityForms.length
      );
    }, 1000); // Cambia forma ogni secondo

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  const currentForm = toxtricityForms[currentFormIndex];

  return (
    <div className="flex items-center">
      {/* Forma che cambia */}
      <Link
        to="/pokemon/849"
        className="flex flex-col items-center md:mx-4 lg:mx-12"
      >
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentForm.id}.png`}
          alt={currentForm.name}
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-28 md:h-32 lg:w-32 lg:h-32"
        />
        <span className="text-white mt-2 capitalize md:text-sm sm:text-xs">
          {currentForm.name.charAt(0).toUpperCase() +
            currentForm.name.slice(1).replace("-gmax", "")}
        </span>
      </Link>
    </div>
  );
};

export default ToxelEvolutions;
