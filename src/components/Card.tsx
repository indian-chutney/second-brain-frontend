import type { ReactElement } from "react";
import { useState } from "react";
import { Tweet } from "../assets/tweet";
import { Notion } from "../assets/notion";
import { DoumentIcon } from "../assets/document";
import { ArticleIcon } from "../assets/article";
import { VideoIcon } from "../assets/video";
import { AudioIcon } from "../assets/audio";
import { Button } from "./Button";
import { LinkIcon } from "../assets/Link";
import { CopyIcon } from "../assets/clipboard1";
import { CopiedIcon } from "../assets/clipboard2";
import { OptionsIcon } from "../assets/dots";
import { EmptyIcon } from "../assets/empty";
import { PlusIcon } from "../assets/plus";

type ContentTypes =
  | "tweets"
  | "notion"
  | "documents"
  | "article"
  | "video"
  | "audio"
  | "empty";

const iconsMap: Record<ContentTypes, ReactElement> = {
  tweets: <Tweet size="lg" />,
  notion: <Notion size="lg" />,
  documents: <DoumentIcon size="lg" />,
  article: <ArticleIcon size="lg" />,
  video: <VideoIcon size="lg" />,
  audio: <AudioIcon size="lg" />,
  empty: <EmptyIcon size="lg" />,
};

type emptycardProps = {
  variant: "empty";
};

type contentcardProps = {
  title: string;
  variant: "content";
  link: string;
  type: ContentTypes;
  tags: string[];
};

type CardProps = emptycardProps | contentcardProps;

export const Card = (props: CardProps) => {
  return (
    <div className="w-[300px] rounded-[10px] flex flex-col overflow-hidden">
      {props.variant === "empty" ? (
        <>
          <Header type="empty" />
          <EmptyContainer />
        </>
      ) : (
        <>
          <Header type={props.type} />
          <CardContainer
            title={props.title}
            link={props.link}
            tags={props.tags}
          />
        </>
      )}
    </div>
  );
};

const EmptyContainer = () => {
  return (
    <>
      <div className="bg-btn-dark text-white px-[22px] py-[26px] flex-1">
        <Button
          variant="secondary"
          size="s-sm"
          border={true}
          text="Create New Card"
          endIcon={<PlusIcon size="sm" />}
        />
      </div>
    </>
  );
};

const Header = (props: { type: ContentTypes }) => {
  return (
    <>
      <div className="bg-[#323335] flex items-center justify-center h-[180px]">
        {iconsMap[props.type]}
      </div>
    </>
  );
};

const CardContainer = (props: {
  title: string;
  link: string;
  tags: string[];
}) => {
  return (
    <>
      <div className="bg-btn-dark text-white px-[22px] py-[26px] flex flex-col gap-[20px]">
        <div className="text-[21px]">{props.title}</div>
        <ActionButtons link={props.link} />
        <Tags tags={props.tags} />
      </div>
    </>
  );
};

const ActionButtons = (props: { link: string }) => {
  const [isCopied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log("error in copying" + err);
    }
  };

  return (
    <div className="flex gap-[10px]">
      <Button
        variant="secondary"
        size="s-sm"
        border={true}
        text="Link"
        endIcon={<LinkIcon size="sm" />}
        onClick={() => {
          window.open(props.link, "_blank", "noopener,noreferrer");
        }}
      />
      <Button
        variant="secondary"
        size="s-ico"
        border={true}
        startIcon={isCopied ? <CopiedIcon size="sm" /> : <CopyIcon size="sm" />}
        onClick={handleCopy}
      />
      <Button
        variant="secondary"
        size="s-ico"
        border={true}
        startIcon={<OptionsIcon size="sm" />}
      />
    </div>
  );
};

const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex gap-x-[8px] gap-y-[4px] flex-wrap">
      {tags.map((tag, index) => (
        <Button
          key={index}
          variant="secondary"
          size="s-xs"
          border={true}
          text={"#" + tag}
        />
      ))}
    </div>
  );
};
