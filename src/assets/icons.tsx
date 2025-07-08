import {
  OpenNewWindow,
  Book,
  PasteClipboard,
  ClipboardCheck,
  Link,
  Trash,
  MoreHoriz,
  Menu,
  EmptyPage,
  Xmark,
  Brain,
  Plus,
  ShareAndroid,
  X,
  Youtube,
  Settings,
  ProfileCircle,
  ArrowLeft,
  ViewGrid,
  ShareAndroidSolid,
} from "iconoir-react";
import { IconSizeVariants, type IconProps } from ".";

const brandcolor = "#8b5cf6";
const secondcolor = "#808a92";

export const LinkIcon = (props: IconProps) => {
  return (
    <OpenNewWindow
      height={IconSizeVariants[props.size]}
      width={IconSizeVariants[props.size]}
      color={secondcolor}
    />
  );
};

export const ArticleIcon = (props: IconProps) => {
  return (
    <Book
      height={IconSizeVariants[props.size]}
      width={IconSizeVariants[props.size]}
      color={secondcolor}
    />
  );
};

export const CopyIcon = (props: IconProps) => {
  return (
    <PasteClipboard
      height={IconSizeVariants[props.size]}
      width={IconSizeVariants[props.size]}
      color={secondcolor}
    />
  );
};

export const CopiedIcon = (props: IconProps) => {
  return (
    <ClipboardCheck
      height={IconSizeVariants[props.size]}
      width={IconSizeVariants[props.size]}
      color={"#ffffff"}
      strokeWidth={"1.9"}
    />
  );
};

export const OptionsIcon = (props: IconProps) => {
  return (
    <MoreHoriz
      height={IconSizeVariants[props.size]}
      width={IconSizeVariants[props.size]}
      color={secondcolor}
    />
  );
};

export const MenuIcon = (props: IconProps) => {
  return (
    <Menu
      height={IconSizeVariants[props.size]}
      width={IconSizeVariants[props.size]}
      color={secondcolor}
    />
  );
};

export const EmptyIcon = (props: IconProps) => {
  return (
    <EmptyPage
      height={IconSizeVariants[props.size]}
      width={IconSizeVariants[props.size]}
      color={secondcolor}
    />
  );
};

export const ExitIcon = (props: IconProps) => {
  return (
    <Xmark
      height={IconSizeVariants[props.size]}
      width={IconSizeVariants[props.size]}
      color={secondcolor}
    />
  );
};

export const Logo = (props: IconProps) => {
  return (
    <Brain
      height={IconSizeVariants[props.size]}
      width={IconSizeVariants[props.size]}
      color={brandcolor}
      strokeWidth={"2.2"}
    />
  );
};

export const ShareIcon = (props: IconProps) => {
  return (
    <ShareAndroid
      height={IconSizeVariants[props.size]}
      width={IconSizeVariants[props.size]}
      color={secondcolor}
    />
  );
};

export const PlusIcon = (props: IconProps) => {
  return (
    <Plus
      height={IconSizeVariants[props.size]}
      width={IconSizeVariants[props.size]}
      color={brandcolor}
    />
  );
};

export const Tweet = (props: IconProps) => {
  return (
    <X
      height={IconSizeVariants[props.size]}
      width={IconSizeVariants[props.size]}
      color={secondcolor}
    />
  );
};

export const VideoIcon = (props: IconProps) => {
  return (
    <Youtube
      height={IconSizeVariants[props.size]}
      width={IconSizeVariants[props.size]}
      color={secondcolor}
    />
  );
};

export const DeleteIcon = (props: IconProps) => {
  return (
    <Trash
      height={IconSizeVariants[props.size]}
      width={IconSizeVariants[props.size]}
      color={"#FF0000"}
    />
  );
};

export const SettingsIcon = (props: IconProps) => {
  return (
    <Settings
      height={IconSizeVariants[props.size]}
      width={IconSizeVariants[props.size]}
      color={secondcolor}
    />
  );
};

export const ProfileIcon = (props: IconProps) => {
  return (
    <ProfileCircle
      height={IconSizeVariants[props.size]}
      width={IconSizeVariants[props.size]}
      color={secondcolor}
    />
  );
};

export const BackIcon = (props: IconProps) => {
  return (
    <ArrowLeft
      height={IconSizeVariants[props.size]}
      width={IconSizeVariants[props.size]}
      color={secondcolor}
    />
  );
};

export const AllIcon = (props: IconProps) => {
  return (
    <ViewGrid
      height={IconSizeVariants[props.size]}
      width={IconSizeVariants[props.size]}
      color={secondcolor}
    />
  );
};

export const OtherIcon = (props: IconProps) => {
  return (
    <Link
      height={IconSizeVariants[props.size]}
      width={IconSizeVariants[props.size]}
      color={secondcolor}
    />
  );
};

export const ShareIcon2 = (props: IconProps) => {
  return (
    <ShareAndroidSolid
      height={IconSizeVariants[props.size]}
      width={IconSizeVariants[props.size]}
      color={"#ffffff"}
    />
  );
};
