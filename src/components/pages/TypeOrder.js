import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PokemonCard from "../PokemonCard";
import DexFilters from "../DexFilters";
import { TYPE_TRANSLATIONS, TYPE_COLORS } from "../utilities/TypeColors";

const REGION_NAMES = {
  1: "Kanto",
  2: "Johto",
  3: "Hoenn",
  4: "Sinnoh",
  5: "Unima",
  6: "Kalos",
  7: "Alola",
  8: "Galar",
};

const TypeOrder = () => {
  const { type } = useParams();
  const [pokemonList, setPokemonList] = useState([]);
  const [originalPokemonList, setOriginalPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonByType = async () => {
      setLoading(true);
      setError(null);
      setSelectedFilter("");
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/type/${type}`
        );
        const pokemonData = await Promise.all(
          response.data.pokemon.map(async (p) => {
            const { data } = await axios.get(p.pokemon.url);
            return data;
          })
        );

        const filteredPokemon = pokemonData
          .sort((a, b) => a.id - b.id)
          .filter((pokemon) => pokemon.id <= 898);

        setOriginalPokemonList(filteredPokemon);
        setPokemonList(filteredPokemon);
      } catch (error) {
        console.error("Errore nel recupero dei dati dei Pokémon:", error);
        setError("Si è verificato un errore nel recupero dei dati.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonByType();
  }, [type]);

  useEffect(() => {
    const sortPokemon = (pokemonList) => {
      const sortedList = [...pokemonList];
      switch (selectedFilter) {
        case "lightest":
          return sortedList.sort((a, b) => a.weight - b.weight);
        case "heaviest":
          return sortedList.sort((a, b) => b.weight - a.weight);
        case "shortest":
          return sortedList.sort((a, b) => a.height - b.height);
        case "tallest":
          return sortedList.sort((a, b) => b.height - a.height);
        case "az":
          return sortedList.sort((a, b) => a.name.localeCompare(b.name));
        case "za":
          return sortedList.sort((a, b) => b.name.localeCompare(a.name));
        default:
          return sortedList;
      }
    };

    setPokemonList(sortPokemon(originalPokemonList));
  }, [selectedFilter, originalPokemonList]);

  const handleFilterChange = (filter) => setSelectedFilter(filter);
  const handleReset = () => {
    setSelectedFilter("");
    setPokemonList(originalPokemonList);
  };

  const getTitle = () =>
    `Pokémon di tipo ${
      TYPE_TRANSLATIONS[type] || type.charAt(0).toUpperCase() + type.slice(1)
    }`;

  const getBackgroundColor = () => TYPE_COLORS[type] || "#fff";

  const getGeneration = (id) => {
    if (id >= 1 && id <= 151) return 1;
    if (id >= 152 && id <= 251) return 2;
    if (id >= 252 && id <= 386) return 3;
    if (id >= 387 && id <= 493) return 4;
    if (id >= 494 && id <= 649) return 5;
    if (id >= 650 && id <= 721) return 6;
    if (id >= 722 && id <= 809) return 7;
    if (id >= 810 && id <= 898) return 8;
    return null;
  };

  const groupedPokemons = pokemonList.reduce((acc, pokemon) => {
    const gen = getGeneration(pokemon.id);
    if (!acc[gen]) acc[gen] = [];
    acc[gen].push(pokemon);
    return acc;
  }, {});

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full xl:w-3/4 h-full p-4 mt-8 mx-auto">
      <h1 className="text-3xl font-bold mt-8 text-center">
        Pokémon di tipo{" "}
        <span
          className="inline-block px-2 py-1 rounded-lg"
          style={{ backgroundColor: getBackgroundColor(), color: "#fff" }}
        >
          {TYPE_TRANSLATIONS[type] ||
            type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h1>
      <DexFilters
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />
      <div className="py-8">
        {Object.keys(groupedPokemons).map((gen) => (
          <div key={gen} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {REGION_NAMES[gen] || `Gen ${gen}`}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center">
              {groupedPokemons[gen].length > 0 ? (
                groupedPokemons[gen].map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))
              ) : (
                <div className="text-center">
                  Nessun Pokémon trovato per questa generazione.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypeOrder;
