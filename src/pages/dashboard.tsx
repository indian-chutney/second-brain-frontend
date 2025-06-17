import { useState } from "react";
import { Modal } from "../components/Modal";
import { SideBar } from "../components/Sidebar";
import { useMediaQuery } from "react-responsive";
import { NavBar } from "../components/Navbar";
import { DashboardContent } from "../components/DashBoardContent";

export const DashBoard = () => {
  const [modal, setModal] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      {isTabletOrMobile ? <NavBar variant="mobile-dashboard" /> : <SideBar />}
      <DashboardContent modal={modal} toggleModal={toggleModal} />
      <Modal isOpen={modal} close={toggleModal} />
    </div>
  );
};
