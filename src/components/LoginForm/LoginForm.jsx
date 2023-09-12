import { useState } from "react";
import axios from "axios";
import { useUser } from '../../UserContext';  // Import du UserContext
import PropTypes from 'prop-types';
import "./index.css"

const LoginForm = ({ setView }) => {
  const { setUser } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/user/login", {
        username,
        password,
      });

      if (response.data.success) {
        console.log("Authentification réussie:", response.data);
        setUser(response.data.user);
        setView('userMenu');  // Redirigez l'utilisateur vers le UserMenu après une connexion réussie
      } else {
        setErrorMessage("Échec de l'authentification");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Échec de l'authentification");
      } else {
        console.error("Une erreur est survenue:", error);
        setErrorMessage("Une erreur est survenue lors de la tentative de connexion");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="registerMain">
      <h1 className="titleSplash">
        {/*... partie titre ...*/}
      </h1>
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
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default LoginForm;
