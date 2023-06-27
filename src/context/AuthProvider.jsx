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
import axios from "axios";
import moment from "moment/moment.js";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const create = moment().format("MMMM Do YYYY, h:mm:ss a");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (result) => {
      if (result) {
        axios
          .post("http://localhost:5000/jwt", { uid: result.uid })
          .then((res) => {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
      }
      setUser(result);
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
        create,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
