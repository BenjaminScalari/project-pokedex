import React, { useState, useEffect } from "react";

const ScrollUpPage = ({
  borderColor = "#FFFFFF",
  backgroundColor = "#FFFFFF80",
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 50); // Mostra il pulsante quando si scorre più di 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Imposta il colore dell'icona basato sullo sfondo in caso di selezione di un tipo
  const iconColor = backgroundColor === "#FFFFFF80" ? "#000000" : "#FFFFFF";

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 rounded-full p-4 shadow-lg border-2 transition-opacity duration-300 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        borderColor: borderColor, // Colore del bordo
        backgroundColor: backgroundColor, // Colore del background con opacità
      }}
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke={iconColor} // Colore dell'icona
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 15l-7-7-7 7" />
      </svg>
    </button>
  );
};

export default ScrollUpPage;
