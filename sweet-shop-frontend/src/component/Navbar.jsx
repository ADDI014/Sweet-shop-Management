import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="max-w-10xl mx-auto px-6 py-4 flex justify-between items-center">
        

        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold text-gray-900 hover:scale-105 transition"
        >
          <span>Sweet Shop</span>
        </Link>


        <div className="flex items-center gap-4">
          
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="px-5 py-2 rounded-full font-semibold
                bg-black text-yellow-400 border-2 border-yellow-400
                shadow hover:bg-yellow-400 hover:text-black
                transition-all"
            >
              Admin Panel
            </Link>
          )}

          {token ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full font-semibold
                bg-red-600 text-white shadow
                hover:bg-red-700 hover:scale-105
                transition-all"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="font-semibold text-gray-800 hover:text-pink-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 rounded-full font-semibold
                  bg-black text-white shadow
                  hover:bg-gray-800 hover:scale-105
                  transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
