import { IconSizeVariants, type IconProps } from ".";

export const PlusIcon = (props: IconProps) => {
  return (
    <svg
      width={IconSizeVariants[props.size]}
      height={IconSizeVariants[props.size]}
      stroke-width="2.2"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#8b5cf6"
    >
      <path
        d="M6 12H12M18 12H12M12 12V6M12 12V18"
        stroke="#8b5cf6"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
};
