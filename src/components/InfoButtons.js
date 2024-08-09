import React, { useState } from "react";
import { FaStar, FaPlay, FaBolt } from "react-icons/fa";
import CanMegaEvolve from "./CanMegaEvolve";

const InfoButtons = ({
  shinyToggle,
  typeColor,
  pokemonId,
  pokemonName,
  megaToggle,
  isMegaEvolved,
  isShiny,
  setMegaSprite
}) => {
  const baseSoundUrlLatest =
    "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest";
  const baseSoundUrlLegacy =
    "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy";

  const shinyIconSize = "w-7 h-7";
  const playIconSize = "w-6 h-6";
  const megaIconSize = "w-6 h-6";

  const [isPlaying, setIsPlaying] = useState(false);
  const [canMegaEvolve, setCanMegaEvolve] = useState(false);

  const getSoundUrl = (pokemonId) => {
    if (!pokemonId) return null;
    const baseUrl = pokemonId >= 650 ? baseSoundUrlLatest : baseSoundUrlLegacy;
    return `${baseUrl}/${pokemonId}.ogg`;
  };

  const checkSoundUrl = async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok;
    } catch {
      return false;
    }
  };

  const playSound = async () => {
    const soundUrl = getSoundUrl(pokemonId);
    if (soundUrl) {
      if (isPlaying) return;
      const urlIsValid = await checkSoundUrl(soundUrl);
      if (!urlIsValid) {
        setIsPlaying(false);
        return;
      }
      setIsPlaying(true);
      const audio = new Audio(soundUrl);
      audio.addEventListener("error", () => setIsPlaying(false));
      audio.addEventListener("ended", () => setIsPlaying(false));
      audio.play().catch(() => setIsPlaying(false));
    }
  };

  return (
    <div className="flex flex-row w-full justify-evenly mt-4">
      <div
        className={`flex items-center justify-center w-14 h-14 bg-[#202020] text-white text-xl font-bold border-2 rounded-lg cursor-pointer`}
        style={{
          borderColor: typeColor,
          borderWidth: "2px",
          borderStyle: "solid",
        }}
        onClick={shinyToggle}
      >
        <FaStar className={shinyIconSize} />
      </div>

      <div
        className={`flex items-center justify-center w-14 h-14 bg-[#202020] text-white text-xl font-bold border-2 rounded-lg cursor-pointer ${
          isPlaying ? "opacity-50 cursor-not-allowed" : ""
        }`}
        style={{
          borderColor: typeColor,
          borderWidth: "2px",
          borderStyle: "solid",
        }}
        onClick={playSound}
      >
        <FaPlay className={playIconSize} />
      </div>

      <CanMegaEvolve
        pokemonName={pokemonName}
        setCanMegaEvolve={setCanMegaEvolve}
        setMegaSprite={setMegaSprite}
      />

      {canMegaEvolve && (
        <div
          className={`flex items-center justify-center w-14 h-14 bg-[#202020] text-white text-xl font-bold border-2 rounded-lg cursor-pointer`}
          style={{
            borderColor: typeColor,
            borderWidth: "2px",
            borderStyle: "solid",
          }}
          onClick={megaToggle}
        >
          <FaBolt className={megaIconSize} />
        </div>
      )}
    </div>
  );
};

export default InfoButtons;
