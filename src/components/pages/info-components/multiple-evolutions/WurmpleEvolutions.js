import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

// Definiamo le evoluzioni di Wurmple: Silcoon/Cascoon e Beautifly/Dustox
const wurmpleEvolutions = [
  { name: "silcoon", id: 266 }, // ID di Silcoon
  { name: "cascoon", id: 268 }, // ID di Cascoon
  { name: "beautifly", id: 267 }, // ID di Beautifly
  { name: "dustox", id: 269 }, // ID di Dustox
];

const WurmpleEvolutions = () => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Alterna tra la fase di Silcoon/Cascoon e la fase di Beautifly/Dustox
      setCurrentStageIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 1000); // Cambia evoluzione ogni secondo

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  // Determina l'evoluzione corrente
  const isFirstPhase = currentStageIndex === 0;
  const firstPhase = isFirstPhase ? wurmpleEvolutions[0] : wurmpleEvolutions[1];
  const secondPhase = isFirstPhase
    ? wurmpleEvolutions[2]
    : wurmpleEvolutions[3];

  return (
    <div className="flex items-center">
      {/* Prima fase dell'evoluzione: Silcoon o Cascoon */}
      <Link
        to={`/pokemon/${firstPhase.name}`}
        className="flex flex-col items-center md:mx-4 lg:mx-12"
      >
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${firstPhase.id}.png`}
          alt={firstPhase.name}
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-28 md:h-32 lg:w-32 lg:h-32"
        />
        <span className="text-white mt-2 capitalize md:text-sm sm:text-xs">
          {firstPhase.name.charAt(0).toUpperCase() + firstPhase.name.slice(1)}
        </span>
      </Link>

      {/* Freccia che indica l'evoluzione */}
      <div className="flex items-center mx-2">
        <FaArrowRight className="w-4 h-4 md:w-5 md:h-5 sm:w-4 sm:h-4 text-white" />
      </div>

      {/* Seconda fase dell'evoluzione: Beautifly o Dustox */}
      <Link
        to={`/pokemon/${secondPhase.name}`}
        className="flex flex-col items-center md:mx-4 lg:mx-12"
      >
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${secondPhase.id}.png`}
          alt={secondPhase.name}
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-28 md:h-32 lg:w-32 lg:h-32"
        />
        <span className="text-white mt-2 capitalize md:text-sm sm:text-xs">
          {secondPhase.name.charAt(0).toUpperCase() + secondPhase.name.slice(1)}
        </span>
      </Link>
    </div>
  );
};

export default WurmpleEvolutions;
