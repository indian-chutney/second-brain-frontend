import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import { SideBar } from "../components/Sidebar";
import { PlusIcon } from "../assets/plus";

export const DashBoard = () => {
  const [modal, setModal] = useState(false);

  const close = () => {
    setModal(false);
  };
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col ml-[377px] pt-[47px] flex-1">
        <div className="flex justify-between items-center w-full px-[70px]">
          <p className="text-white font-semibold text-[25px]">All Notes</p>
          <Button
            variant="secondary"
            size="s-md"
            text="Add content"
            endIcon={<PlusIcon size="md" />}
            onClick={() => setModal(true)}
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

          <Modal isOpen={modal} close={close} />
        </div>
      </div>
    </div>
  );
};
