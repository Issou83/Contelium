import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen/SplashScreen';
import MainMenu from './components/MainMenu/MainMenu';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';
import ProfilePage from './components/ProfilePage/ProfilePage'; // Importez le nouveau composant
import UserMenu from './components/UserMenu/UserMenu';


import { UserProvider } from './UserContext';

import './App.css'
import UserNFT from './components/userNFT/UserNFT';

function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [view, setView] = useState('splash');

  useEffect(() => {
    if (view === 'splash') {
      setTimeout(() => {
        setSplashDone(true);
        setView('menu');
      }, 2000);
    }
  }, [view]);

  return (
    <UserProvider>
      <div className='mainScreen'>
        {view === 'splash' && <SplashScreen />}
        {view === 'menu' && splashDone && <MainMenu setView={setView} />}
        {view === 'register' && <RegisterForm />}
                {view === 'userMenu' && <UserMenu setView={setView} />}
                {view === 'NFTs' && <UserNFT />}

        {view === 'login' && <LoginForm setView={setView} />}
        {view === 'profile' && <ProfilePage />}  {/* Remplacez <UserProfile /> par <ProfilePage /> */}
      </div>
    </UserProvider>
  );
}

export default App;
