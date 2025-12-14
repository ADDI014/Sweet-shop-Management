import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream">
      <h1 className="text-6xl font-bold text-chocolate mb-4">404</h1>
      <p className="text-gray-600 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="bg-primary text-white px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
