import { IconSizeVariants, type IconProps } from ".";

export const DoumentIcon = (props: IconProps) => {
  return (
    <svg
      width={IconSizeVariants[props.size]}
      height={IconSizeVariants[props.size]}
      stroke-width="1.6"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#808a92"
    >
      <path
        d="M9.14286 3.00375L14.8571 3M9.14286 3.00375L2 15.0038M9.14286 3.00375L18.4321 21M14.8571 3L22 15.0038M14.8571 3L5.575 21M18.4321 21H5.575M18.4321 21L22 15.0038M5.575 21L2 15.0038M22 15.0038L2 15.0038"
        stroke="#808a92"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
};
