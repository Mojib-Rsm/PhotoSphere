"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState, useMemo, useEffect } from "react";
import type { Auth, User, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [provider, setProvider] = useState<GoogleAuthProvider | null>(null);

  useEffect(() => {
    // Dynamically import Firebase Auth on the client side
    const initAuth = async () => {
      const {
        getAuth,
        onAuthStateChanged,
        GoogleAuthProvider,
        browserPopupRedirectResolver, // Using redirect which is more robust
        initializeAuth,
      } = await import("firebase/auth");

      // Use getAuth instead of initializing multiple times
      const authInstance = getAuth(app);
      
      const googleProvider = new GoogleAuthProvider();
      googleProvider.addScope('https://www.googleapis.com/auth/photoslibrary.readonly');
      
      setAuth(authInstance);
      setProvider(googleProvider);

      const unsubscribe = onAuthStateChanged(authInstance, (user) => {
        setUser(user);
        setLoading(false);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    };

    initAuth();
  }, []);

  const login = async () => {
    if (!auth || !provider) {
        console.error("Auth has not been initialized yet.");
        return;
    }
    const { signInWithRedirect } = await import("firebase/auth");
    try {
      // Use signInWithRedirect which is more reliable in some environments
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const logout = async () => {
    if (!auth) {
        console.error("Auth has not been initialized yet.");
        return;
    }
    const { signOut } = await import("firebase/auth");
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };
  
  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading, auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
