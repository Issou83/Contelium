import { useState, useEffect } from "react";
import { useUser } from '../../UserContext';

function UserProfile() {
  const { user, updateUser } = useUser();

  const [editable, setEditable] = useState(false);

  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    ethAddress: user ? user.ethAddress : ""
  });

  useEffect(() => {
    setFormData({
      name: user ? user.name : "",
      email: user ? user.email : "",
      ethAddress: user ? user.ethAddress : ""
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    setEditable(!editable);
  };

  const handleUpdate = () => {
    updateUser(formData); // Mettez à jour les données de l'utilisateur.
    setEditable(false);
  };

  return (
    <div>
      <h2>Profil</h2>
      <div>
        <label>Nom:</label>
        {editable ? (
          <input name="name" value={formData.name} onChange={handleInputChange} />
        ) : (
          <p>{user ? user.name : "Chargement..."}</p>
        )}
      </div>
      <div>
        <label>Email:</label>
        {editable ? (
          <input name="email" value={formData.email} onChange={handleInputChange} />
        ) : (
          <p>{user ? user.email : "Chargement..."}</p>
        )}
      </div>
      <div>
        <label>Adresse Ethereum:</label>
        <p>{user ? user.ethAddress : "Chargement..."}</p>
      </div>
      {editable ? (
        <button onClick={handleUpdate}>Mettre à jour</button>
      ) : (
        <button onClick={handleEditToggle}>Modifier</button>
      )}
    </div>
  );
}

export default UserProfile;