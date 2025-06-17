import { useMediaQuery } from "react-responsive";
import { Logo } from "../assets/logo";
import { Button } from "../components/Button";
import { Form } from "../components/Form";

export const SignIn = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 460px)" });
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="absolute top-[10px] right-[10px] z-10">
          <Button variant="secondary" size="s-md" text="SignUp" />
        </div>
        <div className="flex items-center justify-center flex-1 flex-col">
          <div className="flex items-center gap-[10px] mb-[20px]">
            {isMobile ? <Logo size="mob" /> : <Logo size="lg" />}
            <p className="text-white text-[50px] sm:text-[64px] font-semibold tracking-tight">
              Second Brain
            </p>
          </div>
          <p className="text-white text-[25px] sm:text-[30px] mb-[20px]">
            Welcome to Second Brain
          </p>
          <Form variant="signin" />
        </div>
      </div>
    </>
  );
};
