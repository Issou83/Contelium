import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [oauthToken, setOauthToken] = useState(null); // Stocker les jetons OAuth si nécessaire

  // Fonction pour gérer la mise à jour utilisateur via connexion normale ou OAuth
  const updateUser = (userData, token = null) => {
    setUser(userData);
    if (token) {
      setOauthToken(token); // Stocker le jeton OAuth si fourni
    }
  };

  const value = {
    user,
    oauthToken, // Ajout du token OAuth au contexte
    setUser: updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
