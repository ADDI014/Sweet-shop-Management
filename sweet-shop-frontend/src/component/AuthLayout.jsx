const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-amber-100 relative">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-chocolate">
            Sweet Shop
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {subtitle}
          </p>
        </div>

        <h2 className="text-xl font-semibold text-center mb-4">
          {title}
        </h2>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
