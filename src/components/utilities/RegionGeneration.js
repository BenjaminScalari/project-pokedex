// src/components/utilities/RegionGeneration.js
export const GENERATION_NAMES = {
  1: "Kanto",
  2: "Johto",
  3: "Hoenn",
  4: "Sinnoh",
  5: "Unima",
  6: "Kalos",
  7: "Alola",
  8: "Galar",
};

export const getGenerationName = (number) =>
  GENERATION_NAMES[number] || `Generazione ${number}`;
