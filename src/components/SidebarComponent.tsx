import type { ReactElement } from "react";
import { ArticleIcon } from "../assets/article";
import { AudioIcon } from "../assets/audio";
import { Notion } from "../assets/notion";
import { DoumentIcon } from "../assets/document";
import { Tweet } from "../assets/tweet";
import { VideoIcon } from "../assets/video";

const iconsMap: Record<string, ReactElement> = {
  tweets: <Tweet size="md" />,
  notion: <Notion size="md" />,
  document: <DoumentIcon size="md" />,
  article: <ArticleIcon size="md" />,
  video: <VideoIcon size="md" />,
  audio: <AudioIcon size="md" />,
};

type variants =
  | "tweets"
  | "notion"
  | "document"
  | "article"
  | "video"
  | "audio";

export const SidebarComponent = (props: { variant: variants }) => {
  return (
    <div className="flex items-center gap-[5px]">
      {iconsMap[props.variant]}
      <p className="text-[20px] text-white hover:text-brand-primary">
        {props.variant.charAt(0).toUpperCase() + props.variant.slice(1)}
      </p>
    </div>
  );
};
