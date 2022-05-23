import { useContext } from "react";
import { UserContextInterface, UserContext } from "../contexts/UserContext";

const useUserContext = (): UserContextInterface => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("useUserContext must be inside a UserContext Provider");
  }

  return userContext;
};

export default useUserContext;
