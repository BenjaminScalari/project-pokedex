import React, { useEffect, useState } from "react";
import axios from "axios";
import { TYPE_TRANSLATIONS, TYPE_COLORS } from "../../utilities/TypeColors";

// Funzione per calcolare il danno totale in base alle debolezze
const calculateWeaknesses = (types, damageRelations) => {
  const damageMultiplier = {};

  // Inizializza i moltiplicatori di danno
  types.forEach((type) => {
    damageMultiplier[type] = 1;
  });

  // Aggiorna i moltiplicatori di danno in base alle debolezze
  damageRelations.forEach((relation) => {
    relation.damage_relations.double_damage_from.forEach((type) => {
      damageMultiplier[type.name] = (damageMultiplier[type.name] || 1) * 2;
    });
    relation.damage_relations.half_damage_from.forEach((type) => {
      damageMultiplier[type.name] = (damageMultiplier[type.name] || 1) * 0.5;
    });
    relation.damage_relations.no_damage_from.forEach((type) => {
      damageMultiplier[type.name] = (damageMultiplier[type.name] || 1) * 0;
    });
  });

  // Categorizza in base al moltiplicatore
  const weaknessesX4 = [];
  const weaknessesX2 = [];

  Object.entries(damageMultiplier).forEach(([type, multiplier]) => {
    if (multiplier >= 4) {
      weaknessesX4.push(type);
    } else if (multiplier >= 2) {
      weaknessesX2.push(type);
    }
  });

  return { weaknessesX4, weaknessesX2 };
};

// Funzione per calcolare il danno totale in base alle resistenze
const calculateStrengths = (types, damageRelations) => {
  const damageMultiplier = {};

  // Inizializza i moltiplicatori di danno
  types.forEach((type) => {
    damageMultiplier[type] = 1;
  });

  // Aggiorna i moltiplicatori di danno in base alle resistenze
  damageRelations.forEach((relation) => {
    relation.damage_relations.double_damage_to.forEach((type) => {
      damageMultiplier[type.name] = (damageMultiplier[type.name] || 1) * 2;
    });
    relation.damage_relations.half_damage_to.forEach((type) => {
      damageMultiplier[type.name] = (damageMultiplier[type.name] || 1) * 0.5;
    });
    relation.damage_relations.no_damage_to.forEach((type) => {
      damageMultiplier[type.name] = (damageMultiplier[type.name] || 1) * 0;
    });
  });

  // Categorizza in base al moltiplicatore
  const strengthsX4 = [];
  const strengthsX2 = [];

  Object.entries(damageMultiplier).forEach(([type, multiplier]) => {
    if (multiplier >= 4) {
      strengthsX4.push(type);
    } else if (multiplier >= 2) {
      strengthsX2.push(type);
    }
  });

  return { strengthsX4, strengthsX2 };
};

const StrenghtsAndWeaknesses = ({ typeColors, pokemonTypes }) => {
  const [strengthsX2, setStrengthsX2] = useState([]);
  const [strengthsX4, setStrengthsX4] = useState([]);
  const [weaknessesX2, setWeaknessesX2] = useState([]);
  const [weaknessesX4, setWeaknessesX4] = useState([]);
  const [immunities, setImmunities] = useState([]);

  useEffect(() => {
    const fetchTypeEffectiveness = async () => {
      try {
        const promises = pokemonTypes.map((type) =>
          axios.get(`https://pokeapi.co/api/v2/type/${type.type.name}`)
        );
        const typeResponses = await Promise.all(promises);

        const damageRelations = typeResponses.map((response) => response.data);

        // Calcola le debolezze e resistenze
        const { weaknessesX4, weaknessesX2 } = calculateWeaknesses(
          pokemonTypes.map((type) => type.type.name),
          damageRelations
        );

        const { strengthsX4, strengthsX2 } = calculateStrengths(
          pokemonTypes.map((type) => type.type.name),
          damageRelations
        );

        // Filtra immunità
        const doubleDamageFrom = [];
        const halfDamageFrom = [];
        const noDamageFrom = [];

        damageRelations.forEach((response) => {
          const { double_damage_from, half_damage_from, no_damage_from } =
            response.damage_relations;
          doubleDamageFrom.push(...double_damage_from.map((type) => type.name));
          halfDamageFrom.push(...half_damage_from.map((type) => type.name));
          noDamageFrom.push(...no_damage_from.map((type) => type.name));
        });

        // Rimuovi le immunità dalle resistenze
        const strengthsX2Filtered = strengthsX2.filter(
          (type) => !immunities.includes(type)
        );
        const strengthsX4Filtered = strengthsX4.filter(
          (type) => !immunities.includes(type)
        );

        setWeaknessesX4(weaknessesX4);
        setWeaknessesX2(weaknessesX2);
        setStrengthsX4(strengthsX4Filtered);
        setStrengthsX2(strengthsX2Filtered);
        setImmunities([...new Set(noDamageFrom)]);
      } catch (error) {
        console.error(
          "Errore nel recupero delle resistenze e debolezze:",
          error
        );
      }
    };

    fetchTypeEffectiveness();
  }, [pokemonTypes]);

  const renderTypeIcons = (types) => {
    return types.map((type) => (
      <div
        key={type}
        className="block px-2 rounded-3xl text-center transition-colors duration-300 flex items-center justify-center mx-2 mt-2"
        style={{
          backgroundColor: TYPE_COLORS[type],
          color: "white",
          border: `4px solid transparent`,
        }}
      >
        <span
          className={`transition-colors duration-300 ${"font-normal"}`}
          style={{
            backgroundColor: "transparent",
            color: "white",
            borderRadius: "4px",
            display: "inline-block",
            textAlign: "center",
            padding: "2px 4px",
            fontSize: "16px",
          }}
        >
          {TYPE_TRANSLATIONS[type]}
        </span>
      </div>
    ));
  };

  return (
    <div
      className="mt-8 p-4 bg-[#202020] border-2 rounded-3xl"
      style={{
        borderColor: typeColors[0],
        borderWidth: "2px",
        borderStyle: "solid",
      }}
    >
      <h2 className="text-2xl font-semibold flex justify-center">
        Resistenze e Debolezze
      </h2>

      {weaknessesX4.length > 0 && (
        <div className="flex justify-center">
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-center">Debolezze x4:</h3>
            <div className="flex flex-wrap justify-center">
              {renderTypeIcons(weaknessesX4)}
            </div>
          </div>
        </div>
      )}

      {weaknessesX2.length > 0 && (
        <div className="flex justify-center">
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-center">Debolezze x2:</h3>
            <div className="flex flex-wrap justify-center">
              {renderTypeIcons(weaknessesX2)}
            </div>
          </div>
        </div>
      )}

      {strengthsX2.length > 0 && (
        <div className="flex justify-center">
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-center">
              Resistenze x1/2:
            </h3>
            <div className="flex flex-wrap justify-center">
              {renderTypeIcons(strengthsX2)}
            </div>
          </div>
        </div>
      )}

      {strengthsX4.length > 0 && (
        <div className="flex justify-center">
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-center">
              Resistenze x1/4:
            </h3>
            <div className="flex flex-wrap justify-center">
              {renderTypeIcons(strengthsX4)}
            </div>
          </div>
        </div>
      )}

      {immunities.length > 0 && (
        <div className="flex justify-center">
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-center">Immunità:</h3>
            <div className="flex flex-wrap justify-center">
              {renderTypeIcons(immunities)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrenghtsAndWeaknesses;
