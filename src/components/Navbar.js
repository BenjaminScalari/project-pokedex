import React, { useState } from "react";
import { Menu } from "@headlessui/react";
import {
  ChevronDownIcon,
  MenuIcon,
  XIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import { Link, useLocation } from "react-router-dom";
import NavbarTypes from "./NavbarTypes";
import NavbarSearch from "./NavbarSearch";
import { getGenerationName } from "./utilities/RegionGeneration";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const location = useLocation();
  const generations = [
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
    { number: 5 },
    { number: 6 },
    { number: 7 },
    { number: 8 },
  ];

  const showSearchBar = location.pathname !== "/";
  const hideLoginButton =
    location.pathname === "/login" || location.pathname === "/register";

  const handleSearchIconClick = () => {
    setSearchVisible(true);
  };

  const handleSearchBarClose = () => {
    setSearchVisible(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center backdrop-blur-lg bg-black/75 z-50">
      {/* Pulsante dell'hamburger menu visibile su mobile */}
      <button
        className="md:hidden text-white p-4"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      {/* Contenuti centrali della navbar */}
      <div className="flex-grow flex items-center space-x-4 p-4">
        <div className="hidden md:flex items-center space-x-4">
          <Menu as="div" className="relative">
            <Menu.Button className="text-white inline-flex items-center">
              Generazioni
              <ChevronDownIcon className="ml-1 h-5 w-5" />
            </Menu.Button>
            <Menu.Items className="absolute left-0 mt-2 w-96 max-h-80 overflow-auto rounded-md shadow-lg bg-black/75 backdrop-blur-md border-2">
              <div className="grid grid-cols-3 gap-2 p-2">
                {generations.map(({ number }) => (
                  <Menu.Item key={number}>
                    {({ active }) => (
                      <Link
                        to={`/generation/${number}`}
                        className={`block px-4 py-2 rounded-md text-center transition-colors duration-300 text-md ${
                          active ? "bg-gray-100 text-black" : "text-white"
                        } hover:text-black`}
                      >
                        {number}. {getGenerationName(number)}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Menu>
          <NavbarTypes />
          <Link to="/random-pokemon" className="text-white">
            Un Pokémon a Caso
          </Link>
          <Link to="/nationaldex" className="text-white">
            Dex Nazionale
          </Link>
        </div>
      </div>

      {/* Barra di ricerca visibile su desktop e mobile */}
      {showSearchBar && !searchVisible && (
        <div className="hidden md:flex items-center ml-auto pr-4">
          <NavbarSearch />
        </div>
      )}

      {/* Pulsante di ricerca per mobile */}
      {showSearchBar && !searchVisible && (
        <button
          className="md:hidden text-white ml-auto pr-4"
          onClick={handleSearchIconClick}
          aria-label="Search"
        >
          <SearchIcon className="h-6 w-6" />
        </button>
      )}

      {/* Barra di ricerca visibile solo su mobile */}
      {showSearchBar && searchVisible && (
        <div className="md:hidden flex items-center ml-auto">
          <NavbarSearch />
          <button
            className="ml-4 text-white pr-4"
            onClick={handleSearchBarClose}
            aria-label="Close search"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* Pulsante Login/Registrazione */}
      {!hideLoginButton && (
        <div className="ml-auto">
          <Link
            to="/login"
            className="text-white px-4 py-2 rounded-full hover:bg-[#9d0000] transition duration-300"
          >
            Accedi/Registrati
          </Link>
        </div>
      )}

      {/* Menu laterale per mobile */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-[#191919] p-4 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <button
          className="text-white absolute top-4 right-4"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div className="flex flex-col space-y-4 mt-8 p-4 bg-[#191919]">
          <Menu as="div" className="relative">
            <Menu.Button className="text-white inline-flex items-center">
              Generazioni
              <ChevronDownIcon className="ml-1 h-5 w-5" />
            </Menu.Button>
            <Menu.Items className="absolute left-0 mt-2 w-64 max-h-80 overflow-auto rounded-md shadow-lg bg-black/40 backdrop-blur-md">
              <div className="grid grid-cols-3 gap-2 p-2">
                {generations.map(({ number }) => (
                  <Menu.Item key={number}>
                    {({ active }) => (
                      <Link
                        to={`/generation/${number}`}
                        className={`block px-4 py-2 rounded-md text-center transition-colors duration-300 text-sm ${
                          active ? "bg-gray-100 text-black" : "text-white"
                        } hover:text-black`}
                      >
                        {number}. {getGenerationName(number)}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Menu>
          <NavbarTypes />
          <Link to="/random-pokemon" className="text-white">
            Un Pokémon a Caso
          </Link>
          <Link to="/nationaldex" className="text-white">
            Dex Nazionale
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
