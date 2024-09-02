import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../App.css";

// Mappatura dei nomi delle statistiche in inglese a quelli in italiano
const STAT_TRANSLATIONS = {
  hp: "PS",
  attack: "Attacco",
  defense: "Difesa",
  "special-attack": "Attacco Speciale",
  "special-defense": "Difesa Speciale",
  speed: "Velocità",
};

// Mappatura dei colori delle statistiche
const STAT_COLORS = {
  hp: "#5be814",
  attack: "#ebcb32",
  defense: "#e67521",
  "special-attack": "#29bbe0",
  "special-defense": "#4f6fd6",
  speed: "#d527cf",
};

// Funzione per scurire un colore
const darkenColor = (color, percent) => {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.round((R * (100 - percent)) / 100);
  G = Math.round((G * (100 - percent)) / 100);
  B = Math.round((B * (100 - percent)) / 100);

  return `#${(0x1000000 + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
};

const PokemonStats = ({ typeColors, pokemonId }) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchPokemonStats = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        const { stats } = response.data;

        setStats(stats);
      } catch (error) {
        console.error(
          "Errore nel recupero delle statistiche del Pokémon:",
          error
        );
      }
    };

    fetchPokemonStats();
  }, [pokemonId]);

  const renderStatBars = () => {
    return stats.map((stat) => {
      const statColor = STAT_COLORS[stat.stat.name] || typeColors[0];
      const darkStatColor = darkenColor(statColor, 75); // Scurisce il colore di 75%

      return (
        <div key={stat.stat.name} className="mt-4">
          <div className="relative flex items-center">
            <span
              className="text-xl font-semibold text-center w-1/3"
              style={{ color: statColor }} // Colore del nome uguale alla parte piena della barra
            >
              {STAT_TRANSLATIONS[stat.stat.name] ||
                stat.stat.name.toUpperCase()}
            </span>
            <div
              className="w-2/3 h-6 rounded-full"
              style={{
                backgroundColor: darkStatColor,
                overflow: "hidden",
              }}
            >
              <div
                className="h-full rounded-full flex items-center ps-4"
                style={{
                  width: `${(stat.base_stat / 200) * 100}%`,
                  backgroundColor: statColor,
                }}
              >
                <span
                  className="text-md font-medium"
                  style={{ color: darkStatColor }} // Colore del valore uguale alla parte vuota della barra
                >
                  {stat.base_stat}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    });
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
      <h2 className="text-2xl font-semibold text-center">
        Statistiche del Pokémon
      </h2>
      <div>{renderStatBars()}</div>
    </div>
  );
};

export default PokemonStats;
