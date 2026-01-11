import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Check, X, AlertCircle } from "lucide-react";

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
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Password validation rules
  const passwordValidations = [
    { id: 'length', label: 'At least 6 characters', valid: password.length >= 6 },
    { id: 'letter', label: 'Contains a letter', valid: /[a-zA-Z]/.test(password) },
    { id: 'number', label: 'Contains a number', valid: /\d/.test(password) },
  ];

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (mode === "signup") {
      if (!name.trim()) {
        errors.name = "Name is required";
      } else if (name.trim().length < 1) {
        errors.name = "Name must be at least 1 character";
      }
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const errors = validateForm();
    setFormErrors(prev => ({ ...prev, [field]: errors[field] || "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    setFormErrors(errors);
    
    // Mark all fields as touched
    const allTouched = ['email', 'password', ...(mode === 'signup' ? ['name'] : [])];
    const touchedObj = allTouched.reduce((acc, field) => ({ ...acc, [field]: true }), {});
    setTouched(touchedObj);
    
    if (Object.keys(errors).length > 0) {
      return;
    }

    if (mode === "signup") {
      await onSubmit({ name: name.trim(), email, password });
      navigate("/signin");
    } else {
      await onSubmit({ email, password });
      navigate('/');
    }
  };

  const getInputClasses = (field: string) => {
    const baseClasses = `w-full px-3 py-2 rounded-lg border outline-none text-sm sm:text-base transition-all duration-200 ${
      isDark
        ? "bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
        : "bg-white border-gray-300 text-black placeholder:text-gray-400"
    }`;
    
    const errorClasses = formErrors[field] && touched[field]
      ? isDark 
        ? "border-red-500 focus:border-red-400"
        : "border-red-500 focus:border-red-400"
      : isDark
        ? "focus:border-emerald-500"
        : "focus:border-emerald-400";
    
    return `${baseClasses} ${errorClasses}`;
  };

  const buttonClasses = `w-full py-3 rounded-lg font-medium transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed ${
    isDark
      ? "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800"
      : "bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700"
  }`;

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 sm:p-6 ${
      isDark ? "bg-linear-to-br from-black to-zinc-900" : "bg-linear-to-br from-gray-50 to-emerald-50"
    }`}>
      <div className={`w-full max-w-md rounded-xl shadow-lg overflow-hidden ${
        isDark ? "bg-zinc-900" : "bg-white"
      }`}>
        <div className={`p-8 ${isDark ? "border-b border-zinc-800" : "border-b border-gray-100"}`}>
          <div className="flex items-center justify-center mb-6">
            <div className={`p-3 rounded-full ${
              isDark ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-100 text-emerald-600"
            }`}>
              {mode === "signup" ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              )}
            </div>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h2>
          <p className={`text-center text-sm mb-6 ${isDark ? "text-zinc-400" : "text-gray-600"}`}>
            {mode === "signup" ? "Sign up to get started" : "Sign in to your account"}
          </p>

          <form onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-1 ${isDark ? "text-zinc-300" : "text-gray-700"}`}>
                  Full Name
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => handleBlur('name')}
                  className={getInputClasses('name')}
                  minLength={1}
                />
                {touched.name && formErrors.name && (
                  <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                    <AlertCircle size={14} />
                    <span>{formErrors.name}</span>
                  </div>
                )}
              </div>
            )}

            <div className="mb-4">
              <label className={`block text-sm font-medium mb-1 ${isDark ? "text-zinc-300" : "text-gray-700"}`}>
                Email Address
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
                className={getInputClasses('email')}
              />
              {touched.email && formErrors.email && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                  <AlertCircle size={14} />
                  <span>{formErrors.email}</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className={`block text-sm font-medium mb-1 ${isDark ? "text-zinc-300" : "text-gray-700"}`}>
                Password
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  className={getInputClasses('password')}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded transition ${
                    isDark 
                      ? "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700" 
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {touched.password && formErrors.password && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                  <AlertCircle size={14} />
                  <span>{formErrors.password}</span>
                </div>
              )}

              {mode === "signup" && password && (
                <div className={`mt-3 p-3 rounded-lg text-sm ${
                  isDark ? "bg-zinc-800/50" : "bg-gray-50"
                }`}>
                  <p className={`font-medium mb-2 ${isDark ? "text-zinc-300" : "text-gray-700"}`}>
                    Password strength
                  </p>
                  <div className="space-y-1">
                    {passwordValidations.map((rule) => (
                      <div key={rule.id} className="flex items-center gap-2">
                        {rule.valid ? (
                          <Check size={14} className="text-emerald-500" />
                        ) : (
                          <X size={14} className={isDark ? "text-zinc-500" : "text-gray-400"} />
                        )}
                        <span className={rule.valid 
                          ? isDark ? "text-emerald-400" : "text-emerald-600" 
                          : isDark ? "text-zinc-400" : "text-gray-500"
                        }>
                          {rule.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
                isDark ? "bg-red-900/20 border border-red-800/50 text-red-400" : "bg-red-50 border border-red-200 text-red-600"
              }`}>
                <AlertCircle size={16} />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading} 
              className={buttonClasses}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {mode === "signup" ? "Creating account..." : "Signing in..."}
                </span>
              ) : (
                mode === "signup" ? "Create Account" : "Sign In"
              )}
            </button>
          </form>
        </div>

        <div className={`p-6 text-center ${isDark ? "bg-zinc-900/50" : "bg-gray-50"}`}>
          <p className={`text-sm ${isDark ? "text-zinc-400" : "text-gray-600"}`}>
            {mode === "signup" ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => navigate(mode === "signup" ? "/signin" : "/signup")}
              className={`ml-1 font-medium transition ${
                isDark 
                  ? "text-emerald-400 hover:text-emerald-300" 
                  : "text-emerald-600 hover:text-emerald-700"
              }`}
            >
              {mode === "signup" ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;