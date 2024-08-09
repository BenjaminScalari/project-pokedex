import React from "react";
import { TYPE_COLORS, TYPE_TRANSLATIONS } from "../../utilities/TypeColors";

const PokemonTypes = ({ types, typeColors }) => {
  return (
    <div
      className="flex flex-row justify-center items-center mt-4 p-4 bg-[#202020] border-2 rounded-3xl"
      style={{
        borderColor: typeColors[0],
        borderWidth: "2px",
        borderStyle: "solid",
      }}
    >
      {types.map((type) => (
        <span
          key={type.type.name}
          className="mx-2 px-4 py-1 rounded-full text-white"
          style={{ backgroundColor: TYPE_COLORS[type.type.name] }}
        >
          {TYPE_TRANSLATIONS[type.type.name]}
        </span>
      ))}
    </div>
  );
};

export default PokemonTypes;
