import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check if user was previously authenticated (use sessionStorage or localStorage)
    return sessionStorage.getItem("auth") === "true";
  });
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem("token"));
  

  const login = (token: string) => {
    setIsAuthenticated(true);
    setToken(token);
    sessionStorage.setItem("auth", "true");
    sessionStorage.setItem("token", token);
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
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
