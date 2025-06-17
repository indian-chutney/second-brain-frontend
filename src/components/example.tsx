// adjust import

import { ArticleIcon } from "../assets/article";
import { DoumentIcon } from "../assets/document";
import { Notion } from "../assets/notion";
import { Tweet } from "../assets/tweet";

export default function HeroWithIcons() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Icons */}
      <div className="absolute top-10 left-10 hidden md:block">
        <Tweet size="lg" />
      </div>
      <div className="absolute top-20 right-20 hidden md:block">
        <Notion size="lg" />
      </div>
      <div className="absolute bottom-24 left-32 hidden md:block">
        <ArticleIcon size="lg" />
      </div>
      <div className="absolute bottom-10 right-10 hidden md:block">
        <DoumentIcon size="lg" />
      </div>

      {/* Hero Content */}
      <div className="z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          Say hello
        </h1>
        <p className="text-xl text-gray-500 mt-2">
          to your new free icon library.
        </p>
        <button className="mt-6 px-6 py-2 bg-black text-white rounded-full">
          Get Started
        </button>
      </div>
    </section>
  );
}
