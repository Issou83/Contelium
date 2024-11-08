import { useState, useEffect } from "react";
import { useUser } from "../../UserContext";
import axios from "axios";

function UserProfile() {
  const { user, updateUser } = useUser();

  const [editable, setEditable] = useState(false);

  const [formData, setFormData] = useState({
    username: user ? user.username : "",
    email: user ? user.email : "",
    ethAddress: user ? user.ethAddress : "",
  });

  useEffect(() => {
    setFormData({
      username: user ? user.username : "",
      email: user ? user.email : "",
      ethAddress: user ? user.ethAddress : "",
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    setEditable(!editable);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.put(
        "https://constelium-api.vercel.app/user/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        updateUser(response.data.user); // Mettre à jour le contexte utilisateur
        setEditable(false);
      } else {
        alert("Erreur lors de la mise à jour du profil");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil", error);
      alert("Erreur lors de la mise à jour du profil");
    }
  };

  return (
    <div>
      <h2>Profil</h2>
      <div>
        <label>Pseudo:</label>
        {editable ? (
          <input
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        ) : (
          <p>{user ? user.username : "Chargement..."}</p>
        )}
      </div>
      <div>
        <label>Email:</label>
        {editable ? (
          <input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
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
