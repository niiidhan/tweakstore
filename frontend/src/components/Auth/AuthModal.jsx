import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState("login"); // login | signup

  // =============================
  // 🚫 FULL PAGE SCROLL LOCK HERE
  // =============================
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden"; // <html>
      document.body.style.overflow = "hidden"; // <body>
      document.body.style.touchAction = "none"; // Mobile scroll lock
    } else {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    }

    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[90%] max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex animate-[popup_0.25s_ease]"
      >
        {/* LEFT IMAGE PANEL */}
        <div className="w-1/2 hidden md:block">
          <img
            src="/images/auth-bg.jpg"
            alt="auth"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 px-8 py-10 relative">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <X size={22} />
          </button>

          <h2 className="text-2xl font-bold text-blue-600">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>

          <p className="text-gray-500 text-sm mt-1 mb-6">
            {mode === "login"
              ? "Login to continue"
              : "Join us and start exploring"}
          </p>

          <div className="transition-all duration-300 ease-in-out animate-fade">
            <form className="space-y-5">
              {mode === "signup" && (
                <div>
                  <label className="text-xs font-semibold text-gray-600">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-gray-600">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg shadow-md transition font-semibold"
              >
                {mode === "login" ? "Login" : "Create Account"}
              </button>
            </form>
          </div>

          {/* Toggle */}
          <p className="text-sm text-gray-600 mt-5 text-center">
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <span
                  onClick={() => setMode("signup")}
                  className="text-blue-600 cursor-pointer font-semibold"
                >
                  Sign up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setMode("login")}
                  className="text-blue-600 cursor-pointer font-semibold"
                >
                  Login
                </span>
              </>
            )}
          </p>

          {/* Guest */}
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                onClose();
                console.log("Guest mode activated");
              }}
              className="text-gray-600 text-sm hover:text-blue-600 transition font-medium"
            >
              Continue as Guest →
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes popup {
            0% { transform: scale(0.85); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }

          @keyframes fade {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          .animate-fade {
            animation: fade 0.25s ease;
          }
        `}
      </style>
    </div>
  );
};

export default AuthModal;
