import React, { useState } from "react";
import { FaStar, FaPlay, FaBolt } from "react-icons/fa";
import CanMegaEvolve from "./CanMegaEvolve";

/**
 * InfoButtons
 *
 * Componente che gestisce i pulsanti per interagire con l'immagine del Pokémon:
 * - Attivare/disattivare la modalità shiny
 * - Riprodurre il verso del Pokémon
 * - Attivare/disattivare la mega evoluzione
 *
 * Props:
 * - shinyToggle: Funzione per alternare la modalità shiny
 * - typeColor: Colore del tipo del Pokémon, usato per il bordo dei pulsanti
 * - pokemonId: ID del Pokémon, usato per ottenere il verso del Pokémon
 * - pokemonName: Nome del Pokémon, usato per controllare se può mega evolversi
 * - megaToggle: Funzione per alternare la mega evoluzione
 * - isMegaEvolved: Stato che indica se il Pokémon è mega evoluto
 * - isShiny: Stato che indica se la modalità shiny è attiva
 * - setMegaSprite: Funzione per impostare lo sprite della mega evoluzione
 * - setMegaShinySprite: Funzione per impostare lo sprite shiny della mega evoluzione
 */
const InfoButtons = ({
  shinyToggle,
  typeColor,
  pokemonId,
  pokemonName,
  megaToggle,
  isMegaEvolved,
  isShiny,
  setMegaSprite,
  setMegaShinySprite,
}) => {
  // URL base per i suoni del Pokémon
  const baseSoundUrlLatest =
    "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest";
  const baseSoundUrlLegacy =
    "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy";

  // Dimensioni delle icone
  const shinyIconSize = "w-7 h-7";
  const playIconSize = "w-6 h-6";
  const megaIconSize = "w-6 h-6";

  // Stato per controllare se il suono è in riproduzione
  const [isPlaying, setIsPlaying] = useState(false);

  // Stato per determinare se il Pokémon può mega evolversi
  const [canMegaEvolve, setCanMegaEvolve] = useState(false);

  /**
   * Costruisce l'URL per il suono del Pokémon in base al suo ID
   * @param {number} pokemonId - ID del Pokémon
   * @returns {string} - URL del suono
   */
  const getSoundUrl = (pokemonId) => {
    if (!pokemonId) return null;
    const baseUrl = pokemonId >= 650 ? baseSoundUrlLatest : baseSoundUrlLegacy;
    return `${baseUrl}/${pokemonId}.ogg`;
  };

  /**
   * Verifica se l'URL del suono è valido
   * @param {string} url - URL del suono
   * @returns {Promise<boolean>} - Promessa che indica se l'URL è valido
   */
  const checkSoundUrl = async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok;
    } catch {
      return false;
    }
  };

  /**
   * Riproduce il suono del Pokémon se non è già in riproduzione
   */
  const playSound = async () => {
    const soundUrl = getSoundUrl(pokemonId);
    if (soundUrl) {
      if (isPlaying) return; // Non fare nulla se il suono è già in riproduzione
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
      {/* Pulsante per attivare/disattivare la modalità shiny */}
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

      {/* Pulsante per riprodurre il verso del Pokémon */}
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

      {/* Componente che gestisce se il Pokémon può mega evolversi */}
      <CanMegaEvolve
        pokemonName={pokemonName}
        setCanMegaEvolve={setCanMegaEvolve}
        setMegaSprite={setMegaSprite}
        setMegaShinySprite={setMegaShinySprite}
      />

      {/* Pulsante per attivare/disattivare la mega evoluzione, visibile solo se il Pokémon può mega evolversi */}
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
