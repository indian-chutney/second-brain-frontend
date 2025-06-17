import { useState } from "react";
import { DropIcon } from "../assets/drop";
import { Logo } from "../assets/logo";
import { ExitIcon } from "../assets/exit";
import { SidebarComponent } from "./SidebarComponent";
import { Button } from "./Button";

type navbarVariants = "mobile-dashboard" | "landing";

export const NavBar = (props: { variant: navbarVariants }) => {
  if (props.variant === "landing") return <LandingNavbar />;
  return <DashNavbar />;
};

const LandingNavbar = () => {
  return (
    <div className="fixed top-0 left-0 bg-back-dark flex justify-between items-center w-full px-[20px] py-[18px] border border-solid border-b-bd-silver z-50">
      <div className="flex items-center gap-[5px]">
        <Logo size="logo" />
        <p className="text-white text-[29px] font-semibold tracking-tight">
          Second Brain
        </p>
      </div>
      <Button variant="primary" size="p-sm" text="Get Started" />
    </div>
  );
};

const DashNavbar = () => {
  const [navopen, setOpen] = useState(false);

  const toggleNav = () => {
    setOpen(!navopen);
  };

  const navclose = "border border-solid border-b-bd-silver ";

  return (
    <>
      <div
        className={`fixed top-0 left-0 bg-back-dark flex justify-between items-center ${!navopen && navclose} w-full px-[25px] py-[25px] z-50`}
      >
        <Logo size="logo" />
        <div className="flex gap-[10px]">
          <button
            className="flex items-center p-2 border border-solid rounded-md border-btn border-bd-silver"
            onClick={() => toggleNav()}
            aria-label={navopen ? "Close menu" : "Open menu"}
            aria-expanded={navopen}
          >
            {navopen ? <ExitIcon size="md" /> : <DropIcon size="md" />}
          </button>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-back-dark z-40 transition-all duration-300 ease-in-out ${
          navopen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
        // Adjust based on your navbar height
      >
        <DropDown />
      </div>

      {/* Optional: Backdrop blur effect for content behind */}
      {navopen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-30" />
      )}
    </>
  );
};

const DropDown = () => {
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
    <div className="h-full w-full pt-[100px] overflow-y-auto">
      {/* Dropdown Content */}
      <div className="px-[30px] py-[20px]">
        {/* Add Content Button (Mobile) */}

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-[20px]">
          <h3 className="text-neutral-silver text-sm font-medium uppercase tracking-wider mb-[10px]">
            Content Types
          </h3>
          {contentVariant.map((content, index) => (
            <div
              key={content}
              className="transform transition-all duration-200 ease-out"
              style={{
                animationDelay: `${index * 50}ms`,
                animation: "slideInLeft 0.3s ease-out forwards",
              }}
            >
              <SidebarComponent variant={content} />
            </div>
          ))}
        </nav>

        {/* Optional: Additional Menu Items */}
        <div className="mt-[60px] pt-[30px] border-t border-bd-silver">
          <div className="flex flex-col gap-[20px]">
            <button className="text-left text-white hover:text-brand-primary transition-colors duration-200 py-2">
              Settings
            </button>
            <button className="text-left text-white hover:text-brand-primary transition-colors duration-200 py-2">
              Account
            </button>
            <button className="text-left text-neutral-silver hover:text-red-500 transition-colors duration-200 py-2">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
