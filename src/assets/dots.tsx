import { IconSizeVariants, type IconProps } from ".";

export const OptionsIcon = (props: IconProps) => {
  return (
    <svg
      width={IconSizeVariants[props.size]}
      height={IconSizeVariants[props.size]}
      viewBox="0 0 24 24"
      stroke-width="1.6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#808a92"
    >
      <path
        d="M20 12.5C20.2761 12.5 20.5 12.2761 20.5 12C20.5 11.7239 20.2761 11.5 20 11.5C19.7239 11.5 19.5 11.7239 19.5 12C19.5 12.2761 19.7239 12.5 20 12.5Z"
        fill="#808a92"
        stroke="#808a92"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M12 12.5C12.2761 12.5 12.5 12.2761 12.5 12C12.5 11.7239 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.7239 11.5 12C11.5 12.2761 11.7239 12.5 12 12.5Z"
        fill="#808a92"
        stroke="#808a92"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M4 12.5C4.27614 12.5 4.5 12.2761 4.5 12C4.5 11.7239 4.27614 11.5 4 11.5C3.72386 11.5 3.5 11.7239 3.5 12C3.5 12.2761 3.72386 12.5 4 12.5Z"
        fill="#808a92"
        stroke="#808a92"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
};
