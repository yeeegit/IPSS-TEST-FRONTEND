import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/recipes" className="mr-4 hover:text-gray-400">
            Tarifler
          </Link>
          <Link to="/profile" className="mr-4 hover:text-gray-400">
            Profil
          </Link>
        </div>
        <div>
          <Link to="/login" className="mr-4 hover:text-gray-400">
            Giriş Yap
          </Link>
          <Link to="/register" className="hover:text-gray-400">
            Kaydol
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
