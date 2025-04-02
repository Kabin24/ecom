const ComingSoon = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white px-4">
      <h1 className="text-5xl font-bold mb-4">Coming Soon 🚀</h1>
      <p className="text-lg mb-8">
        We're working hard to bring this feature to you!
      </p>
      <a
        href="/"
        className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-indigo-50 transition-all duration-300"
      >
        Go Back
      </a>
    </div>
  );
};

export default ComingSoon;
