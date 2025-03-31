import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check if user was previously authenticated (use sessionStorage or localStorage)
    return sessionStorage.getItem("auth") === "true";
  });

  const login = (token: string) => {
    setIsAuthenticated(true);
    sessionStorage.setItem("auth", "true"); // Store auth state
    sessionStorage.setItem("token", token); // Store token securely (consider HTTP-only cookies for production)
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
