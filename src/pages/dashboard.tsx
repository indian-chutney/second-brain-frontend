import { Modal } from "../components/Modal";
import { DashboardContent } from "../components/DashBoardContent";
import { Welcome } from "../components/Welcome";

type dashboardType = "dashboard" | "share";

export const DashBoard = (props: { variant: dashboardType }) => {
  document.title = props.variant == "dashboard" ? "Your Notes" : "Shared Notes";
  return (
    <div>
      {props.variant == "dashboard" ? (
        <>
          <DashboardContent variant="dashboard" />
          <Modal variant="content" />
          <Welcome />
        </>
      ) : (
        <DashboardContent variant="share" />
      )}

      <Modal variant="settings" />
    </div>
  );
};
