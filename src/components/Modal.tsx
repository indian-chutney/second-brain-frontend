import { Form } from "./Form";
import { z } from "zod";
import { ExitIcon, Logo, ProfileIcon } from "../assets/icons";
import { useEffect, useState } from "react";
import { useModalContext } from "../hooks/hooks";
import { Button } from "./Button";

type variant = "content" | "settings" | "delete";

interface modalProp {
  variant: variant;
}

export const Modal = ({ variant }: modalProp) => {
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
      }, 300); // match CSS animation duration
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 w-full h-full backdrop-blur-[2px] flex justify-center items-center ${
        animationState === "exiting" ? "animate-backdrop-out" : "bg-black/30"
      }`}
    >
      {variant === "content" && <FormModalCard />}
      {variant === "settings" && <SettingModal />}
      {variant === "delete" && <DeleteModal />}
    </div>
  );
};

const FormModalCard = () => {
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
      <Form variant="modal" />
    </div>
  );
};

const SettingModal = () => {
  const { setSetting } = useModalContext();
  const [animationState, setAnimationState] = useState("entering");

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
    <div
      className={`bg-back-dark w-[400px] md:w-[700px] flex flex-col justify-center items-center text-white p-6 gap-4 rounded-xl shadow-xl ${animationState === "entering" ? "animate-modal-entry" : "animate-modal-exit"}`}
    >
      <div className="flex justify-between w-full">
        <div className="block"></div>
        <div onClick={handleClose}>
          <ExitIcon size="md" />
        </div>
      </div>
      <div className="flex justify-between gap-[30px] w-[300px] md:w-[600px] bg-bd-silver rounded-[20px] p-5">
        <div className="flex justify-center items-center">
          <ProfileIcon size="lg" />
        </div>
        <div className="flex flex-col gap-0.5 text-white">
          <p>@Zubair</p>
          <p>zubair@mail.com</p>
          <p>You own 30 Links</p>
        </div>
        <div className="flex justify-center items-center">
          <Button variant="secondary" size="s-md" text="Sharing Enabled" />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <p className="flex mt-4 hover:bg-bd-silver w-[300px] h-[40px] text-center items-center justify-center rounded-xl transition-colors duration-300">
          Change Password
        </p>
      </div>
      <div className="flex items-center justify-center">
        <p className="flex text-red-600 hover:bg-bd-silver w-[300px] h-[40px] text-center items-center justify-center rounded-xl transition-colors duration-300">
          Log Out
        </p>
      </div>
    </div>
  );
};

const DeleteModal = () => {
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
        <Button variant="secondary" size="s-md" text="Delete" />
      </div>
    </div>
  );
};

interface submit {
  Title: string;
  Type: string;
  Link: string;
  Tags: string;
  backendRequest?: () => void;
}

const onSubmit = (props: submit) => {
  const formData = {
    Title: props.Title,
    Type: props.Type,
    Link: props.Link,
    Tags: props.Tags.split(","),
  };

  const schemaForm = z.object({
    Title: z.string().max(20),
    Type: z.enum(["audio", "video", "image", "article"]),
    Link: z.string().url(),
    Tags: z.array(z.string()),
  });

  const result = schemaForm.safeParse(formData);

  if (result.success) {
    console.log(result);
  } else {
    console.log("error");
  }
};
