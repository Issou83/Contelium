import { useUser } from '../../UserContext'; // Importez le hook personnalisé

const UserProfile = () => {
  const { user } = useUser(); // Utilisez le hook pour accéder aux données de l'utilisateur

  if (!user) {
    return <p>Veuillez vous connecter pour voir le profil.</p>;
  }

  return (
    <div>
      <h1>Profil ulisateur : {user.username}</h1>
      <p>Email : {user.email}</p>
      {/* Ajoutez d'autres champs si nécessaire */}
    </div>
  );
};

export default UserProfile;
