import { Link } from "react-router-dom";
import { TrashIcon, PlusIcon } from "@heroicons/react/outline";
import { AiOutlineEdit } from "react-icons/ai";

const RecipeOperations = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-end md:space-x-4 space-y-4 md:space-y-0">
        <Link
          to="/create-recipe"
          className="flex items-center bg-white border border-black p-2 rounded hover:bg-gray-200"
        >
          <PlusIcon className="h-5 w-5 mr-1 text-black" />
          Tarif Yaz
        </Link>

        <Link
          to="/edit-recipes"
          className="flex items-center bg-white border border-black p-2 rounded hover:bg-gray-200"
        >
          <AiOutlineEdit className="h-5 w-5 mr-1 text-black" />
          Tarifini Düzenle
        </Link>

        <Link
          to="/delete-recipe"
          className="flex items-center bg-white border border-black p-2 rounded hover:bg-gray-200"
        >
          <TrashIcon className="h-5 w-5 mr-1 text-black" />
          Tarif Sil
        </Link>
      </div>
    </div>
  );
};

export default RecipeOperations;
