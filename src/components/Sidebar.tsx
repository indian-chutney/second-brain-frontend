import { Logo } from "../assets/logo";
import { SidebarComponent } from "./SidebarComponent";

export const SideBar = () => {
  type variants =
    | "tweets"
    | "notion"
    | "document"
    | "article"
    | "video"
    | "audio";

  const contentVariant: variants[] = [
    "tweets",
    "article",
    "notion",
    "document",
    "video",
    "audio",
  ];

  return (
    <div className="h-full w-[377px] flex flex-col pl-[50px] pt-[52px] bg-back-dark border border-solid border-r-bd-silver fixed top-0 left-0">
      <Header />
      <nav className="pt-[56px] flex flex-col gap-[40px]">
        {contentVariant.map((content) => (
          <SidebarComponent variant={content} />
        ))}
      </nav>
    </div>
  );
};

const Header = () => {
  return (
    <div className="flex items-center gap-[7px]">
      <Logo size="logo" />
      <p className="text-white text-[29px] font-semibold tracking-tight">
        Second Brain
      </p>
    </div>
  );
};
