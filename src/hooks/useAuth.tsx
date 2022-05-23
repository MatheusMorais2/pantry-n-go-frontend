import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { AuthContextInterface } from "../contexts/AuthContext";

export default function useAuth(): AuthContextInterface {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used inside a AuthContext Provider");
  }

  return authContext;
}
