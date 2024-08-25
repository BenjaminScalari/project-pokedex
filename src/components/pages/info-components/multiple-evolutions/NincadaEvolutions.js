import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const nincadaEvolutions = [
  { name: "ninjask", id: 291 }, // ID di Ninjask
  { name: "shedinja", id: 292 }, // ID di Shedinja
];

const NincadaEvolutions = () => {
  return (
    <React.Fragment>
      {/* Nincada */}
      <Link
        to={`/pokemon/nincada`}
        className="flex flex-col items-center md:mx-4 lg:mx-12"
      >
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/290.png`} // ID di Nincada
          alt="nincada"
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-28 md:h-32 lg:w-32 lg:h-32"
        />
        <span className="text-white mt-2 capitalize md:text-sm sm:text-xs">
          Nincada
        </span>
      </Link>

      {/* Frecce e Evoluzioni */}
      <div className="flex flex-col items-center mt-4">
        <div className="flex items-center mb-2">
          {/* Freccia sopra */}
          <FaArrowRight className="w-4 h-4 md:w-5 md:h-5 sm:w-4 sm:h-4 text-white" />
          {/* Ninjask */}
          <Link
            to={`/pokemon/${nincadaEvolutions[0].name}`}
            className="flex flex-col items-center mx-4"
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nincadaEvolutions[0].id}.png`}
              alt={nincadaEvolutions[0].name}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-28 md:h-32 lg:w-32 lg:h-32"
            />
            <span className="text-white mt-2 capitalize md:text-sm sm:text-xs">
              {nincadaEvolutions[0].name.charAt(0).toUpperCase() +
                nincadaEvolutions[0].name.slice(1)}
            </span>
          </Link>
        </div>
        <div className="flex items-center mt-2">
          {/* Freccia sotto */}
          <FaArrowRight className="w-4 h-4 md:w-5 md:h-5 sm:w-4 sm:h-4 text-white" />
          {/* Shedinja */}
          <Link
            to={`/pokemon/${nincadaEvolutions[1].name}`}
            className="flex flex-col items-center mx-4"
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nincadaEvolutions[1].id}.png`}
              alt={nincadaEvolutions[1].name}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-28 md:h-32 lg:w-32 lg:h-32"
            />
            <span className="text-white mt-2 capitalize md:text-sm sm:text-xs">
              {nincadaEvolutions[1].name.charAt(0).toUpperCase() +
                nincadaEvolutions[1].name.slice(1)}
            </span>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NincadaEvolutions;
