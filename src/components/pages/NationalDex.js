import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../PokemonCard";
import DexFilters from "../DexFilters";

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

const getGeneration = (id) => {
  if (id >= 1 && id <= 151) return 1;
  if (id >= 152 && id <= 251) return 2;
  if (id >= 252 && id <= 386) return 3;
  if (id >= 387 && id <= 493) return 4;
  if (id >= 494 && id <= 649) return 5;
  if (id >= 650 && id <= 721) return 6;
  if (id >= 722 && id <= 809) return 7;
  if (id >= 810 && id <= 898) return 8;
  return null; // Per Pokémon non gestiti o futuri
};

const NationalDex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [originalPokemonList, setOriginalPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fai richieste in batch per evitare limitazioni
        const batchSize = 50;
        let allPokemons = [];
        for (let i = 1; i <= 898; i += batchSize) {
          const promises = [];
          for (let j = i; j < i + batchSize && j <= 898; j++) {
            promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${j}`));
          }
          const results = await Promise.all(promises);
          allPokemons = allPokemons.concat(
            results.map((result) => result.data)
          );
        }

        const sortedPokemon = allPokemons.sort((a, b) => a.id - b.id);
        setOriginalPokemonList(sortedPokemon);
        setPokemonList(sortedPokemon);
      } catch (error) {
        console.error("Errore nel recupero dei dati dei Pokémon:", error);
        setError(
          "Si è verificato un errore nel recupero dei dati dei Pokémon. Verifica la tua connessione o riprova più tardi."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);

  useEffect(() => {
    const sortPokemon = (pokemonList) => {
      if (!pokemonList) return [];
      switch (selectedFilter) {
        case "lightest":
          return [...pokemonList].sort((a, b) => a.weight - b.weight);
        case "heaviest":
          return [...pokemonList].sort((a, b) => b.weight - a.weight);
        case "shortest":
          return [...pokemonList].sort((a, b) => a.height - b.height);
        case "tallest":
          return [...pokemonList].sort((a, b) => b.height - a.height);
        case "az":
          return [...pokemonList].sort((a, b) => a.name.localeCompare(b.name));
        case "za":
          return [...pokemonList].sort((a, b) => b.name.localeCompare(a.name));
        default:
          return pokemonList;
      }
    };

    setPokemonList(sortPokemon(originalPokemonList));
  }, [selectedFilter, originalPokemonList]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleReset = () => {
    setSelectedFilter("");
    setPokemonList(originalPokemonList);
  };

  const groupedPokemons = pokemonList.reduce((acc, pokemon) => {
    const gen = getGeneration(pokemon.id);
    if (!acc[gen]) acc[gen] = [];
    acc[gen].push(pokemon);
    return acc;
  }, {});

  if (loading) {
    return <div>Caricamento...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full xl:w-3/4 h-full p-4 mt-12">
      <h1 className="text-3xl font-bold mt-8 text-center">Pokédex Nazionale</h1>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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

export default NationalDex;
