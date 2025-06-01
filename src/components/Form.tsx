import { InputBox } from "./Input";
import { Button } from "./Button";
import { Logo } from "../assets/logo";
import type { RefObject } from "react";
import { useState } from "react";
import { z } from "zod";

type Variants = "modal" | "signup" | "signin";

interface FormProps {
  variant: Variants;
  onsubmit?: () => void;
  ref?: RefObject<HTMLDivElement | null>;
}

interface FormErrors {
  [key: string]: string | undefined;
}

const Modalform = ({
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

const SignForm = ({ errors }: { errors: FormErrors }) => {
  return <div></div>;
};

const getFormComponent = (variant: Variants) => {
  switch (variant) {
    case "modal":
      return Modalform;
    case "signin":
    case "signup":
      return SignForm;
    default:
      return SignForm;
  }
};

const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  // Get form values
  const title = formData.get("Title") as string;
  const type = formData.get("Type") as string;
  const link = formData.get("Link") as string;
  const tags = formData.get("Tags") as string;

  // Define schema
  const schemaData = z.object({
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

  try {
    // Validate each field individually to get specific errors
    try {
      schemaData.shape.title.parse(title);
    } catch (err) {
      if (err instanceof z.ZodError) {
        errors.title = err.errors[0]?.message;
      }
    }

    try {
      schemaData.shape.type.parse(type);
    } catch (err) {
      if (err instanceof z.ZodError) {
        errors.type = err.errors[0]?.message;
      }
    }

    try {
      schemaData.shape.link.parse(link);
    } catch (err) {
      if (err instanceof z.ZodError) {
        errors.link = err.errors[0]?.message;
      }
    }

    try {
      schemaData.shape.tags.parse(tags);
    } catch (err) {
      if (err instanceof z.ZodError) {
        errors.tags = err.errors[0]?.message;
      }
    }
  } catch (error) {
    console.error("Validation error:", error);
  }

  return errors;
};

export const Form = (props: FormProps) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const Component = getFormComponent(props.variant);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Validate form and get errors
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    // If no errors, process the form
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form is valid:", Object.fromEntries(formData));

      // Process the tags properly
      const processedData = {
        title: formData.get("Title") as string,
        type: formData.get("Type") as string,
        link: formData.get("Link") as string,
        tags: (formData.get("Tags") as string)
          .split(",")
          .filter((tag) => tag.trim()),
      };

      console.log("Processed data:", processedData);

      // Call the onsubmit callback if provided
      if (props.onsubmit) {
        props.onsubmit();
      }
    } else {
      console.log("Form has errors:", validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Component ref={props.ref} errors={errors} />
    </form>
  );
};
