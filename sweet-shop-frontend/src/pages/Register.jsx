import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import AuthLayout from "../component/AuthLayout";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await api.post("/auth/register", { name, email, password });

    toast.success("Account created successfully!");

    navigate("/login");
  } catch (error) {
    toast.error("Registration failed. Try again.");
  }
};


  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join our sweet family today"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold cursor-pointer relative z-10 hover:opacity-90 transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-secondary font-semibold">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
