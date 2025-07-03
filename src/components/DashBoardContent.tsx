import { useMediaQuery } from "react-responsive";
import { PlusIcon } from "../assets/icons";
import { Button } from "./Button";
import { Card } from "./Card";
import { useAuthContext, useModalContext } from "../hooks/hooks";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

type DashboardType = "dashboard" | "share";

type CardProps = {
  id: string;
  link: string;
  title: string;
  type:
    | "tweets"
    | "notion"
    | "documents"
    | "article"
    | "video"
    | "audio"
    | "empty";
  tags: string[];
};

export const DashboardContent = (props: { variant: DashboardType }) => {
  const [content, setContent] = useState<CardProps[]>([]);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const { setModal } = useModalContext();
  const authContext = useAuthContext();
  const { data, error } = useQuery({
    queryKey: ["cards"],
    queryFn: () => {
      if (!authContext.token) throw new Error("No token");
      return fetchCards(authContext.token);
    },
    enabled: !!authContext.token,
    refetchInterval: 1000,
  });

  useEffect(() => {
    if (data) {
      setContent(data.content || data);
    }
  }, [data]);

  if (error) {
    console.log(error);
  }

  return (
    <div className="flex flex-col tab:ml-[377px] pt-[120px] tab:pt-[47px] flex-1">
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
        <div className="flex justify-between items-center w-full px-[30px] tab:px-[70px]">
          <p className="text-white font-semibold text-[25px]">@Raju Notes</p>
        </div>
      )}
      <div className="flex flex-wrap items-start justify-start gap-[50px] pl-[70px] pt-[54px]">
        {content?.length === 0 && <Card variant="empty" />}
        {content?.length > 0 &&
          content.map((card) => (
            <Card
              variant="content"
              key={card.id}
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

const fetchCards = async (token: string) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const res = await axios.get(backend_url + "content", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
