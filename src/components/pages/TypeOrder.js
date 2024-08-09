import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PokemonCard from "../PokemonCard";
import DexFilters from "../DexFilters";
import { TYPE_TRANSLATIONS, TYPE_COLORS } from "../utilities/TypeColors";

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
      setSelectedFilter(""); // Reset selected filter
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
        const pokemonData = await Promise.all(
          response.data.pokemon.map(async (p) => {
            const pokemonResponse = await axios.get(p.pokemon.url);
            return pokemonResponse.data;
          })
        );

        const sortedPokemon = pokemonData.sort((a, b) => a.id - b.id);
        const filteredPokemon = sortedPokemon.filter((pokemon) => pokemon.id <= 898);

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
    setPokemonList(sortPokemon(originalPokemonList));
  }, [selectedFilter, originalPokemonList]);

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

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleReset = () => {
    setSelectedFilter("");
    setPokemonList(originalPokemonList);
  };

  const getTitle = () =>
    `Pokémon di tipo ${
      TYPE_TRANSLATIONS[type] || type.charAt(0).toUpperCase() + type.slice(1)
    }`;

  const getBackgroundColor = () => TYPE_COLORS[type] || "#fff"; // Colore di default se il tipo non è trovato

  if (loading) {
    return <div>Caricamento...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full xl:w-3/4 h-full p-4 mt-8">
      <h1 className="text-3xl font-bold mt-8">
        Pokémon di tipo{" "}
        <span
          className="inline-block px-2 py-1 rounded-lg"
          style={{ backgroundColor: getBackgroundColor(), color: "#fff" }}
        >
          {TYPE_TRANSLATIONS[type] || type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h1>
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

export default TypeOrder;
