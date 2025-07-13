import { useNavigate } from "react-router-dom";
import { BackgroundLanding } from "../components/Background";
import { Button } from "../components/Button";
import { NavBar } from "../components/Navbar";

export const Landing = () => {
  const navigate = useNavigate();

  document.title = "Second Brain - Your Personal Knowledge Hub";
  return (
    <div>
      <NavBar variant="landing" />
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <BackgroundLanding />
        <div className="text-center max-w-4xl mx-auto mt-[50px] z-10">
          <h1 className="text-5xl font-extrabold text-white md:text-6xl leading-tight">
            Save and Share Links Like Never Before
          </h1>
          <p className="text-[18px] text-neutral-silver max-w-2xl mt-[10px] mx-auto mb-8 ">
            Organize your thoughts, collections, and tools — all in one place.
            Perfect for teams, creators, and knowledge hoarders
          </p>
          <Button
            variant="primary"
            size="p-md"
            text="Get Started"
            onClick={() => navigate("/signup")}
          />
        </div>
      </div>
    </div>
  );
};
