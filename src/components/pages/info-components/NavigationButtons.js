import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaArrowCircleLeft } from "react-icons/fa";

const NavigationButtons = ({
  prevPokemonIcon,
  nextPokemonIcon,
  previousId,
  nextId,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Bottone Freccia per Tornare alla Pagina Precedente */}
      <button
        onClick={() => navigate(-1)} // Torna alla pagina precedente
        className="absolute top-4 left-4 text-white text-2xl z-25"
        aria-label="Torna alla pagina precedente"
      >
        <FaArrowLeft className="w-6 h-6" />
      </button>

      {/* Bottone Freccia Sinistra */}
      <button
        onClick={() => navigate(`/pokemon/${previousId}`)}
        className="flex flex-col-reverse items-center fixed top-1/2 left-0 transform -translate-y-1/2 text-white text-2xl z-40"
        aria-label="Pokemon precedente"
        disabled={previousId === null}
      >
        <FaArrowLeft className="w-6 h-6" />
        {previousId && (
          <img
            src={prevPokemonIcon}
            alt={`Icona Pokémon ${previousId}`}
            className="w-20 h-20 mt-2 mx-auto"
          />
        )}
      </button>

      {/* Bottone Freccia Destra */}
      <button
        onClick={() => navigate(`/pokemon/${nextId}`)}
        className="flex flex-col-reverse items-center fixed top-1/2 right-0 transform -translate-y-1/2 text-white text-2xl z-40"
        aria-label="Pokemon successivo"
        disabled={nextId === null}
      >
        <FaArrowRight className="w-6 h-6" />
        {nextId && (
          <img
            src={nextPokemonIcon}
            alt={`Icona Pokémon ${nextId}`}
            className="w-20 h-20 mt-2 mx-auto"
          />
        )}
      </button>
    </>
  );
};

export default NavigationButtons;
