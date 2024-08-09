import React from "react";
import { useNavigate } from "react-router-dom";
import {
  TYPE_COLORS,
  TYPE_TRANSLATIONS,
} from "../components/utilities/TypeColors";

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  if (!pokemon || !pokemon.types) {
    return null; // Non renderizzare nulla se pokemon o pokemon.types sono undefined
  }

  const typeColors = pokemon.types.map((type) => TYPE_COLORS[type.type.name]);
  const typeTranslations = pokemon.types.map(
    (type) => TYPE_TRANSLATIONS[type.type.name]
  );

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border-2 rounded-lg flex flex-col items-center relative overflow-hidden transform transition-transform duration-300 hover:scale-110"
      style={{
        borderColor: typeColors[0],
        background:
          pokemon.types.length === 1
            ? `${typeColors[0]}20`
            : `linear-gradient(135deg, ${typeColors[0]}20 50%, ${typeColors[1]}20 50%)`,
      }}
    >
      <span className="absolute top-2 left-2 text-white font-bold text-sm">
        #{pokemon.id.toString().padStart(3, "0")}
      </span>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-24 h-24"
      />
      <h2 className="text-lg font-semibold text-white">
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </h2>
      <div className="flex w-full">
        {typeTranslations.map((typeName, index) => (
          <span
            key={pokemon.types[index].type.name}
            className={`${
              pokemon.types.length === 1 ? "w-full" : "w-1/2"
            } inline-block text-white text-center mt-1 px-2 py-1 text-xs`}
            style={{
              backgroundColor: TYPE_COLORS[pokemon.types[index].type.name],
            }}
          >
            {typeName}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
