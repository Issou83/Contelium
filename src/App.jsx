import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen/SplashScreen';  // Assurez-vous de l'ajouter à vos composants
import MainMenu from './components/MainMenu/MainMenu';  // Assurez-vous de l'ajouter à vos composants
import RegisterForm from './components/RegisterForm/RegisterForm'; // À ajouter
import LoginForm from './components/LoginForm/LoginForm'; // À ajouter
import UserProfile from './components/UserProfile/UserProfile';

import './App.css'

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
    <div className='mainScreen'>
      {view === 'splash' && <SplashScreen />}
      {view === 'menu' && splashDone && <MainMenu setView={setView} />}
      {view === 'register' && <RegisterForm />}
      {view === 'login' && <LoginForm />}
      {view === 'profile' && <UserProfile />}
    </div>
  );
}

export default App;

