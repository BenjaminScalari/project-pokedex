import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../PokemonCard";
import DexFilters from "../DexFilters";

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

  if (loading) {
    return <div>Caricamento...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full xl:w-3/4 h-full p-4 mt-12">
      <h1 className="text-3xl font-bold mt-8">Pokédex Nazionale</h1>
      <DexFilters
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />
      <div className="py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {pokemonList.length > 0 ? (
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

export default NationalDex;
