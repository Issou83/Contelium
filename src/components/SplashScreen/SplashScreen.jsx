import { useEffect } from 'react';
import constPNG from "../../assets/conste.png"
import "./index.css"

const SplashScreen = () => {
  // Pas besoin de `setSplashDone` ici, car il est géré dans `App.jsx`
  useEffect(() => {
    // Le timer est également géré dans `App.jsx`
  }, []);

  return (
    <div className='splashScreen'>
      <h1 className='titleSplash'>CONSTELIUM</h1>
      {/* Remplacer avec le chemin réel vers votre logo */}
      <img className='Logo' src={constPNG} alt="Votre logo" />
    </div>
  );
};

export default SplashScreen;
