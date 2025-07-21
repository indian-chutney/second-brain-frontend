import { useEffect, useState } from "react";
import { useModalContext } from "../hooks/hooks";
import { Button } from "./Button";
import { Logo } from "../assets/icons";

export const Welcome = () => {
  const { welcome, setWelcome } = useModalContext();
  if (localStorage.getItem("newUser") === "true") {
    setWelcome(true);
  }

  const [animationState, setAnimationState] = useState<"entering" | "exiting">(
    "entering",
  );
  const [shouldRender, setShouldRender] = useState(welcome);

  useEffect(() => {
    if (welcome) {
      setShouldRender(true);
      setAnimationState("entering");
    } else {
      setAnimationState("exiting");
      setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }
  }, [welcome]);

  const handleClose = () => {
    setWelcome(false);
  };

  if (!shouldRender) return null;
  return (
    <div
      className={`fixed inset-0 w-full h-full backdrop-blur-[2px] flex justify-center items-center ${
        animationState === "exiting" ? "animate-backdrop-out" : "bg-black/30"
      }`}
    >
      <div className="bg-back-dark w-[95vw] max-w-[900px] lg:max-w-[1100px] h-[90vh] mx-4 flex flex-col text-white rounded-xl shadow-xl border border-bd-silver overflow-hidden">
        {/* Header - Fixed */}
        <div className="flex flex-col items-center p-6 md:p-8 pb-4 flex-shrink-0">
          <div className="flex items-center gap-3 mb-4">
            <Logo size="mob" />
            <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
              Welcome to Second Brain
            </h1>
          </div>
          <p className="text-gray-300 text-center text-sm md:text-lg max-w-2xl">
            Your personal knowledge repository to save, organize, and share
            digital content
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg md:text-xl font-semibold text-white mb-6 text-center">
              ✨ What you can do:
            </h2>

            {/* Features Grid - Responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
              {/* Adding Links */}
              <div className="flex items-start gap-4 p-4 md:p-6 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-primary text-lg md:text-xl">
                    📎
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2 text-base md:text-lg">
                    Save Any Link
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Add articles, videos, tweets, and more with automatic
                    previews and organization. Perfect for building your digital
                    knowledge base.
                  </p>
                </div>
              </div>

              {/* Edit & Delete */}
              <div className="flex items-start gap-4 p-4 md:p-6 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-400 text-lg md:text-xl">✏️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2 text-base md:text-lg">
                    Edit & Delete
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Keep your collection organized by editing titles, tags, or
                    removing outdated content. Full control over your library.
                  </p>
                </div>
              </div>

              {/* Share Feature */}
              <div className="flex items-start gap-4 p-4 md:p-6 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-400 text-lg md:text-xl">🔗</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2 text-base md:text-lg">
                    Share with Friends
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Generate shareable links in Settings to let others explore
                    your curated knowledge and discover new content.
                  </p>
                </div>
              </div>

              {/* Organization Feature */}
              <div className="flex items-start gap-4 p-4 md:p-6 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-orange-400 text-lg md:text-xl">🏷️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2 text-base md:text-lg">
                    Smart Organization
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Use tags and categories to organize your content. Filter by
                    type: tweets, articles, videos, and more.
                  </p>
                </div>
              </div>
            </div>

            {/* Getting Started Steps */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 md:p-6 mb-6">
              <h3 className="text-white font-semibold mb-4 text-center text-base md:text-lg">
                🚀 Quick Start Guide
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-400 font-bold">1</span>
                  </div>
                  <p className="text-blue-300 text-sm">Click "Add content"</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-400 font-bold">2</span>
                  </div>
                  <p className="text-blue-300 text-sm">Paste your link</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-400 font-bold">3</span>
                  </div>
                  <p className="text-blue-300 text-sm">Start building!</p>
                </div>
              </div>
            </div>

            {/* Pro Tips */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 md:p-6">
              <h3 className="text-white font-semibold mb-3 text-base md:text-lg">
                💡 Pro Tips
              </h3>
              <ul className="space-y-2 text-yellow-200 text-sm md:text-base">
                <li>• Use descriptive titles to find content quickly</li>
                <li>• Add relevant tags for better organization</li>
                <li>• Share your brain with friends via Settings</li>
                <li>• Filter by content type to focus on specific materials</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Button - Fixed */}
        <div className="flex justify-center p-4 md:p-8 pt-4 flex-shrink-0 border-t border-bd-silver/20">
          <Button
            variant="primary"
            size="p-sm"
            text="Let's Get Started"
            onClick={handleClose}
          />
        </div>
      </div>
    </div>
  );
};
