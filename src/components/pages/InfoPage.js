import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TYPE_COLORS } from "../utilities/TypeColors";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import InfoButtons from "../InfoButtons";
import PokemonDescription from "./info-components/PokemonDescriptions";
import PokemonAbilities from "./info-components/PokemonAbilities";
import PokemonEvolutions from "./info-components/PokemonEvolutions";
import StrenghtsAndWeaknesses from "./info-components/StrenghtsAndWeaknesses";
import PokemonTypes from "./info-components/PokemonTypes";
import PokemonImages from "./info-components/PokemonImages";

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
  const [megaShinySprite, setMegaShinySprite] = useState(null);

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

        // Fetch sprites for mega evolution
        const evolutionResponse = await axios.get(
          `https://pokeapi.co/api/v2/evolution-chain/${
            speciesResponse.data.evolution_chain.url.split("/")[6]
          }`
        );
        const megaEvolves = evolutionResponse.data.chain.evolves_to.flatMap(
          (evo) => evo.evolves_to
        );
        const megaEvolution = megaEvolves.find(
          (evo) => evo.species.name === id
        );
        if (megaEvolution) {
          const megaResponse = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${megaEvolution.species.name}`
          );
          setMegaSprite(megaResponse.data.sprites.front_default);
          setMegaShinySprite(megaResponse.data.sprites.front_shiny);
        }
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
    ? isMegaEvolved
      ? isShiny
        ? megaShinySprite
        : megaSprite
      : isShiny
      ? sprites.front_shiny
      : sprites.front_default
    : null;
  const backSpriteUrl = sprites
    ? isMegaEvolved
      ? isShiny
        ? megaShinySprite
        : megaSprite
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
          <PokemonImages
            frontSpriteUrl={frontSpriteUrl}
            backSpriteUrl={backSpriteUrl}
            isFrontSprite={isFrontSprite}
            handleSpriteClick={handleSpriteClick}
            pokemonName={pokemon.name}
            typeColors={typeColors}
          />

          <InfoButtons
            shinyToggle={handleShinyToggle}
            typeColor={typeColors[0]}
            pokemonId={id}
            pokemonName={pokemon.name}
            megaToggle={handleMegaEvolution}
            isMegaEvolved={isMegaEvolved}
            isShiny={isShiny}
            setMegaSprite={setMegaSprite}
            setMegaShinySprite={setMegaShinySprite}
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
          <PokemonTypes types={pokemon.types} typeColors={typeColors} />
        </div>

        <PokemonDescription
          pokedexDescription={pokedexDescription}
          height={pokemon.height}
          weight={pokemon.weight}
          typeColors={typeColors}
        />
      </div>

      <PokemonAbilities abilities={pokemon.abilities} typeColors={typeColors} />

      <PokemonEvolutions typeColors={typeColors} />

      <StrenghtsAndWeaknesses typeColors={typeColors} />
    </div>
  );
};

export default InfoPage;
