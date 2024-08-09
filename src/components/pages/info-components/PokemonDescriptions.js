import React from "react";

const PokemonDescription = ({
  pokedexDescription,
  height,
  weight,
  typeColors,
}) => {
  return (
    <div className="w-[90%] lg:w-[45%] flex flex-col justify-center">
      <div
        className="flex flex-row justify-center items-center mt-4 p-4 bg-[#202020] border-2 rounded-3xl"
        style={{
          borderColor: typeColors[0],
          borderWidth: "2px",
          borderStyle: "solid",
        }}
      >
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold">Descrizione</h2>
          <p className="pt-2 text-center">{pokedexDescription}</p>
        </div>
      </div>
      <div
        className="flex flex-row justify-evenly items-center mt-4 p-4 bg-[#202020] border-2 rounded-3xl"
        style={{
          borderColor: typeColors[0],
          borderWidth: "2px",
          borderStyle: "solid",
        }}
      >
        <p>Altezza: {height / 10} m</p>
        <p>Peso: {weight / 10} kg</p>
      </div>
    </div>
  );
};

export default PokemonDescription;
