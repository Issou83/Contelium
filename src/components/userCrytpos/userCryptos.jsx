import { useState, useEffect } from "react";
import { useUser } from "../../UserContext";
import TradinWiewWidget from "../TradingViewWidget/TradingWiew";
import PropTypes from "prop-types";
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
        Accueil
      </button>
    </div>
  );
}

UserCryptos.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default UserCryptos;
