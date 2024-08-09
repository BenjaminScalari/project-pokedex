import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const megaEvolvePokemons = [
  "abomasnow",
  "absol",
  "aerodactyl",
  "aggron",
  "alakazam",
  "altaria",
  "ampharos",
  "audino",
  "banette",
  "beedrill",
  "blastoise",
  "blaziken",
  "camerupt",
  "charizard",
  "diancie",
  "gallade",
  "garchomp",
  "gardevoir",
  "gengar",
  "glalie",
  "gyarados",
  "heracross",
  "houndoom",
  "kangaskhan",
  "latias",
  "latios",
  "lopunny",
  "lucario",
  "manectric",
  "mawile",
  "metagross",
  "mewtwo",
  "medicham",
  "pidgeot",
  "pinsir",
  "rayquaza",
  "salamence",
  "sableye",
  "sceptile",
  "scizor",
  "sharpedo",
  "slowbro",
  "steelix",
  "swampert",
  "tyranitar",
  "venusaur",
];

const CanMegaEvolve = ({ pokemonName, setCanMegaEvolve, setMegaSprite }) => {
  useEffect(() => {
    const checkMegaEvolvable = async () => {
      const canEvolve = megaEvolvePokemons.includes(pokemonName.toLowerCase());
      setCanMegaEvolve(canEvolve);

      if (canEvolve) {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}-mega`
          );
          setMegaSprite(response.data.sprites.front_default);
        } catch (error) {
          console.error(
            "Errore nel recupero dei dati della mega evoluzione:",
            error
          );
        }
      }
    };

    checkMegaEvolvable();
  }, [pokemonName, setCanMegaEvolve, setMegaSprite]);

  return null; // Non renderizza nulla, solo effettua il controllo
};

CanMegaEvolve.propTypes = {
  pokemonName: PropTypes.string.isRequired,
  setCanMegaEvolve: PropTypes.func.isRequired,
  setMegaSprite: PropTypes.func.isRequired,
};

export default CanMegaEvolve;