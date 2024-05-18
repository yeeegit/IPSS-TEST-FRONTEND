import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        404 - Sayfa Bulunamadı
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8">
        Aradığınız sayfa mevcut değil.
      </p>
      <Link to="/" className="text-blue-500 hover:underline">
        Ana Sayfaya Dön
      </Link>
    </div>
  );
};

export default NotFound;
