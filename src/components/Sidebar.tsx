import { useContext } from "react";
import { Logo } from "../assets/icons";
import { SidebarComponent } from "./SidebarComponent";
import { ContentContext, ShareContext } from "../contexts/contexts";
import { useNavigate } from "react-router-dom";

export const SideBar = () => {
  type variants = "all" | "tweets" | "notion" | "article" | "video" | "other";

  const contentVariant: variants[] = [
    "all",
    "tweets",
    "article",
    "notion",
    "video",
    "other",
  ];

  const ShareCtx = useContext(ShareContext);
  const ContentCtx = useContext(ContentContext);

  const type = ShareCtx ? ShareCtx.type : ContentCtx!.type;
  const setType = ShareCtx ? ShareCtx.setType : ContentCtx!.setType;

  return (
    <div className="h-full w-[377px] flex flex-col pl-[50px] pt-[52px] bg-back-dark border border-solid border-r-bd-silver fixed top-0 left-0">
      <Header />
      <nav className="pt-[56px] flex flex-col gap-[40px] flex-1">
        {contentVariant.map((content) => (
          <SidebarComponent
            variant={content}
            key={content}
            setType={setType}
            isActive={content == type}
          />
        ))}
      </nav>
      <div className="pb-[52px]">
        <SidebarComponent
          variant="settings"
          key={"settings"}
          setType={setType}
        />
      </div>
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center gap-[7px] cursor-pointer"
      onClick={() => navigate("/")}
    >
      <Logo size="logo" />
      <p className="text-white text-[29px] font-semibold tracking-tight">
        Second Brain
      </p>
    </div>
  );
};
