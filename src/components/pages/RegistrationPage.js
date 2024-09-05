import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Le password non coincidono!");
      return;
    }
    // Logica per gestire la registrazione se necessaria (senza backend)
  };

  const handleGoogleRegister = (response) => {
    const token = response.credential;
    console.log("Google Token:", token);
    // Potresti voler gestire il token localmente
    // Come salvarlo in LocalStorage o State per uso futuro
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen text-white">
      <div className="bg-[#303030] p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Registrazione</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="confirmPassword"
            >
              Conferma Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 py-2 rounded text-white hover:bg-blue-700 transition"
          >
            Registrati
          </button>
        </form>

        <div className="my-4 text-center">o</div>

        <GoogleLogin
          onSuccess={handleGoogleRegister}
          onError={(error) =>
            console.error("Google registration error:", error)
          }
        />

        <p className="mt-6 text-center">
          Hai già un account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Accedi
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegistrationPage;
