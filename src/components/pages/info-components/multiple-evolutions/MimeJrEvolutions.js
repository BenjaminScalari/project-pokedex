import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Definiamo le evoluzioni di Mime Jr. con Mr. Mime e Mr. Rime
const mimeJrEvolutions = [
  { name: "mr-mime", id: 122 }, // ID di Mr. Mime
  { name: "mr-rime", id: 866 }, // ID di Mr. Rime
];

const MimeJrEvolutions = () => {
  const [currentEvolutionIndex, setCurrentEvolutionIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentEvolutionIndex(
        (prevIndex) => (prevIndex + 1) % mimeJrEvolutions.length
      );
    }, 1000); // Cambia evoluzione ogni secondo

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  const currentEvolution = mimeJrEvolutions[currentEvolutionIndex];

  return (
    <React.Fragment>
      {/* Mostra Mr. Mime o Mr. Rime */}
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
            currentEvolution.name.slice(1).replace("-", " ")}
        </span>
      </Link>
    </React.Fragment>
  );
};

export default MimeJrEvolutions;

