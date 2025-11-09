import React, { useEffect, useState } from 'react';
import { AuthContext } from './Context';
import { auth } from '../../Firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
    const googleSignIn = ()=>{
    setLoading(true)
    return signInWithPopup(auth,googleProvider)
  }
  const logOut = ()=>{
    return signOut(auth)
  }

   const createUser = (email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password)
  }

  const loginUser = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
  }

  const updateUser = (name,photo)=>{
    return updateProfile(auth.currentUser,{
      displayName: name,
      photoURL: photo,
    })
  }

     useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  
    const authInfo={
        user,
        setUser,
        loading,
        googleSignIn,
        createUser,
        loginUser,
        updateUser,
        logOut
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;