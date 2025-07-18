import { useContext } from "react";
import {
  AuthContext,
  ContentContext,
  ModalContext,
  ShareContext,
} from "../contexts/contexts";
import { useLocation } from "react-router-dom";

export const useModalContext = () => {
  const content = useContext(ModalContext);
  if (content == null) {
    throw new Error("Null ModalContext");
  }

  return content;
};

export const useAuthContext = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error("Null AuthContext");
  }
  return auth;
};

export const useContentContext = () => {
  const type = useContext(ContentContext);
  if (type == null) {
    throw new Error("Null ContentContext");
  }
  return type;
};

export const useShareContext = () => {
  const share = useContext(ShareContext);
  if (share == null) {
    throw new Error("Null ShareContext");
  }
  return share;
};

export function useCorrectSetType() {
  const content = useContentContext();
  const share = useShareContext();
  const location = useLocation();
  const isShare = location.pathname.startsWith("/share");
  return isShare ? share?.setType : content.setType;
}
