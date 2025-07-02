import { Modal } from "../components/Modal";
import { SideBar } from "../components/Sidebar";
import { useMediaQuery } from "react-responsive";
import { NavBar } from "../components/Navbar";
import { DashboardContent } from "../components/DashBoardContent";

type dashboardType = "dashboard" | "share";

export const DashBoard = (props: { varaint: dashboardType }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <div>
      {isTabletOrMobile ? <NavBar variant="mobile-dashboard" /> : <SideBar />}
      {props.varaint == "dashboard" ? (
        <DashboardContent varaint="dashboard" />
      ) : (
        <DashboardContent varaint="share" />
      )}
      <Modal variant="content" />
      <Modal variant="settings" />
      <Modal variant="delete" />
    </div>
  );
};
