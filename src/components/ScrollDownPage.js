import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollDownPage = ({
  borderColor = "#FFFFFF",
  backgroundColor = "#FFFFFF80",
}) => {
  const [visible, setVisible] = useState(true); // Imposta visibilità iniziale a true
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Mostra il pulsante quando non è in fondo e la pagina non è la home
      if (location.pathname !== "/") {
        setVisible(
          window.scrollY < document.body.scrollHeight - window.innerHeight - 50
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  // Imposta il colore dell'icona basato sullo sfondo
  const iconColor = backgroundColor === "#FFFFFF80" ? "#000000" : "#FFFFFF";

  return (
    <button
      onClick={scrollToBottom}
      className={`fixed bottom-4 left-4 rounded-full p-4 shadow-lg border-2 transition-opacity duration-300 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        borderColor: borderColor, // Colore del bordo
        backgroundColor: backgroundColor, // Colore del background con opacità
        zIndex: 1000,
      }}
      aria-label="Scroll to bottom"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
};

export default ScrollDownPage;
