import { useState } from "react";
import { InputBox } from "./Input";
import { Button } from "./Button";
import { Logo } from "../assets/logo";

export const Modal = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex justify-center items-center">
          <ModalCard />
        </div>
      )}
    </>
  );
};

const ModalCard = () => {
  const [val, setVal] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    setVal(true);

    setTimeout(() => setVal(false), 100);
  };
  return (
    <div className="bg-back-dark w-[400px] flex flex-col text-white p-6 gap-6 rounded-xl">
      <Logo size="md" />
      <InputBox
        variant="modal"
        placeholder="Title"
        setChange={setInput}
        submit={val}
      />
      <InputBox
        variant="modal"
        placeholder="Type"
        setChange={setInput}
        submit={val}
      />
      <InputBox
        variant="modal"
        placeholder="Link"
        setChange={setInput}
        submit={val}
      />
      <InputBox
        variant="modal"
        placeholder="Tags"
        setChange={setInput}
        submit={val}
      />
      <Button
        variant="primary"
        size="p-sm"
        text="Submit"
        onClick={handleSubmit}
      />
      <p>Input val : {input}</p>
    </div>
  );
};
