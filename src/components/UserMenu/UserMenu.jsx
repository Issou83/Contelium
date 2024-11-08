import PropTypes from "prop-types";
import { useUser } from "../../UserContext"; // Import du contexte utilisateur
import "./index.css";

function UserMenu({ setView }) {
  const { updateUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Supprime le token du localStorage
    updateUser(null); // Réinitialise l'état de l'utilisateur dans le contexte
    setView("menu"); // Redirige vers le menu principal ou la page de connexion
  };

  return (
    <div className="mainUserMenu">
      <button className="btnmainUserMenu" onClick={() => setView("profile")}>
        Profil
      </button>
      <button className="btnmainUserMenu" onClick={() => setView("NFTs")}>
        NFTs
      </button>
      <button className="btnmainUserMenu" onClick={() => setView("CRYPTOS")}>
        CRYPTOS
      </button>
      <button className="btnmainUserMenu" onClick={() => setView("mood")}>
        Mood
      </button>
      <button className="btnmainUserMenu" onClick={handleLogout}>
        Log out
      </button>
      {/*Autres options si nécessaire */}
    </div>
  );
}

UserMenu.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default UserMenu;
