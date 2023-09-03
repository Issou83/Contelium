// eslint-disable-next-line no-unused-vars
import React from 'react';
import "./index.css"

const MainMenu = ({ setView }) => {
  return (
    <div className='homeMenu'>
            <h1 className='titleSplash'>CONSTELIUM</h1>

      <button className='btnHomeMenu' onClick={() => setView('register')}>Créer un compte</button>
      <button className='btnHomeMenu' onClick={() => setView('login')}>Se connecter</button>
    </div>
  );
}

export default MainMenu