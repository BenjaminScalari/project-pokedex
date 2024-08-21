import React from "react";
import abilitiesTranslations from "../../utilities/AbilitiesTranslations";

const PokemonAbilities = ({ abilities, typeColors }) => {
  return (
    <div
      className="mt-8 p-4 bg-[#202020] border-2 rounded-3xl"
      style={{
        borderColor: typeColors[0],
        borderWidth: "2px",
        borderStyle: "solid",
      }}
    >
      <h2 className="text-2xl font-semibold flex justify-center">Abilità</h2>
      <div className="grid grid-cols-2 gap-4">
        {abilities &&
          abilities.map((ability) => (
            <div
              key={ability.ability.name}
              className="flex justify-center text-center"
            >
              <span>
                {abilitiesTranslations[ability.ability.name] ||
                  ability.ability.name}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PokemonAbilities;
