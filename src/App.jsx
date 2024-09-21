import { useState, useEffect } from "react";
import axios from "axios"; // Pour faire les requêtes API
import SplashScreen from "./components/SplashScreen/SplashScreen";
import MainMenu from "./components/MainMenu/MainMenu";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import UserMenu from "./components/UserMenu/UserMenu";
import { UserProvider, useUser } from "./UserContext";
import "./App.css";
import UserNFT from "./components/userNFT/UserNFT";
import UserCryptos from "./components/userCrytpos/userCryptos";

function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [view, setView] = useState("splash");
  const { setUser } = useUser(); // Utilisation du contexte utilisateur pour définir l'utilisateur connecté

  useEffect(() => {
    // Vérification si le token est présent dans localStorage
    const token = localStorage.getItem("jwtToken");

    if (token) {
      // Si le token existe, validation avec l'API
      axios
        .get("https://constelium-api.vercel.app/user/verify-token", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.success) {
            // Si le token est valide, mettre à jour l'utilisateur dans le contexte
            setUser(response.data.user);
            setView("userMenu"); // Rediriger vers UserMenu
          } else {
            setView("menu"); // Si le token est invalide, afficher le menu principal
          }
        })
        .catch(() => {
          setView("menu"); // En cas d'erreur, rediriger vers le menu
        });
    } else {
      // Si aucun token n'est présent, afficher le splash screen puis rediriger vers le menu
      setTimeout(() => {
        setSplashDone(true);
        setView("menu");
      }, 2500);
    }
  }, [setUser]);

  return (
    <UserProvider>
      <div className="mainScreen">
        {view === "splash" && <SplashScreen />}
        {view === "menu" && splashDone && <MainMenu setView={setView} />}
        {view === "register" && <RegisterForm />}
        {view === "userMenu" && <UserMenu setView={setView} />}
        {view === "NFTs" && <UserNFT setView={setView} />}
        {view === "CRYPTOS" && <UserCryptos setView={setView} />}
        {view === "login" && <LoginForm setView={setView} />}
        {view === "profile" && <ProfilePage setView={setView} />}
      </div>
    </UserProvider>
  );
}

export default App;
