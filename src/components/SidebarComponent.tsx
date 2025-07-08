import type { ReactElement } from "react";

import { Notion } from "../assets/notion";

import {
  AllIcon,
  ArticleIcon,
  OtherIcon,
  SettingsIcon,
  Tweet,
  VideoIcon,
} from "../assets/icons";
import { useContentContext, useModalContext } from "../hooks/hooks";
import type { Content } from "../contexts/contexts";

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

export const SidebarComponent = (props: { variant: variants }) => {
  const { setSetting } = useModalContext();
  const { setType } = useContentContext();
  return (
    <div
      className="flex items-center gap-[5px] cursor-pointer"
      onClick={
        props.variant == "settings"
          ? () => setSetting((c) => !c)
          : () => setType(props.variant as Content)
      }
    >
      {iconsMap[props.variant]}
      <p className="text-[20px] text-white hover:text-brand-primary">
        {props.variant.charAt(0).toUpperCase() + props.variant.slice(1)}
      </p>
    </div>
  );
};
