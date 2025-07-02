import type { ReactElement } from "react";

import { Notion } from "../assets/notion";

import {
  ArticleIcon,
  AudioIcon,
  DocumentIcon,
  SettingsIcon,
  Tweet,
  VideoIcon,
} from "../assets/icons";
import { useModalContext } from "../hooks/hooks";

const iconsMap: Record<string, ReactElement> = {
  tweets: <Tweet size="md" />,
  notion: <Notion size="md" />,
  document: <DocumentIcon size="md" />,
  article: <ArticleIcon size="md" />,
  video: <VideoIcon size="md" />,
  audio: <AudioIcon size="md" />,
  settings: <SettingsIcon size="md" />,
};

type variants =
  | "tweets"
  | "notion"
  | "document"
  | "article"
  | "video"
  | "audio"
  | "settings";

export const SidebarComponent = (props: { variant: variants }) => {
  const { setSetting } = useModalContext();
  return (
    <div
      className="flex items-center gap-[5px] cursor-pointer"
      onClick={
        props.variant == "settings" ? () => setSetting((c) => !c) : undefined
      }
    >
      {iconsMap[props.variant]}
      <p className="text-[20px] text-white hover:text-brand-primary">
        {props.variant.charAt(0).toUpperCase() + props.variant.slice(1)}
      </p>
    </div>
  );
};
