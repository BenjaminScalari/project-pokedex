import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./utilities/HomepageBackground.css"

function Searchbar() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Funzione di ricerca e navigazione
  const handleSearch = async () => {
    const formattedQuery = query.trim().toLowerCase();

    if (!formattedQuery) return;

    setLoading(true);
    setError(null);

    try {
      // Esegui una chiamata API per trovare il Pokémon per nome o numero
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${formattedQuery}`
      );
      const pokemonId = response.data.id; // Ottieni l'ID del Pokémon

      // Controlla se il Pokémon è nella lista dei primi 898
      if (pokemonId > 898) {
        setError("Pokémon non trovato");
      } else {
        // Naviga alla pagina del Pokémon
        navigate(`/pokemon/${pokemonId}`);
      }
    } catch (error) {
      setError("Pokémon non trovato");
    } finally {
      setLoading(false);
    }
  };

  // Gestisci il cambiamento dell'input
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Gestisci l'evento di pressione del tasto Invio
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full xl:w-1/2 h-full flex flex-col items-center justify-center custom-gradient">
      <h1 className="text-5xl font-bold sm:text-6xl md:text-7xl lg:text-7xl pb-44 md:pb-56 lg:pb-64">
        P o k é d e x
      </h1>
      <div className="w-full flex flex-col items-center justify-center fixed">
        {/*  */}
        <div className="relative w-2/3 sm:w-1/2 xl:w-1/3">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown} // Aggiungi gestore evento per tasto Invio
            placeholder="Cerca un Pokémon..."
            className="w-full py-2 pl-12 pr-16 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#9d0000] text-black placeholder-gray-500"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-4">
            <svg
              className="w-5 h-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <button
            type="button"
            onClick={handleSearch}
            className="absolute inset-y-0 right-0 flex items-center px-4 py-2 text-white bg-[#9d0000] rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#ffffff]"
          >
            {loading ? (
              <svg
                className="w-5 h-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="6" x2="12" y2="6" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </button>
          {error && (
            <div className="absolute top-full left-0 w-full text-center text-red-500 mt-2">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
