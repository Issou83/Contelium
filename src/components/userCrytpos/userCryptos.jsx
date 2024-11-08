import PropTypes from "prop-types";
import TradinWiewWidget from "../TradingViewWidget/TradingWiew";
import "./index.css";

function UserCryptos({ setView }) {
  return (
    <div className="searchCryptos">
      <div className="tradinWiew">
        <TradinWiewWidget />
      </div>
      <button
        className="returnBtnmainUserMenu"
        onClick={() => setView("userMenu")}
      >
        Retour au menu
      </button>
    </div>
  );
}

UserCryptos.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default UserCryptos;
