import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
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

  const googleSignIn = () => signInWithPopup(auth, new GoogleAuthProvider());

  return (
    <AuthContext.Provider value={{ user, loading, googleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
