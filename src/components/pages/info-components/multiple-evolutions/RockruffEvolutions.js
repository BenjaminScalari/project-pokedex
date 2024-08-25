import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Array contenente le tre forme di Lycanroc con i rispettivi ID
const lycanrocForms = [
  { name: "lycanroc-midday", id: 745 }, // Forma Midday
  { name: "lycanroc-dusk", id: 10152 }, // Forma Dusk
  { name: "lycanroc-midnight", id: 10126 }, // Forma Midnight
];

const RockruffEvolutions = () => {
  const [currentFormIndex, setCurrentFormIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentFormIndex(
        (prevIndex) => (prevIndex + 1) % lycanrocForms.length
      );
    }, 1000); // Cambia forma ogni secondo

    return () => clearInterval(intervalId); // Cleanup interval quando il componente viene smontato
  }, []);

  const currentForm = lycanrocForms[currentFormIndex];

  return (
    <div className="flex items-center">
      <Link
        to={`/pokemon/745`} // Link fisso a Lycanroc con ID 745
        className="flex flex-col items-center md:mx-4 lg:mx-12"
      >
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentForm.id}.png`}
          alt={currentForm.name}
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-28 md:h-32 lg:w-32 lg:h-32"
        />
        <span className="text-white mt-2 capitalize md:text-sm sm:text-xs">
          Lycanroc
        </span>
      </Link>
    </div>
  );
};

export default RockruffEvolutions;
