import { InputBox } from "./Input";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext, useModalContext } from "../hooks/hooks";

type Variants = "modal" | "signup" | "signin" | "changePassword";

interface FormProps {
  variant: Variants;
  onSubmit?: () => void;
  edit?: boolean;
  contentId?: string | undefined;
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

type content = "tweets" | "notion" | "article" | "video" | "other" | "empty";

type contentDataProps = z.infer<typeof contentSchema>;

interface passwordDataProps {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

const backend_url = import.meta.env.VITE_BACKEND_URL;
console.log(import.meta.env.VITE_BACKEND_URL);

export const Form = (props: FormProps) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const navigate = useNavigate();
  const { token, login } = useAuthContext();
  const { setModal, setSetting } = useModalContext();

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
          variant: props.variant,
        } as authDataProps;
        const { backendError, response, backendToken } =
          await signBackendPost(datawithVariant);
        console.log(backendError);
        console.log(response);
        if (backendError) {
          setErrors({ backend: response });
        } else {
          setErrors({});
          setSuccess(true);
          if (backendToken) {
            setAuthToken(backendToken);
          }
        }
      }
    } else if (props.variant == "modal") {
      const contentData: contentDataProps = {
        title: formData.get("title") as string,
        type: formData.get("type") as contentDataProps["type"],
        link: formData.get("link") as string,
        tags: (formData.get("tags") as string)
          .split(",")
          .map((tag) => tag.trim()),
      };
      let data, errors;
      if (props.edit) {
        ({ data, errors } = validateEditForm(contentData));
      } else {
        ({ data, errors } = validateForm(contentSchema, contentData));
      }
      console.log("Form submission data:", contentData);
      console.log("Validation result:", { data, errors });
      console.log(props.contentId);
      if (errors) {
        setErrors(errors);
      } else {
        const datawithVariant = {
          ...data,
          variant: "modal",
          token: token as string,
          ...(props.edit && { edit: props.edit }),
          ...(props.edit && { contentId: props.contentId }),
        } as authDataProps;
        const { backendError, response } =
          await signBackendPost(datawithVariant);
        if (backendError) {
          setErrors({ backend: response });
          console.log(errors);
        } else {
          setErrors({});
          setSuccess(true);
        }
      }
    } else {
      const passwordData: passwordDataProps = {
        password: formData.get("oldPassword") as string,
        newPassword: formData.get("newPassword") as string,
        confirmPassword: formData.get("confirmPassword") as string,
      };

      const { data, errors } = validateForm(passwordSchema, passwordData);
      if (errors) {
        setErrors(errors);
      } else {
        const backendData = {
          old_pwd: data?.password as string,
          new_pwd: data?.confirmPassword as string,
          token: token as string,
        };
        const { response, error } = await changePasswordRequest(backendData);
        if (error) {
          setErrors({ backend: response });
        } else {
          setErrors({});
          setSuccess(true);
        }
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {props.variant === "modal" && (
        <ModalForm
          errors={errors}
          isSuccess={success}
          onSuccess={() => {
            setModal(false);
          }}
        />
      )}
      {(props.variant === "signin" || props.variant === "signup") && (
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
                  if (authToken) {
                    login(authToken);
                  }
                }
          }
        />
      )}

      {props.variant === "changePassword" && (
        <ChangePasswordForm
          errors={errors}
          isSuccess={success}
          onSuccess={() => {
            setSetting(false);
          }}
        />
      )}
    </form>
  );
};

const ModalForm = ({
  errors,
  isSuccess,
  onSuccess,
}: {
  errors: FormErrors;
  isSuccess: boolean;
  onSuccess: () => void;
}) => {
  useEffect(() => {
    if (isSuccess && onSuccess) {
      const timer = setTimeout(() => {
        onSuccess();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, onSuccess]);
  return (
    <div className="flex flex-col gap-6">
      {errors.backend && <ErrorBanner message={errors.backend} />}
      {isSuccess && <SuccessBanner message={"Added Content Successfully"} />}
      <InputWrapper error={errors.title}>
        <InputBox variant="input" name="title" error={!!errors.title} />
      </InputWrapper>

      <InputWrapper error={errors.type}>
        <InputBox variant="options" name="type" error={!!errors.type} />
      </InputWrapper>

      <InputWrapper error={errors.link}>
        <InputBox variant="input" name="link" error={!!errors.link} />
      </InputWrapper>

      <InputWrapper error={errors.tags}>
        <InputBox variant="tags" name="tags" error={!!errors.tags} />
      </InputWrapper>

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

const ChangePasswordForm = ({
  errors,
  isSuccess,
  onSuccess,
}: {
  errors: FormErrors;
  isSuccess: boolean;
  onSuccess: () => void;
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
    <div className="flex flex-col gap-6">
      {errors.backend && <ErrorBanner message={errors.backend} />}
      {isSuccess && <SuccessBanner message={"Changed Password successfully"} />}
      <InputWrapper error={errors.password}>
        <InputBox
          variant="input"
          name="oldPassword"
          pwd={true}
          error={!!errors.password}
        />
      </InputWrapper>

      <InputWrapper error={errors.newPassword}>
        <InputBox
          variant="input"
          name="newPassword"
          pwd={true}
          error={!!errors.newPassword}
        />
      </InputWrapper>

      <InputWrapper error={errors.confirmPassword}>
        <InputBox
          variant="input"
          name="confirmPassword"
          pwd={true}
          error={!!errors.confirmPassword}
        />
      </InputWrapper>

      <Button variant="primary" size="p-sm" text="Submit" />
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

const contentSchema = z.object({
  link: z.string().min(1, "Link is required").url("Please enter a valid URL"),
  type: z.enum(["tweets", "notion", "video", "article", "other"], {
    errorMap: () => ({ message: "Please select a content type" }),
  }),
  title: z
    .string()
    .min(1, "Title is required")
    .max(20, "Maximum limit for title exceeded"),
  tags: z
    .array(z.string().min(1, "Tags can't be empty"))
    .min(1, "At least one tag is required"),
});

const passwordSchema = z
  .object({
    password: z.string().min(8, "Enter correct password"),
    newPassword: z.string().min(8, "Password must be 8 letters long"),
    confirmPassword: z.string().min(8, "Password must be 8 letters long"),
  })
  .refine((data) => data.newPassword == data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const validateForm = <T extends z.ZodTypeAny>(
  schema: T,
  formData: object,
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

const validateEditForm = (
  formData: Partial<contentDataProps>,
): { data?: Partial<contentDataProps>; errors?: FormErrors } => {
  const errors: FormErrors = {};

  const filteredData = Object.entries(formData).reduce((acc, [key, value]) => {
    if (
      value !== "" &&
      value !== null &&
      value !== undefined &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      if (key === "tags" && Array.isArray(value)) {
        acc.tags = value;
      } else if (key === "type" && typeof value === "string") {
        acc.type = value as contentDataProps["type"];
      } else if (
        (key === "title" || key === "link") &&
        typeof value === "string"
      ) {
        acc[key] = value;
      }
    }

    return acc;
  }, {} as Partial<contentDataProps>);

  if (Object.keys(filteredData).length === 0) {
    return {
      errors: {
        input: "no value given",
      },
    };
  }

  const partialSchema = contentSchema.partial();

  const result = partialSchema.safeParse(filteredData);

  if (result.success) {
    return { data: result.data };
  }

  for (const issue of result.error.errors) {
    const field = issue.path[0] as string;
    // Only add error if the field was actually provided (not filtered out)
    if (Object.prototype.hasOwnProperty.call(filteredData, field)) {
      errors[field] = issue.message;
    }
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

type contentData = {
  variant: "modal";
  title: string;
  link: string;
  type: content;
  tags: string[];
  token: string;
  edit?: boolean;
  contentId?: string;
};

type authDataProps = LoginData | SignupData | contentData;
type backendResponse = {
  backendError: boolean;
  response: string;
  backendToken?: string;
};

const signBackendPost = async (
  authData: authDataProps,
): Promise<backendResponse> => {
  if (authData.variant == "modal") {
    try {
      let res;
      if (authData.edit) {
        res = await axios.put(
          backend_url + "content/" + authData.contentId,
          {
            ...(authData.link && { link: authData.link }),
            ...(authData.type && { type: authData.type }),
            ...(authData.title && { title: authData.title }),
            ...(authData.tags && { tags: authData.tags }),
          },
          {
            headers: {
              Authorization: `Bearer ${authData.token}`,
            },
          },
        );
      } else {
        res = await axios.post(
          backend_url + "content",
          {
            link: authData.link,
            type: authData.type,
            title: authData.title,
            tags: authData.tags,
          },
          {
            headers: {
              Authorization: `Bearer ${authData.token}`,
            },
          },
        );
      }
      return {
        backendError: false,
        response: res.data.message,
      };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data.message;
        return { backendError: true, response: data || err.message };
      }
      return { backendError: true, response: "Unknown error" };
    }
  } else {
    try {
      const res = await axios.post(backend_url + authData.variant, {
        email: authData.email,
        ...(authData.variant == "signup" && { username: authData.username }),
        password: authData.password,
      });
      return {
        backendError: false,
        response: res.data.message,
        ...(authData.variant === "signin" && { backendToken: res.data.token }),
      };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data.message;
        return { backendError: true, response: data || err.message };
      }
      return { backendError: true, response: "Unknown error" };
    }
  }
};

type passwordResponse = {
  response: string;
  error: boolean;
};

const changePasswordRequest = async (props: {
  old_pwd: string;
  new_pwd: string;
  token: string;
}): Promise<passwordResponse> => {
  try {
    const res = await axios.post(
      backend_url + "settings/change_password",
      {
        old_pwd: props.old_pwd,
        new_pwd: props.new_pwd,
      },
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      },
    );
    return { response: res.data.message, error: false };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const data = err.response?.data;
      return { response: data.message || err.message, error: true };
    }
    return { response: "Unknown error", error: true };
  }
};
