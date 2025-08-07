// app/context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { getCurrentAccount } from "@/lib/appwrite/api";

interface IUser {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}

const INITIAL_USER: IUser = {
  id: "",
  name: "",
  email: "",
  imageUrl: "",
};

interface IAuthContext {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
}

const AuthContext = createContext<IAuthContext>({
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentAccount();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          email: currentAccount.email,
          imageUrl: currentAccount.name,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      const err = error as any;
      console.warn(
        "No authenticated user found (not an error):",
        err?.message || err
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   checkAuthUser();
  // }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within an AuthProvider");
  }
  return context;
};
