import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/useAuth";

const UpdateRecipe = () => {
  const { id } = useParams();
  const { jwtToken } = useAuth();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/recipe/${id}`
        );
        setRecipe(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("Tarif getirilemedi");
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImageFile(selectedImage);
  };

  const convertImageToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageData = recipe.image;
      if (imageFile) {
        imageData = await convertImageToBase64(imageFile);
      }

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/update-recipe/${id}`,
        { ...recipe, image: imageData },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      navigate("/recipes");
    } catch (error) {
      setError("Tarif güncellenemedi");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-8">Tarifi Güncelle</h1>
      {loading && <div className="text-center">Yükleniyor...</div>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Başlık
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={recipe.title}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700">
              İçerik
            </label>
            <textarea
              id="content"
              name="content"
              value={recipe.content}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              rows="6"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">
              Resim
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Güncelle
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateRecipe;
