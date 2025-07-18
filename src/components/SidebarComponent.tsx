import React, { type ReactElement } from "react";

import { Notion } from "../assets/notion";

import {
  AllIcon,
  ArticleIcon,
  OtherIcon,
  SettingsIcon,
  Tweet,
  VideoIcon,
} from "../assets/icons";
import { useModalContext } from "../hooks/hooks";
import { type Content } from "../contexts/contexts";

const iconsMap: Record<string, ReactElement> = {
  all: <AllIcon size="md" />,
  tweets: <Tweet size="md" />,
  notion: <Notion size="md" />,
  article: <ArticleIcon size="md" />,
  video: <VideoIcon size="md" />,
  other: <OtherIcon size="md" />,
  settings: <SettingsIcon size="md" />,
};

type variants =
  | "all"
  | "tweets"
  | "notion"
  | "article"
  | "video"
  | "settings"
  | "other";

export const SidebarComponent = (props: {
  variant: variants;
  setType: React.Dispatch<React.SetStateAction<Content>>;
  isActive?: boolean;
}) => {
  const { setSetting } = useModalContext();
  return (
    <div
      className="flex items-center gap-[5px] cursor-pointer"
      onClick={
        props.variant == "settings"
          ? () => setSetting((c) => !c)
          : () => props.setType?.(props.variant as Content)
      }
    >
      {iconsMap[props.variant]}
      <p
        className={`text-[20px] transition-colors duration-200 ${
          props.isActive
            ? "text-brand-primary font-semibold"
            : "text-white hover:text-brand-primary"
        }`}
      >
        {props.variant.charAt(0).toUpperCase() + props.variant.slice(1)}
      </p>
    </div>
  );
};
