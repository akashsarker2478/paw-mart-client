import React, { useState } from "react";
import {
  FaEye,
  FaRegEyeSlash,
  FaUser,
  FaEnvelope,
  FaCamera,
  FaGoogle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useAuth from "../../component/Hooks/useAuth";
import useAxios from "../../component/Hooks/useAxios";
import Swal from "sweetalert2";

const Register = () => {
  const [eye, setEye] = useState(false);
  const [passwordHint, setPasswordHint] = useState("");
  const { createUser, updateUser, setUser, googleSignIn } = useAuth();
  const axiosInstance = useAxios()
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = /.{6,}/;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;

    if (!minLength.test(password)) {
      return "Password must be at least 6 characters long";
    }
    if (!hasUpperCase.test(password)) {
      return "Password must contain at least 1 uppercase letter";
    }
    if (!hasLowerCase.test(password)) {
      return "Password must contain at least 1 lowercase letter";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    
    if (password.length === 0) {
      setPasswordHint("");
      return;
    }

    const minLength = /.{6,}/;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;

    // Real-time hints
    if (!minLength.test(password)) {
      setPasswordHint("❌ Need at least 6 characters");
    } else if (!hasUpperCase.test(password)) {
      setPasswordHint("❌ Need at least 1 uppercase letter");
    } else if (!hasLowerCase.test(password)) {
      setPasswordHint("❌ Need at least 1 lowercase letter");
    } else {
      setPasswordHint("✅ Strong password!");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    const error = validatePassword(password);
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: error,
      });
      return;
    }

    createUser(email, password)
      .then((res) => {
        const user = res.user;
        updateUser(name, photo)
          .then(() => {
            setUser({
              ...user,
              displayName: name,
              photoURL: photo,
            });
            Swal.fire({
            icon: "success",
            title: "Account Created!",
            text: "Your account has been created successfully.",
            timer: 1500,
            showConfirmButton: false,
            position: "top",
          });
            const newUser={
          name:res.user.displayName,
          email: res.user.email,
          photo: res.user.photoURL,
        };
        axiosInstance.post('/user',newUser)
        .then(data=>{
          console.log(data.data)
        })
            navigate("/");
          })
          .catch((err) => {
            Swal.fire({
            icon: "error",
            title: "Update Failed!",
            text: err.message,
          });
          });
      })
      .catch((err) => {
        Swal.fire({
        icon: "error",
        title: "Registration Failed!",
        text: err.message,
      });
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(res => {
        console.log(res.user);
        const user = res.user;
          Swal.fire({
        icon: "success",
        title: "Google Login Successful!",
        text: `Welcome, ${user.displayName}!`,
        timer: 1500,
        showConfirmButton: false,
        position: "top",
      });
        const newUser={
          name:res.user.displayName,
          email: res.user.email,
          photo: res.user.photoURL,
        };
        axiosInstance.post('/user',newUser)
        .then(data=>{
          console.log(data.data)
        })
        navigate('/');
      })
      .catch(error => {
        console.log(error.message);
         Swal.fire({
        icon: "error",
        title: "Google Login Failed!",
        text: error.message,
      });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
         
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h2>
            <p className="text-blue-100">Join Paw Mart today!</p>
          </div>

         
          <form onSubmit={handleRegister} className="p-6 space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <FaUser className="text-blue-500" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email Field */}
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

            {/* Photo URL Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <FaCamera className="text-blue-500" />
                Photo URL
              </label>
              <input
                type="text"
                name="photo"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                placeholder="Paste your photo URL"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Password
              </label>
              <div className="relative">
                <input
                  type={eye ? "text" : "password"}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white pr-12 transition-all duration-300"
                  name="password"
                  placeholder="Create a strong password"
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setEye(!eye)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors duration-300 p-1"
                >
                  {eye ? (
                    <FaEye className="text-blue-500 text-lg" />
                  ) : (
                    <FaRegEyeSlash className="text-lg" />
                  )}
                </button>
              </div>
              
              {/* Real-time Password Hint */}
              {passwordHint && (
                <p className={`text-sm font-medium mt-1 ${
                  passwordHint.includes("✅") 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-red-600 dark:text-red-400"
                }`}>
                  {passwordHint}
                </p>
              )}

              {/* Password Requirements Info */}
              <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium mb-2">
                  Password Requirements:
                </p>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• At least 6 characters</li>
                  <li>• 1 uppercase letter (A-Z)</li>
                  <li>• 1 lowercase letter (a-z)</li>
                </ul>
              </div>
            </div>

            {/* Register Button - Always Enabled */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mt-2"
            >
              Create Account
            </button>

            {/* Divider */}
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
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500"
            >
              <FaGoogle className="text-red-500 text-lg" />
              Sign up with Google
            </button>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
            <p className="text-center text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to={"/auth/login"}
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors duration-300"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            By creating an account, you agree to our{" "}
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

export default Register;