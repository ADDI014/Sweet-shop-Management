const SweetCard = ({ sweet, onPurchase }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
      <div className="h-44 w-full bg-gradient-to-br from-pink-200 to-orange-200">
        {sweet.image ? (
          <img
            src={sweet.image}
            alt={sweet.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-6xl">
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900">
          {sweet.name}
        </h3>

        <p className="text-sm text-gray-500 mb-2">
          {sweet.category}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-extrabold text-pink-600">
            ₹{sweet.price}
          </span>

          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              sweet.quantity > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {sweet.quantity > 0
              ? `In Stock (${sweet.quantity})`
              : "Out of Stock"}
          </span>
        </div>

        <button
          onClick={() => onPurchase(sweet._id)}
          disabled={sweet.quantity === 0}
          className={`mt-auto w-full py-3 rounded-xl font-extrabold text-lg transition-all
            ${
              sweet.quantity === 0
                ? "bg-gray-500 text-black cursor-not-allowed"
                : "bg-black text-yellow-400 border-2 border-yellow-400 shadow-xl hover:bg-yellow-400 hover:text-black"
            }`}
        >
          {sweet.quantity === 0 ? "OUT OF STOCK" : "PURCHASE"}
        </button>
      </div>
    </div>
  );
};

export default SweetCard;
