import React from "react";

const PokemonImages = ({
  frontSpriteUrl,
  backSpriteUrl,
  isFrontSprite,
  handleSpriteClick,
  pokemonName,
  typeColors,
  pokemonId, // Nuova proprietà
  megaSpriteSize, // Nuova proprietà per le dimensioni dello sprite mega
}) => {
  // Determina le dimensioni degli sprite
  const isNewGeneration = pokemonId > 649;
  const defaultSpriteSize = isNewGeneration ? "w-40 h-40" : "w-36 h-36"; // Dimensioni per generazioni diverse

  // Usa dimensioni separate per gli sprite mega evoluti
  const spriteSize = megaSpriteSize || defaultSpriteSize;

  return (
    <div
      className="relative py-4 p-2 bg-[#202020] rounded-lg h-[15rem] w-[15rem] flex justify-center items-center cursor-pointer"
      style={{
        borderColor: typeColors[0],
        borderWidth: "2px",
        borderStyle: "solid",
      }}
      onClick={handleSpriteClick}
    >
      <img
        src={isFrontSprite ? frontSpriteUrl : backSpriteUrl || frontSpriteUrl}
        alt={pokemonName}
        className={`${spriteSize} object-contain`} // Usa le dimensioni specificate
      />
    </div>
  );
};

export default PokemonImages;
