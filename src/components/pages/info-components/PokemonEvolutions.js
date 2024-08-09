import React from "react";

const PokemonEvolutions = ({ typeColors }) => {
  return (
    <div
      className="mt-8 p-4 bg-[#202020] border-2 rounded-3xl"
      style={{
        borderColor: typeColors[0],
        borderWidth: "2px",
        borderStyle: "solid",
      }}
    >
      <h2 className="text-2xl font-semibold">Evoluzioni</h2>
      <p>Evoluzioni non implementate ancora</p>
    </div>
  );
};

export default PokemonEvolutions;
