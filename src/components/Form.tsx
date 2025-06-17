import { InputBox } from "./Input";
import { Button } from "./Button";
import { Logo } from "../assets/logo";
import type { RefObject } from "react";
import { useState } from "react";
import { z } from "zod";

type Variants = "modal" | "signup" | "signin";

interface FormProps {
  variant: Variants;
  onSubmit?: () => void;
  ref?: RefObject<HTMLDivElement | null>;
}

interface FormErrors {
  [key: string]: string | undefined;
}

// Modal form for creating content
const ModalForm = ({
  ref,
  errors,
}: {
  ref: RefObject<HTMLDivElement | null> | undefined;
  errors: FormErrors;
}) => {
  return (
    <div
      ref={ref}
      className="bg-back-dark w-[400px] flex flex-col text-white p-6 gap-6 rounded-xl"
    >
      <Logo size="md" />

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

// Sign in/up form for authentication
const SignForm = ({
  errors,
  variant,
}: {
  errors: FormErrors;
  variant: "signin" | "signup";
}) => {
  return (
    <div className="bg-back-dark w-[400px] flex flex-col text-white p-6 gap-6 rounded-xl">
      <div className="mb-4">
        <InputBox variant="input" name="Email" error={!!errors.email} />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div className="mb-4">
        <InputBox
          variant="input"
          name="Password"
          pwd={true}
          error={!!errors.password}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {variant === "signup" && (
        <div className="mb-4">
          <InputBox
            variant="input"
            name="ConfirmPassword"
            pwd={true}
            error={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      )}

      <Button
        variant="primary"
        size="p-sm"
        text={variant === "signin" ? "Sign In" : "Sign Up"}
      />
    </div>
  );
};

// Validation for modal form
const validateModalForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  const title = formData.get("Title") as string;
  const type = formData.get("Type") as string;
  const link = formData.get("Link") as string;
  const tags = formData.get("Tags") as string;

  const modalSchema = z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(20, "Title must be 20 characters or less"),
    type: z.enum(["tweets", "notion", "video", "documents", "article"], {
      errorMap: () => ({ message: "Please select a valid type" }),
    }),
    link: z.string().min(1, "Link is required").url("Please enter a valid URL"),
    tags: z.string().min(1, "At least one tag is required"),
  });

  // Validate each field individually
  const fields = [
    { key: "title", value: title, schema: modalSchema.shape.title },
    { key: "type", value: type, schema: modalSchema.shape.type },
    { key: "link", value: link, schema: modalSchema.shape.link },
    { key: "tags", value: tags, schema: modalSchema.shape.tags },
  ];

  fields.forEach(({ key, value, schema }) => {
    try {
      schema.parse(value);
    } catch (err) {
      if (err instanceof z.ZodError) {
        errors[key] = err.errors[0]?.message;
      }
    }
  });

  return errors;
};

// Validation for sign in/up form
const validateSignForm = (
  formData: FormData,
  variant: "signin" | "signup",
): FormErrors => {
  const errors: FormErrors = {};

  const email = formData.get("Email") as string;
  const password = formData.get("Password") as string;
  const confirmPassword = formData.get("ConfirmPassword") as string;

  const signSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    ...(variant === "signup" && {
      confirmPassword: z.string().min(1, "Please confirm your password"),
    }),
  });

  // Validate email
  try {
    signSchema.shape.email.parse(email);
  } catch (err) {
    if (err instanceof z.ZodError) {
      errors.email = err.errors[0]?.message;
    }
  }

  // Validate password
  try {
    signSchema.shape.password.parse(password);
  } catch (err) {
    if (err instanceof z.ZodError) {
      errors.password = err.errors[0]?.message;
    }
  }

  // For signup, validate confirm password
  if (variant === "signup") {
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }
  }

  return errors;
};

export const Form = (props: FormProps) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Validate based on form variant
    let validationErrors: FormErrors = {};

    if (props.variant === "modal") {
      validationErrors = validateModalForm(formData);
    } else {
      validationErrors = validateSignForm(formData, props.variant);
    }

    setErrors(validationErrors);

    // If no errors, process the form
    if (Object.keys(validationErrors).length === 0) {
      if (props.variant === "modal") {
        // Process modal form data
        const processedData = {
          title: formData.get("Title") as string,
          type: formData.get("Type") as string,
          link: formData.get("Link") as string,
          tags: (formData.get("Tags") as string)
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
        };
        console.log("Modal form data:", processedData);
      } else {
        // Process sign in/up form data
        const authData = {
          email: formData.get("Email") as string,
          password: formData.get("Password") as string,
          ...(props.variant === "signup" && {
            confirmPassword: formData.get("ConfirmPassword") as string,
          }),
        };
        console.log(`${props.variant} form data:`, authData);
      }

      // Call the onSubmit callback if provided
      if (props.onSubmit) {
        props.onSubmit();
      }
    } else {
      console.log("Form has errors:", validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {props.variant === "modal" ? (
        <ModalForm ref={props.ref} errors={errors} />
      ) : (
        <SignForm errors={errors} variant={props.variant} />
      )}
    </form>
  );
};
