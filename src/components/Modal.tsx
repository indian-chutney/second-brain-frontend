import { useEffect, useRef } from "react";
import { Form } from "./Form";
import { z } from "zod";

interface modalProp {
  isOpen: boolean;
  close: () => void;
}

export const Modal = (props: modalProp) => {
  return (
    <>
      {props.isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex justify-center items-center">
          <ModalCard close={props.close} />
        </div>
      )}
    </>
  );
};

const ModalCard = ({ close }: { close: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return <Form ref={modalRef} variant="modal" />;
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
