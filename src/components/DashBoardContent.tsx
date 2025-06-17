import { useMediaQuery } from "react-responsive";
import { PlusIcon } from "../assets/plus";
import { Button } from "./Button";
import { Card } from "./Card";
import { Modal } from "./Modal";

export const DashboardContent = (props: {
  modal: boolean;
  toggleModal: () => void;
}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <div className="flex flex-col tab:ml-[377px] pt-[120px] tab:pt-[47px] flex-1">
      <div className="flex justify-between items-center w-full px-[30px] tab:px-[70px]">
        <p className="text-white font-semibold text-[25px]">All Notes</p>
        <Button
          variant="secondary"
          size={`${isTabletOrMobile ? "s-sm" : "s-md"}`}
          text="Add content"
          endIcon={<PlusIcon size="md" />}
          onClick={props.toggleModal}
        />
      </div>
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

        <Modal isOpen={props.modal} close={props.toggleModal} />
      </div>
    </div>
  );
};
