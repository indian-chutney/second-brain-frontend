import { useMediaQuery } from "react-responsive";
import { NavBar } from "../components/Navbar";
import { SideBar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export const HomeLayout = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <div>
      {isTabletOrMobile ? <NavBar variant="mobile-dashboard" /> : <SideBar />}
      <Outlet />
    </div>
  );
};
