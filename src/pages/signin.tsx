import { useMediaQuery } from "react-responsive";
import { Logo } from "../assets/icons";
import { Button } from "../components/Button";
import { Form } from "../components/Form";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "./../assets/sign_background.png";

export const SignPage = (props: { variant: "signup" | "signin" }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 460px)" });
  const navigate = useNavigate();
  return (
    <>
      {isMobile ? (
        <div className="flex flex-col min-h-screen">
          <div className="absolute top-[10px] right-[10px] z-10">
            <Button
              variant="secondary"
              size="s-md"
              text={props.variant == "signup" ? "SignIn" : "SignUp"}
              onClick={() => {
                if (props.variant == "signup") {
                  navigate("/signin");
                } else {
                  navigate("/signup");
                }
              }}
            />
          </div>
          <div className="flex items-center justify-center flex-1 flex-col">
            <div
              className="flex items-center gap-[10px] mb-[20px] cursor-pointer"
              onClick={() => navigate("/")}
            >
              <Logo size="mob" />
              <p className="text-white text-[50px] font-semibold tracking-tight">
                Second Brain
              </p>
            </div>
            <p className="text-white text-[25px] mb-[20px]">
              Welcome to Second Brain
            </p>
            <Form variant={props.variant == "signup" ? "signup" : "signin"} />
          </div>
        </div>
      ) : (
        <div className="flex justify-start h-screen">
          <div className="h-full w-[1000px] overflow-hidden justify-center items-center">
            <img
              src={BackgroundImage}
              alt="Descriptive alt"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-center items-center w-[550px] h-full space-y-[20px]">
            <div
              className="flex items-center gap-[10px] cursor-pointer"
              onClick={() => navigate("/")}
            >
              <Logo size="mob" />
              <p className="text-white text-[50px] font-semibold tracking-tight">
                Second Brain
              </p>
            </div>
            <p className="text-white text-[20px]">Welcome To Second Brain</p>
            <Form variant={props.variant == "signup" ? "signup" : "signin"} />
            <Button
              variant="secondary"
              size="s-md"
              text={props.variant == "signup" ? "Already a user?" : "New here?"}
              onClick={() => {
                if (props.variant == "signup") {
                  navigate("/signin");
                } else {
                  navigate("/signup");
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
