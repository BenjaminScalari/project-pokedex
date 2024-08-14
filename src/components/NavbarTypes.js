import React from "react";
import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { TYPE_TRANSLATIONS, TYPE_COLORS } from "./utilities/TypeColors.js";

function NavbarTypes() {
  const types = Object.keys(TYPE_TRANSLATIONS);

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="text-white inline-flex items-center">
        Tipi
        <ChevronDownIcon className="ml-1 h-5 w-5" />
      </Menu.Button>
      {/* IMPOSTAZIONI DROPDOWN TIPI */}
      <Menu.Items
        className="
          absolute left-0 mt-2 
          w-full max-w-xs  /* Larghezza generale per mobile */
          md:w-80  /* Larghezza per desktop con breakpoint xl */
          rounded-md shadow-lg 
          bg-black/75 backdrop-blur-md border-2"
      >
        <div
          className="
            grid grid-cols-2 gap-1 p-1  /* Griglia 2x9 come default */
            md:grid-cols-3 md:gap-2 md:p-2  /* Griglia 3xN per desktop con breakpoint xl */"
        >
          {types.map((type) => (
            <Menu.Item key={type}>
              {({ active }) => (
                <Link
                  to={`/type/${type}`}
                  className="block px-2 rounded-3xl text-center transition-colors duration-300 flex items-center justify-center"
                  style={{
                    backgroundColor: active ? "#202020" : TYPE_COLORS[type],
                    color: active ? TYPE_COLORS[type] : "white",
                    border: `4px solid ${
                      active ? TYPE_COLORS[type] : "transparent"
                    }`,
                  }}
                >
                  <span
                    className={`transition-colors duration-300 ${
                      active ? "font-bold" + TYPE_COLORS[type] : "font-normal"
                    }`}
                    style={{
                      backgroundColor: "transparent",
                      color: active ? TYPE_COLORS[type] : "white",
                      borderRadius: "4px",
                      display: "inline-block",
                      textAlign: "center",
                      padding: "2px 4px",
                      fontSize: "16px", // Dimensione font dei tipi
                    }}
                  >
                    {TYPE_TRANSLATIONS[type]}
                  </span>
                </Link>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
}

export default NavbarTypes;
