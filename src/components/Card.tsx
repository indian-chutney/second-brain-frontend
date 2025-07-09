import type { ReactElement } from "react";
import { useContext, useState } from "react";
import { Notion } from "../assets/notion";
import { Button } from "./Button";
import {
  Tweet,
  ArticleIcon,
  VideoIcon,
  LinkIcon,
  CopyIcon,
  CopiedIcon,
  OptionsIcon,
  EmptyIcon,
  PlusIcon,
  OtherIcon,
} from "../assets/icons";
import { useModalContext } from "../hooks/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { ShareContext } from "../contexts/contexts";

type ContentTypes =
  | "tweets"
  | "notion"
  | "article"
  | "video"
  | "other"
  | "empty";

const iconsMap: Record<ContentTypes, ReactElement> = {
  tweets: <Tweet size="lg" />,
  notion: <Notion size="lg" />,
  article: <ArticleIcon size="lg" />,
  video: <VideoIcon size="lg" />,
  empty: <EmptyIcon size="lg" />,
  other: <OtherIcon size="lg" />,
};

type emptycardProps = {
  variant: "empty";
};

type Tag = {
  _id: string;
  title: string;
};

type contentcardProps = {
  _id: string;
  title: string;
  variant: "content";
  link: string;
  type: ContentTypes;
  tags: Tag[];
};

type CardProps = emptycardProps | contentcardProps;

export const Card = (props: CardProps) => {
  return (
    <div
      key={props.variant == "content" ? props._id : "empty"}
      className="w-[300px] rounded-[10px] hover:scale-[1.03] transition-transform duration-300 flex flex-col overflow-hidden"
    >
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
            id={props._id}
          />
        </>
      )}
    </div>
  );
};

const EmptyContainer = () => {
  const { setModal } = useModalContext();
  return (
    <>
      <div className="bg-btn-dark text-white px-[22px] py-[26px] flex-1">
        <Button
          variant="secondary"
          size="s-sm"
          border={true}
          text="Create new content"
          endIcon={<PlusIcon size="sm" />}
          onClick={() => {
            setModal((c) => !c);
          }}
        />
      </div>
    </>
  );
};

const Header = (props: { type: ContentTypes }) => {
  return (
    <>
      <div className="bg-[#323335] flex items-center justify-center h-[190px]">
        {iconsMap[props.type]}
      </div>
    </>
  );
};

const CardContainer = (props: {
  title: string;
  link: string;
  tags: Tag[];
  id: string;
}) => {
  return (
    <>
      <div className="bg-btn-dark text-white px-[27px] py-[27px] flex flex-col gap-[17px]">
        <div className="text-[21px]">{props.title}</div>
        <ActionButtons link={props.link} id={props.id} />
        <Tags tags={props.tags} />
      </div>
    </>
  );
};

const ActionButtons = (props: { link: string; id: string }) => {
  const [isCopied, setCopied] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const ShareCtx = useContext(ShareContext);

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
        onClick={() => {
          if (ShareCtx) {
            navigate(location.pathname + "/" + props.id);
          } else {
            navigate("/content/" + props.id);
          }
        }}
      />
    </div>
  );
};

const Tags = ({ tags }: { tags: Tag[] }) => {
  return (
    <div className="flex gap-x-[8px] gap-y-[4px] flex-wrap">
      {tags.map((tag) => (
        <Button
          key={tag._id}
          variant="secondary"
          size="s-xs"
          border={true}
          text={"#" + tag.title}
        />
      ))}
    </div>
  );
};
