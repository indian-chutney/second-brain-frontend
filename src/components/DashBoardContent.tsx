import { useMediaQuery } from "react-responsive";
import { PlusIcon } from "../assets/icons";
import { Button } from "./Button";
import { Card } from "./Card";
import { useModalContext } from "../hooks/hooks";

type DashboardType = "dashboard" | "share";

export const DashboardContent = (props: { varaint: DashboardType }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const { setModal } = useModalContext();
  return (
    <div className="flex flex-col tab:ml-[377px] pt-[120px] tab:pt-[47px] flex-1">
      {props.varaint == "dashboard" && (
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
      {props.varaint == "share" && (
        <div className="flex justify-between items-center w-full px-[30px] tab:px-[70px]">
          <p className="text-white font-semibold text-[25px]">@Raju Notes</p>
        </div>
      )}
      <div className="flex flex-wrap items-start justify-start gap-[50px] pl-[70px] pt-[54px]">
        <Card variant="empty" />
        <Card
          variant="content"
          title="Trump's tweet"
          link="https://www.example.com"
          type="tweets"
          tags={["productivity", "politics"]}
        />
        <Card variant="empty" />
        <Card variant="empty" />
        <Card variant="empty" />
        <Card variant="empty" />
        <Card variant="empty" />
        <Card variant="empty" />
        <Card variant="empty" />
        <Card variant="empty" />
      </div>
    </div>
  );
};
