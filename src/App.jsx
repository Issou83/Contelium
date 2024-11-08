import { useState, useEffect } from "react";
import axios from "axios"; // Pour faire les requêtes API
import SplashScreen from "./components/SplashScreen/SplashScreen";
import MainMenu from "./components/MainMenu/MainMenu";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import UserMenu from "./components/UserMenu/UserMenu";
import { useUser } from "./UserContext";
import "./App.css";
import UserNFT from "./components/userNFT/UserNFT";
import UserCryptos from "./components/userCrytpos/userCryptos";

function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [view, setView] = useState("splash");
  const { user, setUser } = useUser(); // Utilisation du contexte utilisateur

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token && user) {
      console.log("Token récupéré depuis localStorage:", token);
      axios
        .get("https://constelium-api.vercel.app/user/verify-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setUser(response.data.user);
            setView("userMenu");
          } else {
            console.warn("Le token n'est pas valide.");
            localStorage.removeItem("jwtToken");
            setView("menu");
            alert("Votre session a expiré. Veuillez vous reconnecter.");
          }
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la vérification du token:",
            error.response?.data || error.message
          );
          localStorage.removeItem("jwtToken");
          setView("menu");
        });
    } else if (!token) {
      setTimeout(() => {
        setSplashDone(true);
        setView("menu");
      }, 2500);
    }
  }, [user, setUser]);

  return (
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
  );
}

export default App;
