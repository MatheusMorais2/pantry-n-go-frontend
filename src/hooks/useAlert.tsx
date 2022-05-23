import { useContext } from "react";
import { AlertContext } from "../contexts/AlertContext";
import { AlertContextInterface } from "../contexts/AlertContext";

const useAlert = (): AlertContextInterface => {
  const alertContext = useContext(AlertContext);
  if (!alertContext) {
    throw new Error("useAlert must be inside an AlertContext Provider");
  }

  return alertContext;
};

export default useAlert;
