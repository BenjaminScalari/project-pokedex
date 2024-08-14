import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RandomPokemon = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Genera un numero casuale tra 1 e 898
    const randomId = Math.floor(Math.random() * 898) + 1;

    // Naviga alla pagina delle informazioni del Pokémon con l'ID casuale
    navigate(`/pokemon/${randomId}`);
  }, [navigate]);

  return (
    <div>
      <h2>Caricamento di un Pokémon casuale...</h2>
    </div>
  );
};

export default RandomPokemon;
