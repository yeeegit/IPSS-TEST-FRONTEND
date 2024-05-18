import PropTypes from "prop-types";

const UserProfile = ({ userData }) => {
  return (
    <>
      <img
        src={userData.profileImage}
        alt="Profile"
        className="w-32 h-32 rounded-full mb-4"
      />
      <div className="mb-4">
        <h2 className="text-xl font-bold">{userData.username}</h2>
        <p className="text-gray-500">{userData.email}</p>
      </div>
    </>
  );
};

UserProfile.propTypes = {
  userData: PropTypes.shape({
    profileImage: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfile;
