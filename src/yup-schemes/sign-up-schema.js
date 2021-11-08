import * as Yup from "yup";

export const SignUpSchema = (translations) => {
  return Yup.object().shape({
    password: Yup.string()
      .min(8, translations["min_password"])
      .max(25, translations["max_password"])
      .required(translations["required"]),
    email: Yup.string()
      .email(translations["validation_email"])
      .required(translations["required"]),
    repeatPassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        translations["entered_password_does_not_match"]
      )
      .required(translations["required"]),
  });
};
