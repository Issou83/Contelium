import { useState } from "react";
import axios from "axios";
import { useUser } from "../../UserContext"; // Import du UserContext
import PropTypes from "prop-types";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
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
        alert("Connexion Réussie");
        setUser(response.data.user);
        setView("userMenu"); // Redirigez l'utilisateur vers le UserMenu après une connexion réussie
      } else {
        setErrorMessage("Échec de l'authentification");
        alert("Échec de la connexion");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Échec de l'authentification");
        alert("Échec de la connexion");
      } else {
        console.error("Une erreur est survenue:", error);
        alert("Une erreur est survenue lors de la tentative de connexion");
      }
    }
  };

  const handleOAuthSuccess = (response) => {
    console.log("OAuth response:", response);
    // Gérer l'intégration avec votre backend ici si nécessaire
    alert("Connexion via Google réussie");
    setView("userMenu");
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
