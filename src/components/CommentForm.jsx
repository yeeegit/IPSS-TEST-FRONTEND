/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/useAuth";

const CommentForm = ({ id }) => {
  const [commentContent, setCommentContent] = useState("");
  const { jwtToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/comment-recipe/${id}`,
        { commentContent },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      toast.success(response.data.message);
      setCommentContent("");
    } catch (error) {
      console.error(error);
      toast.error("Yorum eklenirken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder="Yorumunuzu buraya yazın..."
        rows={4}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Yorum Ekle
      </button>
    </form>
  );
};

export default CommentForm;
