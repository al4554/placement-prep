import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <PageWrapper>
      <div className="flex items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-96 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center dark:text-white">Login</h2>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Email */}
          <input
            className="w-full bg-white dark:bg-gray-800 border dark:border-gray-700 
                       text-gray-900 dark:text-gray-100 rounded p-2
                       focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full bg-white dark:bg-gray-800 border dark:border-gray-700 
                         text-gray-900 dark:text-gray-100 rounded p-2
                         focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 
                         text-gray-500 dark:text-gray-300"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 
                       active:scale-95 text-white p-2 rounded 
                       transition"
          >
            Login
          </button>
        </form>
      </div>
    </PageWrapper>
  );
}
