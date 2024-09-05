import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Homepage";
import HomeBtn from "./components/HomeBtn";
import ScrollUpPage from "./components/ScrollUpPage";
import ScrollDownPage from "./components/ScrollDownPage";
import { TYPE_COLORS } from "./components/utilities/TypeColors";
import { GoogleOAuthProvider } from "@react-oauth/google";

// PAGINE
import NationalDex from "./components/pages/NationalDex";
import RandomPokemon from "./components/pages/RandomPokemon";
import TypeOrder from "./components/pages/TypeOrder";
import GenOrder from "./components/pages/GenOrder";
import InfoPage from "./components/pages/InfoPage";
import LoginPage from "./components/pages/LoginPage";
import RegistrationPage from "./components/pages/RegistrationPage";

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
      {location.pathname === "/" && (
        <div className="w-full h-screen flex items-center justify-center">
          <Searchbar />
        </div>
      )}
      {location.pathname !== "/" && (
        <div className="flex flex-col items-center h-screen space-y-4">
          <Routes>
            <Route path="/nationaldex" element={<NationalDex />} />
            <Route path="/random-pokemon" element={<RandomPokemon />} />
            <Route path="/type/:type" element={<TypeOrder />} />
            <Route path="/generation/:number" element={<GenOrder />} />
            <Route path="/pokemon/:id" element={<InfoPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
          </Routes>
        </div>
      )}
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
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <AppContent />
      </GoogleOAuthProvider>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
