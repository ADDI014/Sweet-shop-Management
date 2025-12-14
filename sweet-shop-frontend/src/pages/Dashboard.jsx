import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../component/Navbar";
import SweetCard from "../component/SweetCard";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const res = await api.get("/sweets/search", {
        params: {
          name: search || undefined,
          category: category || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined
        }
      });
      setSweets(res.data);
    } catch (error) {
      toast.error("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const purchase = async (id) => {
    try {
      await api.post(`/sweets/${id}/purchase`);
      toast.success("Sweet purchased!");
      fetchSweets();
    } catch {
      toast.error("Purchase failed");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    fetchSweets();
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen px-6 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Our Sweet Collection
        </h1>

        <div className="bg-white rounded-2xl shadow-md p-5 mb-8 grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name"
            className="px-4 py-3 rounded-xl border focus:ring-2 focus:ring-pink-400 outline-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border"
          >
            <option value="">All Categories</option>
            <option value="Indian">Indian</option>
            <option value="Chocolate">Chocolate</option>
            <option value="Bakery">Bakery</option>
          </select>

          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="px-4 py-3 rounded-xl border"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="px-4 py-3 rounded-xl border"
          />

          <div className="flex gap-2">
            <button
              onClick={fetchSweets}
              className="flex-1 bg-black text-yellow-400 rounded-xl font-bold hover:bg-yellow-400 hover:text-black transition"
            >
              Apply
            </button>
            <button
              onClick={clearFilters}
              className="flex-1 bg-gray-200 rounded-xl font-semibold hover:bg-gray-300 transition"
            >
              Clear
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-lg font-semibold">Loading sweets...</p>
        ) : sweets.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No sweets found!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sweets.map((sweet) => (
              <SweetCard
                key={sweet._id}
                sweet={sweet}
                onPurchase={purchase}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
