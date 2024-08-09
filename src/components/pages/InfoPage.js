import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TYPE_COLORS, TYPE_TRANSLATIONS } from "../utilities/TypeColors";
import abilitiesTranslations from "../utilities/AbilitiesTranslations";
import { FaArrowLeft } from "react-icons/fa";
import InfoButtons from "../InfoButtons";
import CanMegaEvolve from "../CanMegaEvolve";

const InfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pokedexDescription, setPokedexDescription] = useState("");
  const [isFrontSprite, setIsFrontSprite] = useState(true);
  const [isShiny, setIsShiny] = useState(false);
  const [isMegaEvolved, setIsMegaEvolved] = useState(false);
  const [megaSprite, setMegaSprite] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch Pokémon data
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemon(response.data);

        // Fetch species data for description
        const speciesResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        const italianDescription =
          speciesResponse.data.flavor_text_entries.find(
            (entry) => entry.language.name === "it"
          );
        setPokedexDescription(
          italianDescription
            ? italianDescription.flavor_text
            : "Descrizione non disponibile."
        );
      } catch (error) {
        console.error("Errore nel recupero dei dati del Pokémon:", error);
        setError("Si è verificato un errore nel recupero dei dati.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) {
    return <div>Caricamento...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!pokemon) {
    return <div>Nessun dato disponibile per questo Pokémon.</div>;
  }

  const sprites = pokemon.sprites;
  const frontSpriteUrl = sprites
    ? isMegaEvolved && megaSprite
      ? megaSprite
      : isShiny
      ? sprites.front_shiny
      : sprites.front_default
    : null;
  const backSpriteUrl = sprites
    ? isMegaEvolved && megaSprite
      ? megaSprite
      : isShiny
      ? sprites.back_shiny
      : sprites.back_default
    : null;

  const handleSpriteClick = () => {
    if (backSpriteUrl) {
      setIsFrontSprite(!isFrontSprite);
    }
  };

  const handleShinyToggle = () => {
    setIsShiny(!isShiny);
  };

  const handleMegaEvolution = () => {
    setIsMegaEvolved(!isMegaEvolved);
  };

  const typeColors = pokemon.types
    ? pokemon.types.map((type) => TYPE_COLORS[type.type.name])
    : [];
  const background =
    typeColors.length === 1
      ? `${typeColors[0]}20`
      : typeColors.length === 2
      ? `linear-gradient(135deg, ${typeColors[0]}80 50%, ${typeColors[1]}80 50%)`
      : "#ffffff";

  return (
    <div
      className="container mt-16 p-4 rounded-lg shadow-lg relative"
      style={{
        background,
        borderColor: typeColors[0],
        borderWidth: "2px",
        borderStyle: "solid",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        className="absolute top-3.5 left-4 text-white text-2xl"
        aria-label="Indietro"
      >
        <FaArrowLeft className="w-6 h-6" />
      </button>

      <div className="flex flex-col lg:flex-row items-center justify-evenly mt-10">
        <div className="relative flex flex-col items-center">
          <div
            className="relative py-4 p-2 bg-[#202020] rounded-lg h-[15rem] w-[15rem] flex justify-center items-center cursor-pointer"
            style={{
              borderColor: typeColors[0],
              borderWidth: "2px",
              borderStyle: "solid",
            }}
            onClick={handleSpriteClick}
          >
            <img
              src={
                isFrontSprite ? frontSpriteUrl : backSpriteUrl || frontSpriteUrl
              }
              alt={pokemon.name}
              className="w-48 h-48 object-contain"
            />
          </div>

          <InfoButtons
            shinyToggle={handleShinyToggle}
            typeColor={typeColors[0]}
            pokemonId={id}
            pokemonName={pokemon.name}
            megaToggle={handleMegaEvolution}
            isMegaEvolved={isMegaEvolved}
            isShiny={isShiny}
            setMegaSprite={setMegaSprite}
          />
        </div>

        <div className="flex flex-col justify-center xl:ms-8 mt-4 lg:mt-0">
          <h1
            className="flex justify-center text-3xl font-bold py-4 px-8 bg-[#202020] border-2 rounded-3xl text-center"
            style={{
              borderColor: typeColors[0],
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          >
            #{pokemon.id}{" "}
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h1>
          <div
            className="flex flex-row justify-center items-center mt-4 p-4 bg-[#202020] border-2 rounded-3xl"
            style={{
              borderColor: typeColors[0],
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          >
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="mx-2 px-4 py-1 rounded-full text-white"
                style={{ backgroundColor: TYPE_COLORS[type.type.name] }}
              >
                {TYPE_TRANSLATIONS[type.type.name]}
              </span>
            ))}
          </div>
        </div>

        <div className="w-[90%] lg:w-[45%] flex flex-col justify-center">
          <div
            className="flex flex-row justify-center items-center mt-4 p-4 bg-[#202020] border-2 rounded-3xl"
            style={{
              borderColor: typeColors[0],
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          >
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl font-semibold">Descrizione</h2>
              <p className="pt-2 text-center">{pokedexDescription}</p>
            </div>
          </div>
          <div
            className="flex flex-row justify-evenly items-center mt-4 p-4 bg-[#202020] border-2 rounded-3xl"
            style={{
              borderColor: typeColors[0],
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          >
            <p>Altezza: {pokemon.height / 10} m</p>
            <p>Peso: {pokemon.weight / 10} kg</p>
          </div>
        </div>
      </div>

      <div
        className="mt-8 p-4 bg-[#202020] border-2 rounded-3xl"
        style={{
          borderColor: typeColors[0],
          borderWidth: "2px",
          borderStyle: "solid",
        }}
      >
        <h2 className="text-2xl font-semibold">Abilità</h2>
        <div className="grid grid-cols-2 gap-4">
          {pokemon.abilities &&
            pokemon.abilities.map((ability) => (
              <div key={ability.ability.name} className="flex justify-between">
                <span>
                  {abilitiesTranslations[ability.ability.name] ||
                    ability.ability.name}
                </span>
              </div>
            ))}
        </div>
      </div>

      <div
        className="mt-8 p-4 bg-[#202020] border-2 rounded-3xl"
        style={{
          borderColor: typeColors[0],
          borderWidth: "2px",
          borderStyle: "solid",
        }}
      >
        <h2 className="text-2xl font-semibold">Evoluzioni</h2>
        <p>Evoluzioni non implementate ancora</p>
      </div>

      <div
        className="mt-8 p-4 bg-[#202020] border-2 rounded-3xl"
        style={{
          borderColor: typeColors[0],
          borderWidth: "2px",
          borderStyle: "solid",
        }}
      >
        <h2 className="text-2xl font-semibold">Resistenze e Debolezze</h2>
        <p>Resistenze e debolezze non implementate ancora</p>
      </div>
    </div>
  );
};

export default InfoPage;
