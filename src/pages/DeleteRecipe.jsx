import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const DeleteRecipe = () => {
  const { jwtToken } = useAuth();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const recipesPerPage = 8;

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes-to-delete`,
        {
          params: {
            page: currentPage,
            pageSize: recipesPerPage,
          },
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setRecipes(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching recipes:", error.response.message);
    }
  };

  useEffect(() => {
    if (!jwtToken) {
      navigate("/login");
    } else {
      fetchRecipes();
    }
  }, [jwtToken, navigate, currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu tarifi silmek istediğinizden emin misiniz?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/delete-recipe/${id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setRecipes(recipes.filter((recipe) => recipe._id !== id));
      } catch (error) {
        console.error("Error deleting recipe:", error.response.message);
      }
    }
  };

  const shortenText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-4">
                <img
                  src={recipe.image}
                  alt="Tarif resmi"
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600 mb-4">
                {shortenText(recipe.content, 150)}
              </p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => handleDelete(recipe._id)}
              >
                Sil
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mr-4 border border-gray-300 rounded-md bg-white text-gray-700 disabled:opacity-50"
          >
            {"<"}
          </button>
          <span className="mx-4 text-lg">
            Sayfa {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 ml-4 border border-gray-300 rounded-md bg-white text-gray-700 disabled:opacity-50"
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteRecipe;
