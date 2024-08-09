import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const HomeBtn = ({
  borderColor = "#FFFFFF",
  backgroundColor = "#FFFFFF80",
}) => {
  const location = useLocation();
  const [scrollUpVisible, setScrollUpVisible] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollUpVisible(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    const timer = setTimeout(() => {
      if (buttonRef.current) {
        const forceReflow = buttonRef.current.offsetHeight;
      }
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (location.pathname === "/") {
    return null;
  }

  return (
    <Link
      ref={buttonRef}
      to="/"
      className={`fixed bottom-4 right-4 rounded-full p-4 shadow-lg border-2 transition-all duration-300
        ${
          scrollUpVisible
            ? "md:-translate-y-20 sm:-translate-y-20 -translate-y-20"
            : ""
        }`}
      style={{
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        zIndex: 1000,
      }}
      aria-label="Torna alla home"
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
        <path d="M3 9.5L12 3l9 6.5v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-11z" />
        <path d="M9 22V12h6v10" />
      </svg>
    </Link>
  );
};

export default HomeBtn;
