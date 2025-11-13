import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  FaEye,
  FaRegEyeSlash,
  FaEnvelope,
  FaLock,
  FaGoogle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../component/Hooks/useAuth";
import useAxios from "../../component/Hooks/useAxios";

const Login = () => {
  const { googleSignIn, loginUser } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then((res) => {
        console.log(res.user);
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back to Paw Mart 🐾",
          showConfirmButton: false,
          timer: 1800,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        console.log(res.user);
        Swal.fire({
          icon: "success",
          title: "Google Sign-In Successful!",
          text: `Welcome, ${res.user.displayName}!`,
          showConfirmButton: false,
          timer: 1800,
        });
        const newUser = {
          name: res.user.displayName,
          email: res.user.email,
          photo: res.user.photoURL,
        };
        axiosInstance.post("/user", newUser).then((data) => {
          console.log(data.data);
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <title>Login</title>
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-blue-100">Sign in to your Paw Mart account</p>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <FaEnvelope className="text-blue-500" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <FaLock className="text-blue-500" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white pr-12 transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors duration-300 p-1"
                >
                  {showPassword ? (
                    <FaEye className="text-blue-500 text-lg" />
                  ) : (
                    <FaRegEyeSlash className="text-lg" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-right">
              <a
                href="#"
                className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>

            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
              <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400 text-sm">
                Or continue with
              </span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500 group"
            >
              <FaGoogle className="text-red-500 text-lg group-hover:scale-110 transition-transform" />
              Sign in with Google
            </button>
          </form>

          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
            <p className="text-center text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to={"/auth/register"}
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors duration-300"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            By signing in, you agree to our{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
