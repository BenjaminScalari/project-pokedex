import React from "react";

const PokemonImages = ({
  frontSpriteUrl,
  backSpriteUrl,
  isFrontSprite,
  handleSpriteClick,
  pokemonName,
  typeColors,
}) => {
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
        className="w-48 h-48 object-contain"
      />
    </div>
  );
};

export default PokemonImages;
