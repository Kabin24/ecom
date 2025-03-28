import { useState } from "react";

export const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Forgot Password?</h2>
          <p className="text-sm text-gray-500 mt-2">
            Enter your email to receive a reset link.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            Send Reset Link
          </button>

          {/* Back to Login */}
          <p className="text-center text-sm text-gray-600">
            Remember your password?{" "}
            <a href="/" className="text-indigo-600 hover:underline">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
