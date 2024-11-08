import UserProfile from "../UserProfile/UserProfile";
import PropTypes from "prop-types";

function ProfilePage({ setView }) {
  return (
    <div className="profilePage">
      <UserProfile />
      <button onClick={() => setView("userMenu")}>Retour au menu</button>
    </div>
  );
}

ProfilePage.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default ProfilePage;
