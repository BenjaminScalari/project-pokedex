import React, { useEffect, useState } from "react";
import axios from "axios";
import abilitiesTranslations from "../../utilities/AbilitiesTranslations";

const PokemonAbilities = ({ abilities, typeColors }) => {
  const [abilitiesDescriptions, setAbilitiesDescriptions] = useState({});

  useEffect(() => {
    const fetchAbilityDescriptions = async () => {
      const descriptions = {};

      for (const ability of abilities) {
        try {
          const { data } = await axios.get(
            `https://pokeapi.co/api/v2/ability/${ability.ability.name}`
          );

          // Trova la descrizione in italiano nella proprietà flavor_text_entries
          const italianDescription = data.flavor_text_entries.find(
            (entry) => entry.language.name === "it"
          );

          // Usa la descrizione in italiano se disponibile, altrimenti indica che non è disponibile
          const descriptionText = italianDescription
            ? italianDescription.flavor_text
            : "Descrizione non disponibile";

          descriptions[ability.ability.name] = descriptionText;
        } catch (error) {
          console.error(
            `Errore nel recupero della descrizione per l'abilità ${ability.ability.name}:`,
            error
          );
          descriptions[ability.ability.name] = "Descrizione non disponibile";
        }
      }

      setAbilitiesDescriptions(descriptions);
    };

    fetchAbilityDescriptions();
  }, [abilities]);

  // Calcola il numero di righe necessarie
  const numberOfRows = Math.ceil(abilities.length / 2);

  // Crea un array di righe, ognuna con due abilità o una se dispari
  const rows = Array.from({ length: numberOfRows }, (_, rowIndex) => {
    const start = rowIndex * 2;
    const end = start + 2;
    return abilities.slice(start, end);
  });

  return (
    <div
      className="mt-8 p-4 bg-[#202020] border-2 rounded-3xl"
      style={{
        borderColor: typeColors[0],
        borderWidth: "2px",
        borderStyle: "solid",
      }}
    >
      <h2 className="text-2xl font-semibold text-center">Abilità</h2>
      <div className="flex flex-col gap-4 pt-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-between">
            {row.map((ability) => (
              <div
                key={ability.ability.name}
                className="flex flex-col items-center text-center flex-1 mx-2"
              >
                <h3 className="text-lg font-medium text-white">
                  {abilitiesTranslations[ability.ability.name] ||
                    ability.ability.name}
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  {abilitiesDescriptions[ability.ability.name] ||
                    "Descrizione non disponibile"}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonAbilities;
