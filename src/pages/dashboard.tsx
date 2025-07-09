import { Modal } from "../components/Modal";
import { DashboardContent } from "../components/DashBoardContent";

type dashboardType = "dashboard" | "share";

export const DashBoard = (props: { variant: dashboardType }) => {
  return (
    <div>
      {props.variant == "dashboard" ? (
        <>
          <DashboardContent variant="dashboard" />
          <Modal variant="content" />
        </>
      ) : (
        <DashboardContent variant="share" />
      )}

      <Modal variant="settings" />
    </div>
  );
};
