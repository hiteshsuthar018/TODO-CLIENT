import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

type AuthFormProps =
  | {
    mode: "signup";
    onSubmit: (data: { name: string; email: string; password: string }) => void;
    loading?: boolean;
    error?: string | null;
  }
  | {
    mode: "signin";
    onSubmit: (data: { email: string; password: string }) => void;
    loading?: boolean;
    error?: string | null;
  };

const AuthForm = ({ mode, onSubmit, loading = false, error }: AuthFormProps) => {
  const isDark = localStorage.getItem("dark") === "true";
  const route = useNavigate();
   
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup") {
      await onSubmit({ name, email, password });
      route("/signin")
    } else {
      await onSubmit({ email, password });
      route('/')
    }
  };

  const inputClasses = `w-full px-3 py-2 rounded-lg border outline-none text-sm sm:text-base ${isDark
      ? "bg-zinc-800 border-zinc-700 text-white focus:border-emerald-500"
      : "bg-white border-gray-300 text-black focus:border-emerald-400"
    }`;

  const buttonClasses = `w-full py-2 rounded-lg font-medium transition text-sm sm:text-base ${isDark
      ? "bg-white text-black hover:bg-gray-200"
      : "bg-black text-white hover:bg-gray-800"
    }`;

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 sm:p-6 ${isDark ? "bg-black" : "bg-gray-100"}`}>
      <form onSubmit={handleSubmit} className={`w-full max-w-md p-6 sm:p-8 rounded-lg shadow-md ${isDark ? "bg-zinc-900 text-white" : "bg-white text-gray-900"}`}>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
          {mode === "signup" ? "Create an account" : "Welcome back"}
        </h2>

        {mode === "signup" && (
          <div className="mb-4">
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClasses}
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClasses} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded ${isDark ? "hover:bg-zinc-700" : "hover:bg-gray-100"
                }`}
            >
              {showPassword ? (
                <EyeOff size={20} className={isDark ? "text-zinc-400" : "text-gray-500"} />
              ) : (
                <Eye size={20} className={isDark ? "text-zinc-400" : "text-gray-500"} />
              )}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className={buttonClasses}>
          {loading ? "Please wait..." : mode === "signup" ? "Sign Up" : "Sign In"}
        </button>

        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        <p
          className={`text-sm mt-4 text-center cursor-pointer ${isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-800"
            }`}
          onClick={() => route(mode === "signup" ? "/signin" : "/signup")}
        >
          {mode === "signup" ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
        </p>
      </form>
    </div>
  );
};

export default AuthForm;