import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import HomeBtn from "./components/HomeBtn";
import ScrollUpPage from "./components/ScrollUpPage";
import ScrollDownPage from "./components/ScrollDownPage";
import { TYPE_COLORS } from "./components/utilities/TypeColors";

// PAGINE
import NationalDex from "./components/pages/NationalDex";
import RandomPokemon from "./components/pages/RandomPokemon";
import TypeOrder from "./components/pages/TypeOrder";
import GenOrder from "./components/pages/GenOrder";
import InfoPage from "./components/pages/InfoPage";

function AppContent() {
  const location = useLocation();

  const getColors = () => {
    const defaultColor = "#FFFFFF";

    if (location.pathname.startsWith("/type/")) {
      const type = location.pathname.split("/type/")[1];
      return {
        borderColor: TYPE_COLORS[type] || defaultColor,
        backgroundColor: (TYPE_COLORS[type] || defaultColor) + "80",
      };
    }

    return {
      borderColor: defaultColor,
      backgroundColor: defaultColor + "80",
    };
  };

  const { borderColor, backgroundColor } = getColors();

  return (
    <div className="App">
      <Navbar />
      <div className="flex flex-col items-center h-screen space-y-4">
        <Routes>
          <Route path="/" element={<Searchbar />} />
          <Route path="/nationaldex" element={<NationalDex />} />
          <Route path="/random-pokemon" element={<RandomPokemon />} />
          <Route path="/type/:type" element={<TypeOrder />} />
          <Route path="/generation/:number" element={<GenOrder />} />
          <Route path="/pokemon/:id" element={<InfoPage />} />{" "}
        </Routes>
      </div>
      {location.pathname !== "/" && (
        <>
          <HomeBtn
            borderColor={borderColor}
            backgroundColor={backgroundColor}
          />
          <ScrollUpPage
            borderColor={borderColor}
            backgroundColor={backgroundColor}
          />
          <ScrollDownPage
            borderColor={borderColor}
            backgroundColor={backgroundColor}
          />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
