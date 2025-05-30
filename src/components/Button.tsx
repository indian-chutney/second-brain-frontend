import type { ReactElement } from "react";

type Variants = "primary" | "secondary";
type Size = "p-sm" | "p-md" | "p-lg" | "s-sm" | "s-md" | "s-ico" | "s-xs";

interface ButtonProps {
  variant: Variants;
  size: Size;
  text?: string;
  border?: boolean;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
}

const variantStyle = {
  primary: "bg-brand-primary rounded-[8px] text-[23px]",
  secondary: "bg-btn-dark rounded-[29px] text-white  gap-[10px]",
};

const defaultStyles = "font-inter inline-flex items-center justify-center";

const sizeStyles = {
  "p-sm": "h-[53px] px-[19px] py-[10px]",
  "p-md": "h-[75px] px-[21px] py-[10px]",
  "p-lg": "h-[63px] px-[195px] py-[10px]",
  "s-sm": "h-[48px] px-[23px] py-[18px] text-[12px]",
  "s-md": "h-[56px] px-[27px] py-[22px] text-[15px]",
  "s-ico": "h-[48px] w-[48px] px-[15px] py-[15px]",
  "s-xs": "h-[28px] px-[15px] py-[6px] text-[11px]",
};

const borderStyle = "border-2 border-solid";

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${variantStyle[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} ${props.border ? borderStyle : ""} ${props.size === "s-xs" ? "border-brand-primary" : "border-bd-silver"}`}
      onClick={props.onClick}
    >
      {props.startIcon} {props.text} {props.endIcon}
    </button>
  );
};
