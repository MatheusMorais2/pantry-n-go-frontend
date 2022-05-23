/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";
import { AxiosError } from "axios";

export interface AlertMessage {
  type: "success" | "error";
  text: string;
}

export interface AlertContextInterface {
  message: AlertMessage | null;
  setMessage: (newMessage: AlertMessage | null) => void;
  handleClose: () => void;
  showInternalError: (error: Error | AxiosError | any) => void;
}

export const AlertContext = createContext<AlertContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

const AlertProvider = ({ children }: Props): JSX.Element => {
  const [message, setMessage] = useState<AlertMessage | null>(null);

  function handleClose() {
    setMessage(null);
  }

  function showInternalError(error: Error | AxiosError | any) {
    if (error.response) {
      setMessage({
        type: "error",
        text: error.response.data,
      });
      return;
    }

    setMessage({
      type: "error",
      text: "Error, try again in an instant",
    });
  }

  return (
    <AlertContext.Provider
      value={{ message, setMessage, handleClose, showInternalError }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
