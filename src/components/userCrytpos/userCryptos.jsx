import { useState, useEffect } from "react";
import { useUser } from "../../UserContext";
import TradinWiewWidget from "../TradingViewWidget/TradingWiew";
import "./index.css";

function UserCryptos() {
  return (
    <div className="searchNFT">
      <TradinWiewWidget />
    </div>
  );
}

export default UserCryptos;
