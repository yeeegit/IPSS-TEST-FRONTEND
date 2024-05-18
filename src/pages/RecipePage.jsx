import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useAuth } from "../context/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommentForm from "../components/CommentForm";

const RecipePage = () => {
  const { id } = useParams();
  const { jwtToken } = useAuth();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/recipe/${id}`
        );
        setRecipe(response.data.data);
        setLikeCount(response.data.data.likes.length);
        setDislikeCount(response.data.data.dislikes.length);
        setLoading(false);
      } catch (error) {
        setError("Tarif alınamadı.");
        setLoading(false);
        console.error("Error fetching recipe:", error);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/like-recipe/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (response.data.success) {
        setLikeCount(response.data.data);
        toast.success("Tarifi beğendiniz.");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Bu tarifi beğenmek için giriş yapmalısınız.");
    }
  };

  const handleDislike = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/dislike-recipe/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (response.data.success) {
        setDislikeCount(response.data.data);
        toast.success("Tarifi beğenmediniz.");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Bu tarifi beğenmemek için giriş yapmalısınız.");
    }
  };
  if (loading) {
    return <div className="text-center mt-8">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <img
          src={recipe.image}
          alt={`${recipe.title} ile alakalı resim`}
          className="w-full h-auto max-w-md mx-auto mb-4 rounded-lg"
        />
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          {recipe.title}
        </h2>
        <p className="text-gray-800 whitespace-pre-wrap">{recipe.content}</p>
        <div className="flex justify-center mt-4">
          <span className="mr-2">{likeCount}</span>
          <button onClick={handleLike} className="mr-4">
            <AiFillLike className="text-blue-500 text-2xl" />
          </button>
          <span className="mr-2">{dislikeCount}</span>
          <button onClick={handleDislike}>
            <AiFillDislike className="text-red-500 text-2xl" />
          </button>
        </div>
        <CommentForm id={id} />
        <div className="comments-section mt-8">
          <h3 className="text-xl font-semibold mb-4">Yorumlar</h3>
          {recipe.comments && recipe.comments.length > 0 ? (
            recipe.comments.map((comment) => (
              <div
                key={comment._id}
                className="comment-item mb-4 p-4 bg-gray-100 rounded-lg shadow-md text-left"
              >
                <div className="flex items-center mb-2">
                  <img
                    src={comment.commenter.profile_image}
                    alt={comment.commenter.username}
                    className="comment-avatar w-10 h-10 rounded-full mr-2"
                  />
                  <span className="font-semibold">
                    {comment.commenter.username}
                  </span>
                </div>
                <p>{comment.commentContent}</p>
              </div>
            ))
          ) : (
            <p>Bir yorum yok...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
