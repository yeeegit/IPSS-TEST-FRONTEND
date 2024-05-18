import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const RecipeList = () => {
  const { jwtToken } = useAuth();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const recipesPerPage = 8;

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes-to-update`,
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

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Link
              to={`/edit-recipe/${recipe._id}`}
              key={recipe._id}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-md p-6">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold mb-4">{recipe.title}</h2>
                <p className="text-gray-600 mb-4">
                  {recipe.content.slice(0, 100)}...
                </p>
              </div>
            </Link>
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

export default RecipeList;
