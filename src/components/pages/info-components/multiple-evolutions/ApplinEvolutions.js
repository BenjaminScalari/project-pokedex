import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const applinEvolutions = [
  { name: "flapple", id: 841 }, // ID di Flapple
  { name: "appletun", id: 842 }, // ID di Appletun
];

const ApplinEvolutions = () => {
  const [currentEvolutionIndex, setCurrentEvolutionIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentEvolutionIndex(
        (prevIndex) => (prevIndex + 1) % applinEvolutions.length
      );
    }, 1000); // Cambia evoluzione ogni secondo

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  const currentEvolution = applinEvolutions[currentEvolutionIndex];

  return (
    <div className="flex items-center">
      {/* Evoluzione che cambia */}
      <Link
        to={`/pokemon/${currentEvolution.name}`}
        className="flex flex-col items-center md:mx-4 lg:mx-12"
      >
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentEvolution.id}.png`}
          alt={currentEvolution.name}
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-28 md:h-32 lg:w-32 lg:h-32"
        />
        <span className="text-white mt-2 capitalize md:text-sm sm:text-xs">
          {currentEvolution.name.charAt(0).toUpperCase() +
            currentEvolution.name.slice(1)}
        </span>
      </Link>
    </div>
  );
};

export default ApplinEvolutions;
