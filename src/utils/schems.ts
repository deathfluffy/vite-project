import * as Yup from "yup";

export const wordValidationSchema = Yup.object().shape({
  original: Yup.string()
    .matches(/^[а-яіїєґА-ЯІЇЄҐ\s'-]+$/, "Original word must contain only Ukrainian letters.")
    .required("Original word is required."),
  translation: Yup.string()
    .matches(/^[a-zA-Z\s'-]+$/, "Translation must contain only English letters.")
    .required("Translation is required."),
});

export const loginSchema = Yup.object().shape({
  email: Yup
    .string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format.")
    .required("Email is required"),
  password: Yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d ]{7}$/,
      "Invalid password format."
    )
    .required("Password is required"),
});
export const registerSchema = Yup.object().shape({
  name: Yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: Yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{7,}$/,
      "Password must contain letters and numbers, min 7 chars"
    )
    .required("Password is required"),
});