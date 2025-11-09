import React from 'react';
import { Link } from 'react-router';
import errorImg from "../../assets/404error.jpg";

const Error = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
              
                <img 
                    src={errorImg} 
                    alt="404 Error" 
                    className="w-full max-w-md mx-auto mb-8"
                />
                
             
                <p className="text-red-500 text-lg mb-6">
                    Sorry, the page you are looking for does not exist.
                </p>

              
                <Link 
                    to="/" 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Error;