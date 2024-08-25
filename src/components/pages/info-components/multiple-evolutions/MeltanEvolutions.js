import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

// Componente per visualizzare la linea evolutiva di Meltan a Melmetal
const MeltanEvolutions = () => {
  // Informazioni sull'evoluzione
  const evolutions = [
    { name: "meltan", id: 808 },
    { name: "melmetal", id: 809 },
  ];

  return (
    <div className="flex items-center justify-center mt-4">
      {evolutions.map((species, index) => (
        <React.Fragment key={species.name}>
          <Link
            to={`/pokemon/${species.id}`}
            className="flex flex-col items-center md:mx-4 lg:mx-12"
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${species.id}.png`}
              alt={species.name}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-28 md:h-32 lg:w-32 lg:h-32"
            />
            <span className="text-white mt-2 capitalize md:text-sm sm:text-xs">
              {species.name.charAt(0).toUpperCase() + species.name.slice(1)}
            </span>
          </Link>
          {index < evolutions.length - 1 && (
            <div className="flex items-center mx-2">
              <FaArrowRight className="w-4 h-4 md:w-5 md:h-5 sm:w-4 sm:h-4 text-white" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MeltanEvolutions;
