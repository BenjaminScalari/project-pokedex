import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const eeveeEvolutions = [
  { name: "vaporeon", id: 134 },
  { name: "jolteon", id: 135 },
  { name: "flareon", id: 136 },
  { name: "espeon", id: 196 },
  { name: "umbreon", id: 197 },
  { name: "leafeon", id: 470 },
  { name: "glaceon", id: 471 },
  { name: "sylveon", id: 700 },
];

const EeveeEvolutions = ({ typeColors }) => {
  const [currentEvolutionIndex, setCurrentEvolutionIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentEvolutionIndex(
        (prevIndex) => (prevIndex + 1) % eeveeEvolutions.length
      );
    }, 1000); // Cambia evoluzione ogni secondo

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  const currentEvolution = eeveeEvolutions[currentEvolutionIndex];

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default EeveeEvolutions; // Updated to match the import
