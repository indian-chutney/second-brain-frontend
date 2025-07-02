import { useMediaQuery } from "react-responsive";
import { SideBar } from "../components/Sidebar";
import { NavBar } from "../components/Navbar";
import { Modal } from "../components/Modal";
import { Button } from "../components/Button";
import { BackIcon } from "../assets/icons";
import { useEffect, useState } from "react";

export const Content = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const key = import.meta.env.VITE_EMBED_KEY;
  const data = "https://x.com/realDonaldTrump/status/1936573183634645387";
  const [imgsrc, setImg] = useState("");

  useEffect(() => {
    fetch("https://api.linkpreview.net", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Linkpreview-Api-Key": key,
      },
      body: new URLSearchParams({
        q: data,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setImg(data.image);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  return (
    <>
      <div>
        {isTabletOrMobile ? <NavBar variant="mobile-dashboard" /> : <SideBar />}
        <div className="flex flex-col tab:ml-[377px] flex-1 -space-y-7">
          <div className="flex w-full justify-start items-center pl-[40px] bg-bd-silver h-[160px]">
            <Button
              variant="secondary"
              size="s-ico"
              startIcon={<BackIcon size="md" />}
            />
          </div>
          <div className="flex justify-between pl-[100px] pr-[40px]">
            <p className="text-white text-[48px] font-semibold -mt-2 ">
              Trump's Tweet
            </p>
            <div className="flex gap-[10px]">
              <Button variant="secondary" size="s-md" text="Edit" />
              <Button variant="secondary" size="s-md" text="Delete" />
            </div>
          </div>
          <div className="flex flex-col mt-10 pl-[100px] text-white">
            <div className="flex mt-10 bg-bd-silver w-[400px] rounded-[10px] justify-center items-center">
              <img
                className="w-[300px] py-[50px] rounded-[10px] cursor-pointer"
                src={imgsrc}
                alt="broken"
                onClick={() =>
                  window.open(data, "_blank", "noopener,noreferrer")
                }
              />
            </div>
            <div className="flex justify-start mt-[50px] gap-[10px] items-center">
              <p className="text-white font-semibold text-[25px]">Tags:</p>
              <div className="flex gap-[10px]">
                <Button variant="secondary" size="s-xs" text="# poltics" />
                <Button variant="secondary" size="s-xs" text="# geopolitics" />
              </div>
            </div>
            <div className="flex justify-start mt-[30px] gap-[10px] items-center">
              <p className="text-white font-semibold text-[25px]">Created On</p>
              <div>
                <Button variant="secondary" size="s-xs" text="18 Jun 2025" />
              </div>
            </div>
            <div className="flex justify-start my-[30px] gap-[10px] items-center">
              <p className="text-white font-semibold text-[25px]">Created By</p>
              <div>
                <Button variant="secondary" size="s-xs" text="@ Raju" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal variant="settings" />
    </>
  );
};
