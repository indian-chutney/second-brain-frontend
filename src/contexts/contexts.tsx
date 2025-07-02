import { createContext, useState } from "react";

type ModalContextProps = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setting: boolean;
  setSetting: React.Dispatch<React.SetStateAction<boolean>>;
  deleteModal: boolean;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalContextProps | null>(null);

type ModalContextProviderProps = {
  children: React.ReactNode;
};

export const ModalContextProvider = ({
  children,
}: ModalContextProviderProps) => {
  const [modal, setModal] = useState(false);
  const [setting, setSetting] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        modal,
        setModal,
        setting,
        setSetting,
        deleteModal,
        setDeleteModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

type AuthContextProps = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (newToken: string) => {
    localStorage.setItem("token ", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
