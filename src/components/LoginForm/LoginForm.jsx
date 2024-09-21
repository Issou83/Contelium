import { useState } from "react";
import axios from "axios";
import { useUser } from "../../UserContext"; // Import du UserContext
import PropTypes from "prop-types";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"; // Import pour Google OAuth
import "./index.css";

const LoginForm = ({ setView }) => {
  const { setUser } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://constelium-api.vercel.app/user/login",
        {
          username,
          password,
        }
      );

      if (response.data.success) {
        console.log("Authentification réussie:", response.data);
        localStorage.setItem("jwtToken", response.data.token); // Stocker le token dans localStorage
        setUser(response.data.user);
        setView("userMenu"); // Rediriger vers UserMenu après la connexion
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setErrorMessage("Échec de la connexion");
    }
  };

  const handleOAuthSuccess = async (response) => {
    try {
      const googleToken = response.credential;
      const backendResponse = await axios.post(
        "https://constelium-api.vercel.app/user/oauth-login",
        {
          token: googleToken,
        }
      );

      if (backendResponse.data.success) {
        console.log("Connexion via Google réussie:", backendResponse.data);

        // Stocker le token dans localStorage
        localStorage.setItem("jwtToken", backendResponse.data.token);

        setUser(backendResponse.data.user);
        setView("userMenu"); // Rediriger vers UserMenu après une connexion réussie
      } else {
        alert("Erreur lors de la connexion via Google");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion Google", error);
      alert("Erreur lors de la connexion via Google");
    }
  };

  const handleOAuthError = () => {
    console.error("Erreur lors de l'authentification Google");
    alert("Erreur lors de la connexion via Google");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="registerMain">
      <h1 className="titleSplash">{/*... partie titre ...*/}</h1>
      <div className="loginCase">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Pseudo"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button type="submit">Se connecter</button>
        </form>

        {/* Bouton Google OAuth */}
        <GoogleOAuthProvider clientId="477152561324-4ss8k2mr137ufu5sljofoqeqhejc7ttc.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={handleOAuthSuccess}
            onError={handleOAuthError}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default LoginForm;
