import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../component/Navbar";
import toast from "react-hot-toast";

const AdminPanel = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    image: ""
  });

  const load = async () => {
    try {
      const res = await api.get("/sweets");
      setSweets(res.data);
    } catch {
      toast.error("Failed to load sweets");
    }
  };

  useEffect(() => {
    load();
  }, []);

 const addSweet = async (e) => {
  e.preventDefault();

  if (!form.name || !form.price || !form.image) {
    toast.error("Please fill all required fields");
    return;
  }

  try {
    setLoading(true);

    const data = new FormData();
    data.append("name", form.name);
    data.append("category", form.category);
    data.append("price", form.price);
    data.append("quantity", form.quantity);
    data.append("image", form.image); // FILE

    await api.post("/sweets", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Sweet added successfully");

    setForm({
      name: "",
      category: "",
      price: "",
      quantity: "",
      image: null,
    });

    load();
  } catch (error) {
    console.error(error);
    toast.error("Only admin can add sweets");
  } finally {
    setLoading(false);
  }
};


  const restock = async (id) => {
    const qty = prompt("Enter quantity to restock:");
    if (!qty) return;

    try {
      await api.post(`/sweets/${id}/restock`, { quantity: Number(qty) });
      toast.success("Stock updated");
      load();
    } catch {
      toast.error("Action not allowed");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this sweet permanently?")) return;

    try {
      await api.delete(`/sweets/${id}`);
      toast.success("Sweet deleted");
      load();
    } catch {
      toast.error("Action not allowed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen px-6 py-10 bg-[#FFF7ED]">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
          Admin Kitchen Panel
        </h1>

        <form
          onSubmit={addSweet}
          className="bg-white rounded-3xl shadow-xl p-8 mb-14"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Add New Sweet
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <input
              placeholder="Sweet Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-style"
            />
            <input
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="input-style"
            />
            <input
              type="number"
              placeholder="Price (₹)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="input-style"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              className="input-style"
            />
            <input
               type="file"
               accept="image/*"
               onChange={(e) =>
               setForm({ ...form, image: e.target.files[0] })
               }
               className="input-style"
               />
          </div>

          <button
            disabled={loading}
            className="mt-8 w-full py-4 rounded-2xl text-lg font-bold
              bg-black text-yellow-400 border-2 border-yellow-400
              shadow-lg hover:bg-yellow-400 hover:text-black
              transition-all disabled:opacity-50"
          >
            {loading ? "Adding Sweet..." : "Add Sweet"}
          </button>
        </form>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Inventory
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sweets.map((s) => (
            <div
              key={s._id}
              className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-5
                hover:shadow-xl transition-all"
            >
              <img
                src={s.image}
                alt={s.name}
                className="w-24 h-24 rounded-xl object-cover border"
              />

              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">
                  {s.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Stock: {s.quantity}
                </p>
                <p className="text-lg font-extrabold text-pink-600">
                  ₹{s.price}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => restock(s._id)}
                  className="px-4 py-2 rounded-full font-semibold
                    bg-emerald-600 text-white hover:bg-emerald-700
                    transition"
                >
                  Restock
                </button>

                <button
                  onClick={() => remove(s._id)}
                  className="px-4 py-2 rounded-full font-semibold
                    bg-red-600 text-white hover:bg-red-700
                    transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
