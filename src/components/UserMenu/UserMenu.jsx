import PropTypes from 'prop-types'; // Ajoutez cette ligne



function UserMenu({ setView }) {
  return (
    <div>
      <button onClick={() => setView('profile')}>Voir le profil</button>
      <button onClick={() => setView('NFTs')}>Voir mes NFTs</button>
      {/* Ajoutez d'autres options si nécessaire */}
    </div>
  );
}

UserMenu.propTypes = {
    setView: PropTypes.func.isRequired,
  };

export default UserMenu;
