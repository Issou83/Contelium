import { useState } from "react";
import axios from "axios";
import "./index.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/user/login", {
        username,
        password,
      });

      if (response.data.success) {
        console.log("Authentification réussie:", response.data);
      } else {
        console.log("Échec de l'authentification");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Échec de l'authentification");
      } else {
        console.error("Une erreur est survenue:", error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="loginForm">
      <h1>Se connecter</h1>
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
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;
