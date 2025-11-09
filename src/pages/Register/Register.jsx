import React, { useState } from "react";
import {
  FaEye,
  FaRegEyeSlash,
  FaUser,
  FaEnvelope,
  FaCamera,
  FaGoogle,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useAuth from "../../component/Hooks/useAuth";

const Register = () => {
  const [eye, setEye] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const { createUser, updateUser, setUser, googleSignIn } = useAuth();
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
    const error = validatePassword(password);
    setPasswordError(error);
    setPasswordValid(!error && password.length > 0);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    
    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
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
            alert("Account created successfully!");
            navigate("/");
          })
          .catch((err) => {
            console.log("Update Error:", err.message);
          });
      })
      .catch((err) => {
        console.log("Create Error:", err.message);
        alert(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(res => {
        console.log(res.user);
        alert('Google sign in successful');
        navigate('/');
      })
      .catch(error => {
        console.log(error.message);
        alert(error.message);
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
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent dark:bg-gray-700 dark:text-white pr-12 transition-all duration-300 ${
                    passwordError && !passwordValid
                      ? "border-red-500 focus:ring-red-500"
                      : passwordValid
                      ? "border-green-500 focus:ring-green-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  }`}
                  name="password"
                  placeholder="Create a strong password"
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setEye(!eye)}
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors duration-300 p-1"
                >
                  {eye ? (
                    <FaEye className="text-blue-500 text-lg" />
                  ) : (
                    <FaRegEyeSlash className="text-lg" />
                  )}
                </button>
                
               
                {passwordValid && (
                  <FaCheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 text-lg" />
                )}
                {passwordError && !passwordValid && (
                  <FaTimesCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 text-lg" />
                )}
              </div>
              
             
              <div className="space-y-1 mt-2">
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Password must contain:
                </p>
                <ul className="text-xs space-y-1">
                  <li className={`flex items-center gap-2 ${
                    passwordValid || !passwordError.includes('6 characters') 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                  }`}>
                    {passwordValid || !passwordError.includes('6 characters') ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                    At least 6 characters
                  </li>
                  <li className={`flex items-center gap-2 ${
                    passwordValid || !passwordError.includes('uppercase') 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                  }`}>
                    {passwordValid || !passwordError.includes('uppercase') ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                    At least 1 uppercase letter
                  </li>
                  <li className={`flex items-center gap-2 ${
                    passwordValid || !passwordError.includes('lowercase') 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                  }`}>
                    {passwordValid || !passwordError.includes('lowercase') ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                    At least 1 lowercase letter
                  </li>
                </ul>
              </div>
              
              
              {passwordError && (
                <p className="text-red-600 dark:text-red-400 text-xs font-medium mt-2 flex items-center gap-2">
                  <FaTimesCircle />
                  {passwordError}
                </p>
              )}
            </div>

           
            <button
              type="submit"
              disabled={!passwordValid}
              className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 transform shadow-lg mt-6 ${
                passwordValid
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white hover:scale-105 hover:shadow-xl"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              {passwordValid ? "Create Account" : "Please meet password requirements"}
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
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500"
            >
              <FaGoogle className="text-red-500 text-lg" />
              Sign up with Google
            </button>
          </form>

         
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