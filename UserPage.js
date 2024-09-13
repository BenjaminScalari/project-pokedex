import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

const clientId =
  "129927102347-5lhjeqb9bavq1rcfdu0tnleua1o0o6gm.apps.googleusercontent.com";

function UserPage() {
  const [profileImage, setProfileImage] = useState(null); // Stato per l'immagine del profilo
  const [showMenu, setShowMenu] = useState(false); // Stato per gestire la visibilità del menù
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Stato per gestire il popup dell'immagine del profilo
  const [showMessage, setShowMessage] = useState(false); // Stato per mostrare il messaggio
  const navigate = useNavigate();

  // Funzione di logout manuale
  const handleLogout = () => {
    // Pulisce il token di accesso (se necessario)
    window.gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(() => {
        console.log("LOGOUT SUCCESS");
        navigate("/login");
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  const handleImageClick = () => {
    if (profileImage) {
      setIsPopupOpen(true); // Apre il popup quando l'immagine del profilo è presente
    } else {
      setShowMessage(true); // Mostra il messaggio se non c'è immagine del profilo
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Chiude il popup
  };

  const closeMessage = () => {
    setShowMessage(false); // Chiude il messaggio
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="w-full flex flex-col items-center justify-center min-h-screen text-white">
        <div className="bg-[#303030] p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Benvenuto nella tua pagina utente
          </h2>
          <p className="text-center mb-4">
            Qui puoi gestire le tue informazioni personali e i Pokémon salvati.
          </p>

          {/* Sezione Immagine Profilo */}
          <div className="flex flex-col items-center mb-6">
            <div className="mb-4">
              <img
                src={profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover cursor-pointer"
                onClick={handleImageClick} // Mostra il popup o il messaggio al click
              />
            </div>

            {/* Tasto per l'immagine del profilo con menù a tendina */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="cursor-pointer bg-gray-700 py-2 px-4 rounded hover:bg-gray-600 transition"
              >
                Immagine del profilo
              </button>

              {/* Menù che appare al click */}
              {showMenu && (
                <div className="absolute top-12 left-0 bg-gray-700 p-2 rounded shadow-lg">
                  <ul>
                    {/* Modifica immagine */}
                    <li className="py-1 px-4 hover:bg-gray-600 cursor-pointer">
                      <label className="cursor-pointer">
                        Modifica
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            handleImageChange(e);
                            setShowMenu(false);
                          }}
                          className="hidden"
                        />
                      </label>
                    </li>

                    {/* Elimina immagine */}
                    <li
                      className="py-1 px-4 hover:bg-gray-600 cursor-pointer"
                      onClick={() => {
                        handleRemoveImage();
                        setShowMenu(false);
                      }}
                    >
                      Elimina
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Popup per visualizzare l'immagine del profilo */}
          {isPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
              <div className="relative">
                <img
                  src={profileImage || "https://via.placeholder.com/150"}
                  alt="Profile Popup"
                  className="w-64 h-64 rounded-full object-cover"
                />
                <button
                  onClick={closePopup}
                  className="absolute top-2 right-2 text-white bg-gray-700 rounded-full px-2 py-1"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Messaggio per informare che non c'è un'immagine del profilo */}
          {showMessage && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
              <div className="bg-gray-800 p-4 rounded-lg text-white text-center">
                <p>Non hai ancora impostato un'immagine del profilo.</p>
                <button
                  onClick={closeMessage}
                  className="mt-4 bg-red-600 py-2 px-4 rounded hover:bg-red-700 transition"
                >
                  Chiudi
                </button>
              </div>
            </div>
          )}

          {/* Sezione Pokémon Preferiti */}
          <div className="bg-[#404040] p-4 rounded-lg w-full text-center">
            <h3 className="text-xl font-semibold mb-4">Pokémon Preferiti</h3>
            <p className="text-gray-400">
              Non hai ancora salvato nessun Pokémon nei preferiti.
            </p>
          </div>

          {/* Tasto Logout */}
          <div id="signOutButton" className="my-4">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default UserPage;
