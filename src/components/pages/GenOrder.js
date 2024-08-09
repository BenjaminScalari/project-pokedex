import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PokemonCard from "../PokemonCard";
import DexFilters from "../DexFilters";
import { getGenerationName } from "../utilities/RegionGeneration";

const GenOrder = () => {
  const { number } = useParams();
  const [pokemonList, setPokemonList] = useState([]);
  const [originalPokemonList, setOriginalPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [error, setError] = useState(null);

  const generationLimits = {
    1: { start: 1, end: 151 },
    2: { start: 152, end: 251 },
    3: { start: 252, end: 386 },
    4: { start: 387, end: 493 },
    5: { start: 494, end: 649 },
    6: { start: 650, end: 721 },
    7: { start: 722, end: 809 },
    8: { start: 810, end: 898 },
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const { start, end } = generationLimits[number];
        const promises = [];
        for (let i = start; i <= end; i++) {
          promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
        }
        const results = await Promise.all(promises);
        const sortedPokemon = results
          .map((result) => result.data)
          .sort((a, b) => a.id - b.id);

        setOriginalPokemonList(sortedPokemon);
        setPokemonList(sortedPokemon);
      } catch (error) {
        console.error("Errore nel recupero dei dati dei Pokémon:", error);
        setError("Si è verificato un errore nel recupero dei dati.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [number]);

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
          return [...pokemonList].sort((a, b) => {
            const nameA = a.name || "";
            const nameB = b.name || "";
            return nameA.localeCompare(nameB);
          });
        case "za":
          return [...pokemonList].sort((a, b) => {
            const nameA = a.name || "";
            const nameB = b.name || "";
            return nameB.localeCompare(nameA);
          });
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

  if (loading) {
    return <div>Caricamento...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full xl:w-3/4 h-full p-4 mt-8">
      <h1 className="text-3xl font-bold mt-8">Pokémon di {getGenerationName(number)}</h1>
      <DexFilters
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />
      <div className="py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {pokemonList && pokemonList.length > 0 ? (
          pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <div>Nessun Pokémon trovato.</div>
        )}
      </div>
    </div>
  );
};

export default GenOrder;
