import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import EeveeEvolutions from "./multiple-evolutions/EeveeEvolutions";
import PoliwagEvolutions from "./multiple-evolutions/PoliwagEvolutions";
import SlowpokeEvolutions from "./multiple-evolutions/SlowpokeEvolutions";
import TyrogueEvolutions from "./multiple-evolutions/TyrogueEvolutions";
import MimeJrEvolutions from "./multiple-evolutions/MimeJrEvolutions";
import WurmpleEvolutions from "./multiple-evolutions/WurmpleEvolutions";

const MAX_POKEMON_NUMBER = 898;

const PokemonEvolutions = ({ evolutionChainUrl, typeColors }) => {
  const [evolutionChain, setEvolutionChain] = useState(null);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      if (evolutionChainUrl) {
        try {
          const response = await axios.get(evolutionChainUrl);
          setEvolutionChain(response.data);
        } catch (error) {
          console.error("Errore nel recupero della catena evolutiva:", error);
        }
      }
    };

    fetchEvolutionChain();
  }, [evolutionChainUrl]);

  const renderEvolutions = (chain) => {
    const evolutions = [];
    let current = chain;

    while (current) {
      evolutions.push(current.species);
      current = current.evolves_to[0];
    }

    return evolutions
      .filter(
        (species) => parseInt(species.url.split("/")[6]) <= MAX_POKEMON_NUMBER
      )
      .map((species, index) => {
        const isLastVisibleEvolution =
          index === evolutions.length - 1 ||
          parseInt(evolutions[index + 1]?.url.split("/")[6]) >
            MAX_POKEMON_NUMBER;

        if (species.name === "vaporeon") {
          return (
            <React.Fragment key={species.name}>
              <EeveeEvolutions typeColors={typeColors} />
            </React.Fragment>
          );
        }

        if (species.name === "poliwrath") {
          return (
            <React.Fragment key={species.name}>
              <PoliwagEvolutions />
            </React.Fragment>
          );
        }

        if (species.name === "slowbro") {
          return (
            <React.Fragment key={species.name}>
              <SlowpokeEvolutions />
            </React.Fragment>
          );
        }

        if (species.name === "hitmonlee") {
          return (
            <React.Fragment key={species.name}>
              <TyrogueEvolutions />
            </React.Fragment>
          );
        }

        if (species.name === "mr-mime") {
          return (
            <React.Fragment key={species.name}>
              <MimeJrEvolutions />
            </React.Fragment>
          );
        }

        if (species.name === "silcoon") {
          return (
            <React.Fragment key={species.name}>
              <WurmpleEvolutions />
            </React.Fragment>
          );
        }

        if (species.name === "beautifly") {
          return (
            <React.Fragment key={species.name}>
              {/* DOVREBBE ESSERCI WURMPLE EVOLUTIONS, MA SE LO METTO SDOPPIA TUTTO, MENTRE SE ELIMINO QUESTO IF, SI SMONTA. FACENDO COSì INVECE VIENE VISUALIZZATO CORRETTAMENTE PERCHE BOH */}
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={species.name}>
            <Link
              to={`/pokemon/${species.name}`}
              className="flex flex-col items-center md:mx-4 lg:mx-12"
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  species.url.split("/")[6]
                }.png`}
                alt={species.name}
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-28 md:h-32 lg:w-32 lg:h-32"
              />
              <span className="text-white mt-2 capitalize md:text-sm sm:text-xs">
                {species.name.charAt(0).toUpperCase() + species.name.slice(1)}
              </span>
            </Link>
            {index < evolutions.length - 1 && !isLastVisibleEvolution && (
              <div className="flex items-center mx-2">
                <FaArrowRight className="w-4 h-4 md:w-5 md:h-5 sm:w-4 sm:h-4 text-white" />
              </div>
            )}
          </React.Fragment>
        );
      });
  };

  return (
    <div
      className="mt-8 p-4 bg-[#202020] border-2 rounded-3xl"
      style={{
        borderColor: typeColors[0],
        borderWidth: "2px",
        borderStyle: "solid",
      }}
    >
      <h2 className="text-2xl font-semibold flex justify-center text-white">
        Evoluzioni
      </h2>
      {evolutionChain ? (
        <div className="flex items-center justify-center mt-4">
          {renderEvolutions(evolutionChain.chain)}
        </div>
      ) : (
        <p className="text-white">Linea evolutiva non disponibile</p>
      )}
    </div>
  );
};

export default PokemonEvolutions;
