import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("byNewest");
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    totalRecipes: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/recipes`,
          {
            params: {
              searchTerm,
              sortBy,
              page: pagination.page,
              pageSize: pagination.pageSize,
            },
          }
        );
        setRecipes(response.data.data);
        setPagination((prev) => ({
          ...prev,
          totalRecipes: response.data.pagination.totalRecipes,
          totalPages: response.data.pagination.totalPages,
        }));
        setLoading(false);
        if (response.data.data.length === 0) {
          setError("Üzgünüz, bir tarif bulamadık.");
        } else {
          setError(null);
        }
      } catch (error) {
        setError("Tarifler alınamadı.");
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [searchTerm, sortBy, pagination.page, pagination.pageSize]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold mb-8">Tarifler</h1>
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0 w-full sm:w-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Tarif ara..."
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="sortBy" className="mr-2">
            Sırala:
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={handleSortByChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="byNewest">En Yeni</option>
            <option value="byOldest">En Eski</option>
            <option value="byLike">En Beğenilen</option>
            <option value="byComments">En Çok Yorumlanan</option>
          </select>
        </div>
      </div>
      {loading && <div className="text-center">Yükleniyor...</div>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Link
              to={`/recipe/${recipe._id}`}
              key={recipe._id}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-md p-6">
                {recipe.image && (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold mb-4">{recipe.title}</h2>
                <p className="text-gray-600 mb-4">
                  {recipe.content.slice(0, 100)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
      {!loading && !error && (
        <div className="mt-8 flex justify-center items-center">
          <button
            onClick={() => handlePageChange(Math.max(1, pagination.page - 1))}
            disabled={pagination.page === 1}
            className="px-4 py-2 mr-4 border border-gray-300 rounded-md bg-white text-gray-700 disabled:opacity-50"
          >
            Önceki
          </button>
          <span>
            Sayfa {pagination.page} / {pagination.totalPages}
          </span>
          <button
            onClick={() =>
              handlePageChange(
                Math.min(pagination.totalPages, pagination.page + 1)
              )
            }
            disabled={pagination.page === pagination.totalPages}
            className="px-4 py-2 ml-4 border border-gray-300 rounded-md bg-white text-gray-700 disabled:opacity-50"
          >
            Sonraki
          </button>
        </div>
      )}
    </div>
  );
};

export default Recipes;
