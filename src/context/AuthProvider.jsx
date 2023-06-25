import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebaseSetup.js";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (result) => {
      setUser(result);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (displayName, photoURL) =>
    updateProfile(auth.currentUser, { displayName, photoURL });

  const userLogIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => signInWithPopup(auth, new GoogleAuthProvider());

  const logOut = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        googleSignIn,
        createUser,
        updateUserProfile,
        userLogIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
