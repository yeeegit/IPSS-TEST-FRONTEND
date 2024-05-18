import PropTypes from "prop-types";
import { PencilIcon, CameraIcon } from "@heroicons/react/outline";

const EditProfile = ({
  userData,
  isEditing,
  editedUsername,
  setEditedUsername,
  handleEditUsername,
  handleSaveUsername,
  handleEditProfileImage,
  handleSaveProfileImage,
  editedPhoto,
}) => {
  return (
    <div className="flex items-center space-x-2">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedUsername}
            onChange={(e) => setEditedUsername(e.target.value)}
            className="p-2 border border-gray-300 rounded-md mr-2"
          />
          <button
            onClick={handleSaveUsername}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <p>{userData.username}</p>
          <button onClick={handleEditUsername}>
            <PencilIcon className="h-5 w-5 text-gray-600" />
          </button>
        </>
      )}
      <button onClick={handleEditProfileImage}>
        <CameraIcon className="h-5 w-5 text-gray-600" />
      </button>
      {editedPhoto && (
        <button onClick={handleSaveProfileImage}>Save Photo</button>
      )}
    </div>
  );
};

EditProfile.propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  editedUsername: PropTypes.string.isRequired,
  setEditedUsername: PropTypes.func.isRequired,
  handleEditUsername: PropTypes.func.isRequired,
  handleSaveUsername: PropTypes.func.isRequired,
  handleEditProfileImage: PropTypes.func.isRequired,
  handleSaveProfileImage: PropTypes.func.isRequired,
  editedPhoto: PropTypes.string,
};

export default EditProfile;
