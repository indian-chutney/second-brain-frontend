import { useEffect, useRef, type RefObject } from "react";

type Variants = "modal" | "signup" | "search" | "options";

interface inputProps {
  setChange: (state: string) => void;
  submit: boolean;
  variant: Variants;
  placeholder: string;
}

export const InputBox = (props: inputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    props.setChange(inputRef!.current!.value);
  };

  useEffect(() => {
    if (props.submit && inputRef.current) {
      handleChange();
    }
  }, [props.submit]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key == "Enter") {
      handleChange();
    }
  };

  return (
    <InputStyle
      variant={props.variant}
      placeholder={props.placeholder}
      ref={inputRef}
      keydown={handleKeyDown}
    />
  );
};

interface styleProps {
  ref: RefObject<HTMLInputElement | null>;
  variant: Variants;
  placeholder: string;
  keydown: (e: React.KeyboardEvent) => void;
}

const InputStyle = (props: styleProps) => {
  return (
    <div className="flex items-center bg-back-dark w-full h-[50px] px-5 py-[10px] rounded-[10px] border-solid border-2 border-bd-silver focus-within:border-brand-primary focus-within:shadow-lg focus-within:shadow-brand-primary/20 transition-all duration-200">
      <input
        ref={props.ref}
        type="text"
        onKeyDown={props.keydown}
        placeholder={props.placeholder}
        className="border-none focus:outline-none bg-transparent w-full"
      />
    </div>
  );
};
