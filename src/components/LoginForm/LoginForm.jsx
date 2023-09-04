import { useState } from 'react';
import './index.css'; // Créez ce fichier pour ajouter des styles

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Effectuer des validations de formulaire ici
    
    // Simuler un appel API
    setTimeout(() => {
      console.log('Utilisateur connecté avec succès : ', { username, password });
      // Ici, vous pouvez passer à la page personnalisée de l'utilisateur ou faire ce que vous voulez après une connexion réussie
    }, 2000);
  };

  return (
    <div className='loginForm'>
      <h1>Se connecter</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Pseudo'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='Mot de passe'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;
