import { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    return re.test(String(password));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    
    if (!validatePassword(formData.password)) {
      validationErrors.password = 'Le mot de passe doit contenir au moins 10 caractères, une majuscule, une minuscule et un caractère spécial.';
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Simuler un appel API
      console.log('Envoi des données : ', formData);
    }
  };

  // Simuler un appel API
setTimeout(() => {
    console.log('Utilisateur enregistré avec succès : ', formData);
    // Ici, vous pouvez passer à l'écran de connexion ou faire ce que vous voulez après un enregistrement réussi
  }, 2000);
  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Pseudo"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      {errors.password && <p>{errors.password}</p>}
      <input
        type="password"
        placeholder="Confirmer le mot de passe"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      <button type="submit">Inscription</button>
    </form>
  );
};

export default RegisterForm;
