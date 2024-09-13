import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

const clientId =
  "129927102347-5lhjeqb9bavq1rcfdu0tnleua1o0o6gm.apps.googleusercontent.com";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        // URL dell'endpoint di login
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Memorizza il token
        navigate("/user"); // Redirect alla pagina utente
      } else {
        console.log("Login failed:", data.message);
        // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
    const token = res.tokenId; // Estrai il token dal res
    localStorage.setItem("token", token); // Memorizza il token
    navigate("/user"); // Redirect alla pagina utente
  };

  const onFailure = (res) => {
    console.log("LOGIN FAILED! res: ", res);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen text-white">
      <div className="bg-[#303030] p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Accedi</h2>
        <form onSubmit={handleLogin}>
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
          <div className="mb-6">
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
          <button
            type="submit"
            className="w-full bg-blue-600 py-2 rounded text-white hover:bg-blue-700 transition"
          >
            Accedi
          </button>

          <div id="signInButton" className="my-4 flex justify-center">
            <GoogleLogin
              clientId={clientId}
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                  Login con Google
                </button>
              )}
            />
          </div>
        </form>

        <p className="mt-6 text-center">
          Non hai un account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Registrati
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
