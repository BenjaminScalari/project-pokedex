// src/components/Navbar.js
import React, { useState } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon, MenuIcon, XIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import NavbarTypes from "./NavbarTypes";
import { getGenerationName } from "./utilities/RegionGeneration";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <nav className="fixed top-0 left-0 w-full p-4 flex justify-between items-center backdrop-blur-lg bg-black/75 z-50">
      <div className="hidden md:flex space-x-4">
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

      <button
        className="md:hidden text-white ml-auto"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      <div
        className={`fixed top-0 right-0 w-64 h-full bg-[#191919] p-4 transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
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
