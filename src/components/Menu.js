import React, { useState } from "react";
import { Link } from "react-router-dom";

const MenuBtn = ({
  borderColor = "#FFFFFF",
  backgroundColor = "#FFFFFF80",
}) => {
  // Stato per gestire la visibilità del menu
  const [menuVisible, setMenuVisible] = useState(false);

  // Funzione per alternare la visibilità del menu
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Pulsante Menu principale */}
      <button
        onClick={toggleMenu} // Al clic, cambia la visibilità del menu
        className="rounded-full p-4 shadow-lg border-2"
        style={{
          borderColor: borderColor, // Colore del bordo del pulsante
          backgroundColor: backgroundColor, // Colore di sfondo del pulsante
        }}
        aria-label="Menu" // Etichetta per accessibilità
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke={backgroundColor === "#FFFFFF80" ? "#000000" : "#FFFFFF"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Icona delle tre linee orizzontali */}
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Menu di tre tasti */}
      <div
        className={`absolute bottom-16 right-0 pb-1 flex flex-col items-center space-y-2 transition-transform duration-500 ease-in-out ${
          menuVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{
          transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
        }}
      >
        {/* Terzo tasto del menu */}
        <Link
          to="/option3" // Percorso della terza opzione
          className={`rounded-full p-4 shadow-lg border-2 transition-opacity duration-500 ${
            menuVisible ? "opacity-100 delay-[333ms]" : "opacity-0 delay-[333ms]"
          }`}
          style={{
            borderColor: borderColor, // Colore del bordo del tasto
            backgroundColor: backgroundColor, // Colore di sfondo del tasto
          }}
          aria-label="Opzione 3" // Etichetta per accessibilità
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke={backgroundColor === "#FFFFFF80" ? "#000000" : "#FFFFFF"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Icona delle tre linee orizzontali */}
            <path d="M5 12h14M5 6h14M5 18h14" />
          </svg>
        </Link>
        {/* Secondo tasto del menu */}
        <Link
          to="/option2" // Percorso della seconda opzione
          className={`rounded-full p-4 shadow-lg border-2 transition-opacity duration-500 ${
            menuVisible
              ? "opacity-100 delay-[166ms]"
              : "opacity-0 delay-[166ms]"
          }`}
          style={{
            borderColor: borderColor, // Colore del bordo del tasto
            backgroundColor: backgroundColor, // Colore di sfondo del tasto
          }}
          aria-label="Opzione 2" // Etichetta per accessibilità
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke={backgroundColor === "#FFFFFF80" ? "#000000" : "#FFFFFF"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Icona delle tre linee orizzontali */}
            <path d="M5 12h14M5 6h14M5 18h14" />
          </svg>
        </Link>
        {/* Primo tasto del menu */}
        <Link
          to="/option1" // Percorso della prima opzione
          className={`rounded-full p-4 shadow-lg border-2 transition-opacity duration-500 ${
            menuVisible ? "opacity-100 delay-0" : "opacity-0 delay-[0ms]"
          }`}
          style={{
            borderColor: borderColor, // Colore del bordo del tasto
            backgroundColor: backgroundColor, // Colore di sfondo del tasto
          }}
          aria-label="Opzione 1" // Etichetta per accessibilità
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke={backgroundColor === "#FFFFFF80" ? "#000000" : "#FFFFFF"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Icona delle tre linee orizzontali */}
            <path d="M5 12h14M5 6h14M5 18h14" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default MenuBtn;
