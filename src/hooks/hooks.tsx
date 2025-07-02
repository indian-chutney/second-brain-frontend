import { useContext } from "react";
import { AuthContext, ModalContext } from "../contexts/contexts";

export const useModalContext = () => {
  const content = useContext(ModalContext);
  if (content == null) {
    throw new Error("err");
  }

  return content;
};

export const useAuthContext = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error("err");
  }
  return auth;
};
