import { useMediaQuery } from "react-responsive";
import { HomeIcon, PlusIcon } from "../assets/icons";
import { Button } from "./Button";
import { Card } from "./Card";
import {
  useContentContext,
  useModalContext,
  useShareContext,
} from "../hooks/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import type { ContentItem } from "../contexts/contexts";

type DashboardType = "dashboard" | "share";

export const DashboardContent = (props: { variant: DashboardType }) => {
  return (
    <>{props.variant === "dashboard" ? <DashBoardLogic /> : <ShareLogic />}</>
  );
};

const ShareLogic = () => {
  const { shareContent, setHash } = useShareContext();
  const { id } = useParams();
  useEffect(() => {
    if (id !== undefined) {
      setHash(id);
    }
  }, [id, setHash]);
  return <DashBoardUI variant="share" content={shareContent} />;
};

const DashBoardLogic = () => {
  const { rootContent } = useContentContext();
  return <DashBoardUI variant="dashboard" content={rootContent} />;
};

const DashBoardUI = (props: {
  variant: DashboardType;
  content: ContentItem[];
}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const { setModal } = useModalContext();
  const navigate = useNavigate();

  const contentToRender = props.content;
  return (
    <div className="flex flex-col tab:ml-[377px] pt-[120px] tab:pt-[47px] flex-1 mb-[30px]">
      {props.variant == "dashboard" && (
        <div className="flex justify-between items-center w-full px-[30px] tab:px-[70px]">
          <p className="text-white font-semibold text-[25px]">All Notes</p>
          <Button
            variant="secondary"
            size={`${isTabletOrMobile ? "s-sm" : "s-md"}`}
            text="Add content"
            endIcon={<PlusIcon size="md" />}
            onClick={() => setModal((c) => !c)}
          />
        </div>
      )}
      {props.variant == "share" && (
        <div className="flex justify-start items-center w-full px-[30px] tab:px-[70px] gap-[20px]">
          <Button
            variant="secondary"
            size="s-ico"
            startIcon={<HomeIcon size="md" />}
            onClick={() => navigate("/")}
          />
          <p className="text-white font-semibold text-[25px]">
            {contentToRender[0]
              ? `@${contentToRender[0].userid.username}'s Notes`
              : "Loading... (user nor found)"}
          </p>
        </div>
      )}
      <div className="flex flex-wrap items-start justify-start gap-[50px] pl-[70px] pt-[54px]">
        {contentToRender?.length === 0 &&
          (props.variant === "share" ? (
            <p className="text-white text-lg">No Content Uploaded</p>
          ) : (
            <Card variant="empty" />
          ))}
        {contentToRender?.length > 0 &&
          contentToRender.map((card) => (
            <Card
              _id={card._id}
              variant="content"
              key={card._id}
              link={card.link}
              title={card.title}
              type={card.type}
              tags={card.tags}
            />
          ))}
      </div>
    </div>
  );
};
