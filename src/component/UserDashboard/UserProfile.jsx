import React, { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebase.config"; 
import Swal from "sweetalert2";
import { FaCamera } from "react-icons/fa";
import Loading from "../Loading/Loading";
import useAuth from "../Hooks/useAuth"; 

const UserProfile = () => {
  const { user, loading: authLoading } = useAuth(); 
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [updating, setUpdating] = useState(false);

  // Google login-এর জন্য HD ছবি
  const getUserPhoto = () => {
    const googlePhoto = user?.providerData?.find(p => p.providerId === "google.com")?.photoURL;
    if (googlePhoto) {
      return googlePhoto.replace(/=s\d+-c/, "=s400"); 
    }
    return user?.photoURL || "https://via.placeholder.com/400?text=No+Image";
  };

  const handleUpdateProfile = async () => {
    if (!displayName.trim()) {
      Swal.fire("Error", "Name cannot be empty", "error");
      return;
    }

    setUpdating(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: photoURL || null,
      });

      Swal.fire("Success!", "Profile updated successfully", "success");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message || "Failed to update profile", "error");
    } finally {
      setUpdating(false);
    }
  };

  if (authLoading) return <Loading />;
  if (!user) return <div className="text-center text-2xl mt-10">Please log in to view your profile</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
        My Profile 🐾
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-12 text-white text-center">
          <div className="relative inline-block">
            <img
              src={getUserPhoto()}
              alt="Profile"
              className="w-40 h-40 rounded-full border-8 border-white shadow-2xl object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-green-500 w-10 h-10 rounded-full border-4 border-white"></div>
          </div>
          <h2 className="text-4xl font-bold mt-6">{user.displayName || "Pet Lover"}</h2>
          <p className="text-xl mt-2 opacity-90">{user.email}</p>
          <p className="text-sm mt-3 opacity-70">
            Member since {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "Recently"}
          </p>
        </div>

        {/* Profile Details */}
        <div className="p-10">
          {isEditing ? (
            <div className="space-y-8">
              <div>
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-5 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500 dark:bg-gray-700"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Photo URL (Optional)
                </label>
                <input
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="w-full px-5 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500 dark:bg-gray-700"
                  placeholder="https://example.com/photo.jpg"
                />
                <p className="text-sm text-gray-500 mt-2">Paste a direct image link (e.g., from imgur or google drive)</p>
              </div>

              <div className="flex gap-5">
                <button
                  onClick={handleUpdateProfile}
                  disabled={updating}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg disabled:opacity-70"
                >
                  {updating ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setDisplayName(user.displayName || "");
                    setPhotoURL(user.photoURL || "");
                  }}
                  className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 px-8 py-4 rounded-xl font-bold text-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Display Name</p>
                  <p className="text-2xl font-bold mt-1">{user.displayName || "Not set"}</p>
                </div>
                <button
                  onClick={() => {
                    setDisplayName(user.displayName || "");
                    setPhotoURL(user.photoURL || "");
                    setIsEditing(true);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-3"
                >
                  <FaCamera /> Edit Profile
                </button>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                <p className="text-gray-500 dark:text-gray-400">Email Address</p>
                <p className="text-2xl font-bold mt-1">{user.email}</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                <p className="text-gray-500 dark:text-gray-400">Login Method</p>
                <p className="text-2xl font-bold mt-1 capitalize">
                  {user.providerData[0]?.providerId === "google.com" ? "Google" : "Email & Password"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;