import { IconSizeVariants, type IconProps } from ".";

export const ArticleIcon = (props: IconProps) => {
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
        d="M4 19V5C4 3.89543 4.89543 3 6 3H19.4C19.7314 3 20 3.26863 20 3.6V16.7143"
        stroke="#808a92"
        stroke-width="1.6"
        stroke-linecap="round"
      ></path>
      <path
        d="M6 17L20 17"
        stroke="#808a92"
        stroke-width="1.6"
        stroke-linecap="round"
      ></path>
      <path
        d="M6 21L20 21"
        stroke="#808a92"
        stroke-width="1.6"
        stroke-linecap="round"
      ></path>
      <path
        d="M6 21C4.89543 21 4 20.1046 4 19C4 17.8954 4.89543 17 6 17"
        stroke="#808a92"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M9 7L15 7"
        stroke="#808a92"
        stroke-width="1.6"
        stroke-linecap="round"
      ></path>
    </svg>
  );
};
