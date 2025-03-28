const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <h1 className="text-9xl font-extrabold text-gray-800 mb-4 animate-bounce">
        404
      </h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </h2>
      <p className="text-lg text-gray-600 mb-6 text-center max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/admin"
        className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Go Back Admin
      </a>
    </div>
  );
};

export default NotFound;
