import PropTypes from "prop-types";
import "./index.css";

function MainMenu({ setView }) {
  return (
    <div className="homeMenu">
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

      <button className="btnHomeMenu" onClick={() => setView("register")}>
        Créer un compte
      </button>
      <button className="btnHomeMenu" onClick={() => setView("login")}>
        Se connecter
      </button>
    </div>
  );
}

MainMenu.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default MainMenu;
