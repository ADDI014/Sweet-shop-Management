import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../auth/AuthContext";
import AuthLayout from "../component/AuthLayout";
import toast from "react-hot-toast";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/auth/login", { email, password });
    login(res.data.token);

    toast.success("Login successful!");

    navigate("/");
  } catch (error) {
    toast.error("Invalid email or password");
  }
};


  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to manage and enjoy sweets"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold cursor-pointer relative z-10"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary font-semibold">
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
