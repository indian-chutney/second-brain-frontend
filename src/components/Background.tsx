import { useEffect, useRef } from "react";
import { Notion } from "../assets/notion";

import { ArticleIcon, LinkIcon, Tweet, VideoIcon } from "../assets/icons";

export const BackgroundLanding = () => {
  const iconsref = useRef<(HTMLDivElement | null)[]>([]);

  const defaultStyle =
    "absolute hidden md:block opacity-70 hover:opacity-100 transition duration-[450ms] ease-out";

  useEffect(() => {
    function handleMouse(e: MouseEvent): void {
      const { innerWidth, innerHeight } = window;
      iconsref.current.forEach((iconref) => {
        if (!iconsref) return;
        const x = (e.clientX - innerWidth / 2) / 20;
        const y = (e.clientY - innerHeight / 2) / 20;

        iconref!.style.transform = `translate(${x}px, ${y}px)`;
      });
    }

    window.addEventListener("mousemove", handleMouse);

    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);
  return (
    <>
      <div
        ref={(el) => {
          iconsref.current[0] = el;
        }}
        className={`${defaultStyle} top-35 left-60`}
      >
        <Tweet size="lg" />
      </div>
      <div
        ref={(el) => {
          iconsref.current[1] = el;
        }}
        className={`${defaultStyle} bottom-80 left-20`}
      >
        <ArticleIcon size="lg" />
      </div>
      <div
        ref={(el) => {
          iconsref.current[2] = el;
        }}
        className={`${defaultStyle} bottom-20 left-60`}
      >
        <Notion size="lg" />
      </div>

      <div
        ref={(el) => {
          iconsref.current[3] = el;
        }}
        className={`${defaultStyle} top-1/4 right-50`}
      >
        <LinkIcon size="lg" />
      </div>
      <div
        ref={(el) => {
          iconsref.current[4] = el;
        }}
        className={`${defaultStyle} bottom-30 right-60`}
      >
        <VideoIcon size="lg" />
      </div>
    </>
  );
};
