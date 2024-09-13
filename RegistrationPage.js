import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import AuthContext from "../AuthContext";

const clientId =
  "129927102347-5lhjeqb9bavq1rcfdu0tnleua1o0o6gm.apps.googleusercontent.com";

function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Le password non coincidono!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const result = await response.json();
      console.log("Registration success:", result);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const onSuccess = (res) => {
    console.log("REGISTRATION SUCCESS! Current user: ", res.profile);
    const token = res.credential;
    login(token);
    navigate("/user");
  };

  const onFailure = (res) => {
    console.log("REGISTRATION FAILED! res: ", res);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
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

          <div id="signInButton" className="my-4 flex justify-center">
            <GoogleLogin
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                  Registrati con Google
                </button>
              )}
            />
          </div>

          <p className="mt-6 text-center">
            Hai già un account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Accedi
            </Link>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default RegistrationPage;
