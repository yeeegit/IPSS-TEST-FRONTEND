import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserProfile from "../components/UserProfile";
import EditProfile from "../components/EditProfile";
import { useAuth } from "../context/useAuth";
import RecipeOperations from "../components/RecipeOperations";

const Profile = () => {
  const { jwtToken } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedPhoto, setEditedPhoto] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!jwtToken) {
          throw new Error("JWT token not found");
        }

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/get-user`,
          {},
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [jwtToken, navigate]);

  const handleEditProfileImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setEditedPhoto(reader.result);
      };
    };
    input.click();
  };

  const handleSaveProfileImage = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile-photo`,
        {
          profileImage: editedPhoto,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setUserData({ ...userData, profileImage: editedPhoto });
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  const handleEditUsername = () => {
    setIsEditing(true);
    setEditedUsername(userData.username);
  };

  const handleSaveUsername = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile-username`,
        {
          username: editedUsername,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setUserData({ ...userData, username: editedUsername });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8">
      {userData && (
        <div className="flex flex-col items-center">
          <UserProfile userData={userData} />
          <EditProfile
            userData={userData}
            isEditing={isEditing}
            editedUsername={editedUsername}
            setEditedUsername={setEditedUsername}
            handleEditUsername={handleEditUsername}
            handleSaveUsername={handleSaveUsername}
            handleEditProfileImage={handleEditProfileImage}
            handleSaveProfileImage={handleSaveProfileImage}
            editedPhoto={editedPhoto}
          />
          <RecipeOperations></RecipeOperations>
        </div>
      )}
    </div>
  );
};

export default Profile;
