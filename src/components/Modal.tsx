import { Form } from "./Form";
import {
  BackIcon,
  ExitIcon,
  Logo,
  ProfileIcon,
  ShareIcon,
  ShareIcon2,
} from "../assets/icons";
import { useEffect, useState } from "react";
import { useAuthContext, useModalContext } from "../hooks/hooks";
import { Button } from "./Button";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

type variant = "content" | "settings" | "delete";

interface modalProp {
  variant: variant;
  onSubmit?: () => void;
  edit?: boolean;
  contentId?: string;
}

export const Modal = ({ variant, onSubmit, edit, contentId }: modalProp) => {
  const { modal, setting, deleteModal } = useModalContext();
  let isOpen = false;
  if (variant == "content" && modal) {
    isOpen = true;
  }
  if (variant == "settings" && setting) {
    isOpen = true;
  }
  if (variant == "delete" && deleteModal) {
    isOpen = true;
  }

  const [animationState, setAnimationState] = useState<"entering" | "exiting">(
    "entering",
  );
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setAnimationState("entering");
    } else {
      setAnimationState("exiting");
      setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 w-full h-full backdrop-blur-[2px] flex justify-center items-center ${
        animationState === "exiting" ? "animate-backdrop-out" : "bg-black/30"
      }`}
    >
      {variant === "content" && (
        <FormModalCard edit={!!edit} contentId={contentId} />
      )}
      {variant === "settings" && <SettingModal />}
      {variant === "delete" && <DeleteModal onSubmit={() => onSubmit} />}
    </div>
  );
};

const FormModalCard = ({
  edit,
  contentId,
}: {
  edit: boolean;
  contentId: string | undefined;
}) => {
  const [animationState, setAnimationState] = useState("entering");
  const { setModal } = useModalContext();

  const close = () => {
    setModal((c) => !c);
  };

  const handleClose = () => {
    setAnimationState("exiting");
    setTimeout(() => {
      close();
    }, 300);
  };

  return (
    <div
      className={`bg-back-dark w-[400px] flex flex-col text-white p-6 rounded-xl shadow-xl ${animationState === "entering" ? "animate-modal-entry" : "animate-modal-exit"}`}
    >
      <div className="flex justify-between pb-6">
        <Logo size="logo" />
        <div
          className="p-[3px] border-solid border-bd-silver"
          onClick={handleClose}
        >
          <ExitIcon size="md" />
        </div>
      </div>
      <Form variant="modal" edit={!!edit} contentId={contentId} />
    </div>
  );
};

const DeleteModal = ({ onSubmit }: { onSubmit: () => void }) => {
  const { setDeleteModal } = useModalContext();
  const [animationState, setAnimationState] = useState("entering");

  const close = () => {
    setDeleteModal((c) => !c);
  };

  const handleClose = () => {
    setAnimationState("exiting");
    setTimeout(() => {
      close();
    }, 300);
  };

  return (
    <div
      className={`bg-back-dark w-[400px] md:w-[500px] flex flex-col justify-center items-center text-white p-6 gap-4 rounded-xl shadow-xl ${animationState === "entering" ? "animate-modal-entry" : "animate-modal-exit"}`}
    >
      <div className="flex justify-end gap-4 w-full">
        <div className="block"></div>
        <div onClick={handleClose}>
          <ExitIcon size="md" />
        </div>
      </div>
      <div className="mt-[10px]">You sure you wanna delete this card?</div>
      <div className="flex justify-end gap-4 w-full mt-[10px]">
        <Button
          variant="secondary"
          size="s-md"
          text="Cancel"
          onClick={handleClose}
        />
        <Button
          variant="secondary"
          size="s-md"
          text="Delete"
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

const SettingModal = () => {
  const { setSetting } = useModalContext();
  const [animationState, setAnimationState] = useState("entering");
  const [userData, setUserData] = useState<any>({});
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const { token, logout } = useAuthContext();
  const [passwordDisplay, setPasswordDisplay] = useState(false);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(backend_url + "settings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await fetchUserData();
        if (!user) {
          console.error("No user data received");
          return;
        }
        setUserData(user);
        console.log(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, []);

  const shareBackendCall = async () => {
    try {
      const res = await axios.post(
        backend_url + "brain/share",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data;
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  };

  const close = () => {
    setSetting((c) => !c);
  };

  const handleClose = () => {
    setAnimationState("exiting");
    setTimeout(() => {
      close();
    }, 300);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="bg-back-dark w-[95vw] max-w-[400px] md:max-w-[700px] mx-4 flex flex-col justify-center items-center text-white p-4 md:p-6 gap-4 rounded-xl shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <div className="flex justify-between w-full">
          {passwordDisplay === true ? (
            <div>
              <Button
                variant="secondary"
                size="s-ico"
                startIcon={<BackIcon size="md" />}
                onClick={() => setPasswordDisplay(false)}
              />
            </div>
          ) : (
            <div className="block"></div>
          )}
          <div onClick={handleClose}>
            <ExitIcon size="md" />
          </div>
        </div>

        {/* Content container with fixed height */}
        <div className="h-auto w-full relative overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            {!passwordDisplay ? (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="w-full flex flex-col items-center"
              >
                {/* Profile content */}
                <div className="flex flex-col sm:flex-row justify-start gap-4 sm:gap-[30px] w-full max-w-[280px] sm:max-w-[600px] bg-bd-silver rounded-[20px] p-4 md:p-5">
                  <div className="flex justify-center items-center sm:justify-start">
                    <ProfileIcon size="lg" />
                  </div>
                  <div className="flex flex-col justify-start gap-0.5 text-white text-center sm:text-left flex-1">
                    <p className="break-words">{"@" + userData.username}</p>
                    <p className="break-words text-sm md:text-base">
                      {userData.email}
                    </p>
                    <p className="text-sm md:text-base">
                      {"You own " + userData.links + " Links"}
                    </p>
                  </div>
                  <div className="flex justify-center items-center sm:justify-end">
                    <Button
                      variant="secondary"
                      size="s-md"
                      startIcon={
                        userData.isShared ? (
                          <ShareIcon2 size="md" />
                        ) : (
                          <ShareIcon size="md" />
                        )
                      }
                      text={userData.isShared ? "Sharing Enabled" : "Share"}
                      onClick={async () => {
                        if (userData.isShared) {
                          return;
                        }
                        const res = await shareBackendCall();
                        setUserData((prev: any) => ({
                          ...prev,
                          isShared: true,
                          hash: userData.hash,
                        }));
                        console.log(res);
                      }}
                    />
                  </div>
                </div>

                {userData.isShared && (
                  <div className="w-full max-w-[280px] sm:max-w-[600px] mt-4 p-4 bg-white text-black rounded-xl shadow flex items-center justify-between gap-2">
                    <div className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                      {`http://localhot:5173/share/${userData.hash}`}
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `http://localhot:5173/share/${userData.hash}`,
                        );
                      }}
                      className="bg-black text-white px-3 py-1 rounded-md text-xs hover:bg-gray-800 transition"
                    >
                      Copy
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-center w-full">
                  <p
                    className="flex mt-4 hover:bg-bd-silver w-full max-w-[280px] h-[40px] text-center items-center justify-center rounded-xl transition-colors duration-300 cursor-pointer"
                    onClick={() => setPasswordDisplay(true)}
                  >
                    Change Password
                  </p>
                </div>

                <div className="flex items-center justify-center w-full">
                  <p
                    className="flex text-red-600 hover:bg-bd-silver w-full max-w-[280px] h-[40px] text-center items-center justify-center rounded-xl transition-colors duration-300 cursor-pointer"
                    onClick={logout}
                  >
                    Log Out
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="password"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="w-full py-[30px] px-[50px]"
              >
                <Form variant="changePassword" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
