import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget() {
  const container = useRef();

  useEffect(() => {
    console.log("TradingViewWidget useEffect executed");
    localStorage.clear();

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "GATEIO:BTCUSDT",
          "timezone": "Europe/Brussels",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "withdateranges": true,
          "range": "ALL",
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "details": true,
          "hotlist": true,
          "calendar": false,
          "show_popup_button": true,
          "popup_width": "1000",
          "popup_height": "650",
          "support_host": "https://www.tradingview.com"
        }`;
    container.current.appendChild(script);

    return () => {
      container.current.removeChild(script);
    };
  }, []); // Pass an empty array to run this effect only once

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "85%", width: "100%" }}
    ></div>
  );
}

export default memo(TradingViewWidget);
