type sizes = "sm" | "md" | "navbar" | "mob" | "lg" | "logo" | "xl";

export interface IconProps {
  size: sizes;
}

export const IconSizeVariants: Record<sizes, string> = {
  sm: "20px",
  md: "25px",
  navbar: "30px",
  mob: "61px",
  lg: "75px",
  logo: "40px",
  xl: "100px",
};
