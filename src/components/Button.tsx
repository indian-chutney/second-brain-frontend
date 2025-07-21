import type { ReactElement } from "react";

type Variants = "primary" | "secondary";
type Size = "p-sm" | "p-md" | "p-lg" | "s-sm" | "s-md" | "s-ico" | "s-xs";

interface ButtonProps {
  variant: Variants;
  size: Size;
  text?: string;
  border?: boolean;
  pointeroff?: boolean;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  loading?: boolean;
}

const variantStyle = {
  primary:
    "bg-brand-primary rounded-[8px] font-medium hover:bg-[#966CF6] hover:shadow-[0_4px_16px_#8b5cf61a,_0_8px_24px_#8b5cf61a,_0_16px_56px_#8b5cf61a]",
  secondary:
    "bg-btn-dark rounded-[29px] hover:bg-[#2a2a2b] text-white  gap-[10px]",
};

const defaultStyles = "font-inter inline-flex items-center justify-center";

const sizeStyles = {
  "p-sm": "h-[43px] px-[17px] py-[8px] text-[18px]",
  "p-md": "h-[75px] px-[21px] py-[10px] text-[23px]",
  "p-lg": "h-[63px] px-[195px] py-[10px] text-[23px]",
  "s-sm": "h-[48px] px-[23px] py-[18px] text-[14px]",
  "s-md": "h-[56px] px-[27px] py-[22px] text-[15px]",
  "s-ico": "h-[48px] w-[48px] px-[15px] py-[15px]",
  "s-xs": "h-[28px] px-[15px] py-[6px] text-[11px]",
};

const borderStyle = "border-2 border-solid";

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${variantStyle[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} ${props.border ? borderStyle : ""} ${props.size === "s-xs" ? "border-brand-primary" : "border-bd-silver"} ${props.pointeroff ? "" : "cursor-pointer"}`}
      onClick={props.onClick}
      disabled={props.loading ? true : false}
    >
      {props.loading && (
        <svg
          className="mr-3 size-5 animate-spin text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}
      {props.startIcon} {props.text} {props.endIcon}
    </button>
  );
};
