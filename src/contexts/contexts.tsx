import React, { createContext, useEffect, useState } from "react";
import { useAuthContext } from "../hooks/hooks";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ModalContextProps = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setting: boolean;
  setSetting: React.Dispatch<React.SetStateAction<boolean>>;
  deleteModal: boolean;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalContextProps | null>(null);

type ProviderProps = {
  children: React.ReactNode;
};

export const ModalContextProvider = ({ children }: ProviderProps) => {
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

export const AuthContextProvider = ({ children }: ProviderProps) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
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

export type Content =
  | "all"
  | "tweets"
  | "notion"
  | "video"
  | "article"
  | "other";

type Tag = {
  _id: string;
  title: string;
};

export type ContentItem = {
  _id: string;
  link: string;
  title: string;
  type: "tweets" | "notion" | "article" | "video" | "other";
  tags: Tag[];
  userid: {
    _id: string;
    username: string;
  };
};

type ContentProps = {
  type: Content;
  setType: React.Dispatch<React.SetStateAction<Content>>;
  rootContent: ContentItem[];
};

export const ContentContext = createContext<ContentProps | undefined>(
  undefined,
);

export const ContentContextProvider = ({ children }: ProviderProps) => {
  const [type, setType] = useState<Content>("all");
  const [rootContent, setRootContent] = useState<ContentItem[]>([]);
  const authContext = useAuthContext();

  const { data } = useQuery({
    queryKey: ["cards"],
    queryFn: () => {
      if (!authContext.token) throw new Error("No token");
      return fetchCards(authContext.token);
    },
    enabled: !!authContext.token,
    refetchInterval: 1000,
  });

  useEffect(() => {
    if (data) {
      const filtered =
        type === "all"
          ? data.content
          : data.content.filter((c: ContentItem) => c.type === type);
      setRootContent(filtered);
    }
  }, [data, type]);

  return (
    <ContentContext.Provider value={{ type, setType, rootContent }}>
      {children}
    </ContentContext.Provider>
  );
};

type ShareContextProps = {
  shareContent: ContentItem[];
  setHash: React.Dispatch<React.SetStateAction<string>>;
};

export const ShareContext = createContext<ShareContextProps | null>(null);

export const ShareContextProvider = ({ children }: ProviderProps) => {
  const [shareContent, setShareContent] = useState<ContentItem[]>([]);
  const [hash, setHash] = useState("");
  const { token } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const content = await fetchShareCards(token as string, hash);
        setShareContent(content);
      } catch (error) {
        console.error("Failed to fetch share content:", error);
      }
    };

    fetchData();
  }, [token, hash]);

  return (
    <ShareContext.Provider value={{ shareContent, setHash }}>
      {children}
    </ShareContext.Provider>
  );
};

const fetchCards = async (token: string) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const res = await axios.get(backend_url + "content", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

const fetchShareCards = async (token: string, hash: string) => {
  if (hash === "" || token === "") return {};
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const res = await axios.get(backend_url + "brain/" + hash, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
