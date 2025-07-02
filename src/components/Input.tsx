import { useEffect, useRef, useState } from "react";
import { OptionsIcon } from "../assets/icons";

type Variants = "input" | "tags" | "options";

interface InputProps {
  variant: Variants;
  name: string;
  error?: boolean;
  pwd?: boolean;
}

interface StyleProps {
  variant: Variants;
  name: string;
  error?: boolean;
  pwd?: boolean;
}

const modalStyle =
  "flex items-center bg-back-dark w-full min-h-[50px] px-5 py-[10px] rounded-[10px] border-solid border-2 transition-all duration-200";
const errorStyle =
  "border-red-500 focus-within:border-red-600 focus-within:shadow-lg focus-within:shadow-red-500/20";
const normalStyle =
  "border-bd-silver focus-within:border-brand-primary focus-within:shadow-lg focus-within:shadow-brand-primary/20";

const InputStyle = (props: StyleProps) => {
  return (
    <div className={`${modalStyle} ${props.error ? errorStyle : normalStyle}`}>
      <input
        name={props.name}
        type={props.pwd ? "password" : "text"}
        placeholder={props.name}
        autoComplete="off"
        className="border-none focus:outline-none bg-transparent w-full"
      />
    </div>
  );
};

const OptionInput = (props: StyleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const contents = ["tweets", "notion", "video", "documents", "article"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <input type="hidden" name={props.name} value={selectedValue} />

      <div
        className={`${modalStyle} ${props.error ? errorStyle : normalStyle} cursor-pointer flex justify-between ${
          isOpen && "border-brand-primary shadow-lg shadow-brand-primary/20"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedValue ? "text-white" : "text-gray-400"}>
          {selectedValue || props.name}
        </span>
        {!selectedValue && <OptionsIcon size="sm" />}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-back-dark border-2 border-bd-silver rounded-[10px] shadow-lg z-50">
          {contents.map((content, index) => (
            <div
              key={index}
              className="px-5 py-3 hover:bg-gray-700 cursor-pointer text-white transition-colors"
              onClick={() => {
                setSelectedValue(content);
                setIsOpen(false);
              }}
            >
              {content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface TagsInputProps {
  variant: Variants;
  name: string;
  errorCondition?: boolean;
  placeholder?: string;
  maxTags?: number;
  allowDuplicates?: boolean;
}

const TagsInput = ({
  name,
  errorCondition,
  placeholder = "Add tags...",
  maxTags = 10,
  allowDuplicates = false,
}: TagsInputProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;

    if (!allowDuplicates && tags.includes(trimmedTag)) return;
    if (tags.length >= maxTags) return;

    setTags([...tags, trimmedTag]);
    setInputValue("");
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const handleInputBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue);
    }
  };

  return (
    <div>
      <input type="hidden" name={name} value={tags.join(",")} />

      <div
        className={`${modalStyle} ${errorCondition ? errorStyle : normalStyle} flex-wrap gap-2 cursor-text`}
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-brand-primary text-white"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(index);
              }}
              className="ml-2 hover:bg-white hover:bg-opacity-20 rounded-full w-4 h-4 flex items-center justify-center text-xs"
            >
              ×
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleInputBlur}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="border-none focus:outline-none bg-transparent flex-1 min-w-[120px]"
          disabled={tags.length >= maxTags}
        />
      </div>

      <div className="text-xs text-gray-400 mt-1">
        {tags.length}/{maxTags} tags
      </div>
    </div>
  );
};

const variantComponents: Record<Variants, React.ComponentType<any>> = {
  input: InputStyle,
  options: OptionInput,
  tags: TagsInput,
};

export const InputBox = (props: InputProps) => {
  const Component = variantComponents[props.variant];
  return <Component {...props} />;
};
