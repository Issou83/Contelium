import PropTypes from "prop-types";
import "./index.css";

function UserMenu({ setView }) {
  return (
    <div className="mainUserMenu">
      <button className="btnmainUserMenu" onClick={() => setView("profile")}>
        Voir le profil
      </button>
      <button className="btnmainUserMenu" onClick={() => setView("NFTs")}>
        Voir mes NFTs
      </button>
      <button className="btnmainUserMenu" onClick={() => setView("CRYPTOS")}>
        Voir mes CRYPTOS
      </button>
      {/*Autres options si nécessaire */}
    </div>
  );
}

UserMenu.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default UserMenu;
