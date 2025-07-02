import { InputBox } from "./Input";
import { Button } from "./Button";
import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/contexts";

type Variants = "modal" | "signup" | "signin";

interface FormProps {
  variant: Variants;
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface formDataProps {
  email: string | null;
  password: string | null;
  username?: string | null;
  confirmPassword?: string | null;
}

const backend_url = import.meta.env.VITE_BACKEND_URL;

export const Form = (props: FormProps) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (props.variant == "signup" || props.variant == "signin") {
      const authData: formDataProps = {
        email: formData.get("Email") as string,
        password: formData.get("Password") as string,
        ...(props.variant == "signup" && {
          username: formData.get("Username") as string,
          confirmPassword: formData.get("ConfirmPassword") as string,
        }),
      };

      const { data, errors } = validateForm(
        props.variant == "signup" ? signupSchema : loginSchema,
        authData,
      );
      if (errors) {
        setErrors(errors);
      } else {
        const datawithVariant = {
          ...data,
          variant: props.variant == "signup" ? "signup" : "signin",
        };
        const { backendError, response, token } = await signBackendPost(
          datawithVariant as authDataProps,
        );
        if (backendError) {
          setErrors({ backend: response });
          console.log(errors);
        } else {
          setErrors({});
          setSuccess(true);
          if (token) {
            setToken(token);
          }
        }
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {props.variant === "modal" ? (
        <ModalForm errors={errors} />
      ) : (
        <SignForm
          errors={errors}
          variant={props.variant}
          isSuccess={success}
          onSuccess={
            props.variant == "signup"
              ? () => {
                  navigate("/signin");
                }
              : () => {
                  if (token) {
                    authContext?.login(token);
                  }
                }
          }
        />
      )}
    </form>
  );
};

const ModalForm = ({ errors }: { errors: FormErrors }) => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <InputBox variant="input" name="Title" error={!!errors.title} />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <InputBox variant="options" name="Type" error={!!errors.type} />
        {errors.type && (
          <p className="text-red-500 text-sm mt-1">{errors.type}</p>
        )}
      </div>

      <div>
        <InputBox variant="input" name="Link" error={!!errors.link} />
        {errors.link && (
          <p className="text-red-500 text-sm mt-1">{errors.link}</p>
        )}
      </div>

      <div>
        <InputBox variant="tags" name="Tags" error={!!errors.tags} />
        {errors.tags && (
          <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
        )}
      </div>

      <Button variant="primary" size="p-sm" text="Submit" />
    </div>
  );
};

const ErrorText = ({ children }: { children: string }) => (
  <p className="text-red-400 text-xs mt-1.5 px-1 leading-4 opacity-90">
    {children}
  </p>
);

const ErrorBanner = ({ message }: { message: string }) => (
  <div className="bg-red-500/8 border border-red-500/15 rounded-lg p-3 mb-2">
    <p className="text-red-400 text-sm">{message}</p>
  </div>
);

const SuccessBanner = ({ message }: { message: string }) => (
  <div className="bg-green-500/8 border border-green-500/15 rounded-lg p-3 mb-2">
    <p className="text-green-400 text-sm">{message}</p>
  </div>
);

const InputWrapper = ({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: string;
}) => (
  <div className="space-y-0">
    {children}
    {error && <ErrorText>{error}</ErrorText>}
  </div>
);

const SignForm = ({
  errors,
  variant,
  isSuccess,
  onSuccess,
}: {
  errors: FormErrors;
  variant: "signin" | "signup";
  isSuccess?: boolean;
  onSuccess?: () => void;
}) => {
  useEffect(() => {
    if (isSuccess && onSuccess) {
      const timer = setTimeout(() => {
        onSuccess();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, onSuccess]);

  return (
    <div
      className={`bg-back-dark w-[400px] flex flex-col text-white p-6 gap-6 rounded-xl ${isSuccess ? "opacity-50 pointer-events-none" : ""}`}
    >
      {errors.backend && <ErrorBanner message={errors.backend} />}
      {isSuccess && (
        <SuccessBanner
          message={
            variant === "signup"
              ? "Account created successfully!"
              : "Signed in successfully!"
          }
        />
      )}
      <InputWrapper error={errors.email}>
        <InputBox variant="input" name="Email" error={!!errors.email} />
      </InputWrapper>

      {variant === "signup" && (
        <InputWrapper error={errors.username}>
          <InputBox variant="input" name="Username" error={!!errors.username} />
        </InputWrapper>
      )}

      <InputWrapper error={errors.password}>
        <InputBox
          variant="input"
          name="Password"
          pwd={true}
          error={!!errors.password}
        />
      </InputWrapper>

      {variant === "signup" && (
        <InputWrapper error={errors.confirmPassword}>
          <InputBox
            variant="input"
            name="ConfirmPassword"
            pwd={true}
            error={!!errors.confirmPassword}
          />
        </InputWrapper>
      )}

      <Button
        variant="primary"
        size="p-sm"
        text={variant === "signin" ? "Sign In" : "Sign Up"}
      />
    </div>
  );
};

const loginSchema = z.object({
  email: z.string().email("Invalid email id"),
  password: z.string().min(8, "Password must be longer"),
});

const signupSchema = loginSchema
  .extend({
    username: z.string().min(5, "Username must be longer"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const validateForm = <T extends z.ZodTypeAny>(
  schema: T,
  formData: Record<string, any>,
): { data?: z.infer<T>; errors?: FormErrors } => {
  const errors: FormErrors = {};

  const result = schema.safeParse(formData);

  if (result.success) {
    return { data: result.data };
  }

  for (const issue of result.error.errors) {
    const field = issue.path[0] as string;
    errors[field] = issue.message;
  }
  return { errors };
};

type LoginData = {
  variant: "signin";
  email: string;
  password: string;
};

type SignupData = {
  variant: "signup";
  email: string;
  password: string;
  username: string;
};

type authDataProps = LoginData | SignupData;
type backendResponse = {
  backendError: boolean;
  response: string;
  token?: string;
};

const signBackendPost = async (
  authData: authDataProps,
): Promise<backendResponse> => {
  let response: any = {};
  let error = false;

  console.log(backend_url);
  await axios
    .post(backend_url + authData.variant, {
      email: authData.email,
      ...(authData.variant == "signup" && { username: authData.username }),
      password: authData.password,
    })
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      response = err.response?.data || err;
      error = true;
    });

  return {
    backendError: error,
    response: error
      ? response.message || "Something went wrong"
      : authData.variant === "signup"
        ? response.message
        : "Signin successful",
    token: !error && authData.variant == "signin" ? response.token : undefined,
  };
};
