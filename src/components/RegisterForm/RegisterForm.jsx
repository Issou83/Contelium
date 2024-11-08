import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./index.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier si tous les champs sont remplis avant d'envoyer la requête
    if (!formData.username || !formData.email || !formData.password) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    try {
      const response = await fetch(
        "https://constelium-api.vercel.app/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erreur lors de l'inscription.");
        return;
      }

      setSuccessMessage("Utilisateur enregistré avec succès !");
      setError(null);
      console.log("Utilisateur enregistré:", data.message);
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
      setError("Une erreur s'est produite. Veuillez réessayer plus tard.");
    }
  };

  const handleOAuthSuccess = (response) => {
    console.log("Inscription via OAuth réussie:", response);
    alert("Inscription via Google réussie");
  };

  const handleOAuthError = () => {
    console.error("Erreur lors de l'inscription via Google");
    alert("Erreur lors de l'inscription via Google");
  };

  return (
    <div className="registerMain">
      <h1 className="titleSplash">
        <span data-letter="C">C</span>
        <span data-letter="O">O</span>
        <span data-letter="N">N</span>
        <span data-letter="S">S</span>
        <span data-letter="T">T</span>
        <span data-letter="E">E</span>
        <span data-letter="L">L</span>
        <span data-letter="I">I</span>
        <span data-letter="U">U</span>
        <span data-letter="M">M</span>
      </h1>
      <div className="registerCase">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button className="btnValider" type="submit">
            Valider
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

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

export default RegisterForm;
