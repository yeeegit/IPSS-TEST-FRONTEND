import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const WriteRecipe = () => {
  const { jwtToken } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [writer, setWriter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!jwtToken) {
      navigate("/login");
    }
  }, [jwtToken, navigate]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageData = "";
      if (image) {
        imageData = await convertImageToBase64(image);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/create-recipe`,
        {
          title,
          image: imageData,
          content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const convertImageToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-4">Tarif Oluştur</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Konu Yazarı:
            </label>
            <input
              type="text"
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
              required
              maxLength={60}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Başlık:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              İçerik:
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
              maxLength={60000}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Resim:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="mt-1 block w-full"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
              isLoading ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isLoading ? "İstek Gönderiliyor..." : "Tarif Oluştur"}
          </button>
        </form>
      </div>
    </>
  );
};

export default WriteRecipe;
