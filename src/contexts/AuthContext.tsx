import { createContext, useState } from "react";
import React from "react";

export interface AuthContextInterface {
  token: string | null;
  signin: (token: string) => void;
  signout: () => void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

const LOCAL_STORAGE_KEY = "pantry-n-go";
const persistedToken = localStorage.getItem(LOCAL_STORAGE_KEY);

const AuthProvider = ({ children }: Props): JSX.Element => {
  const [token, setToken] = useState<string | null>(persistedToken);

  function signin(token: string) {
    setToken(token);
    localStorage.setItem(LOCAL_STORAGE_KEY, token);
  }

  function signout() {
    setToken(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ token, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
