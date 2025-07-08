import { Modal } from "../components/Modal";
import { DashboardContent } from "../components/DashBoardContent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type dashboardType = "dashboard" | "share";

const queryClient = new QueryClient();

export const DashBoard = (props: { varaint: dashboardType }) => {
  return (
    <div>
      {props.varaint == "dashboard" ? (
        <QueryClientProvider client={queryClient}>
          <DashboardContent variant="dashboard" />
          <Modal variant="content" />
        </QueryClientProvider>
      ) : (
        <DashboardContent variant="share" />
      )}

      <Modal variant="settings" />
    </div>
  );
};
