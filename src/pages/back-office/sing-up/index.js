import { memo, useState, useCallback, useMemo } from "react";
import { useLocation } from "wouter";
import { useFormik } from "formik";
import * as Yup from "yup";

import Input from "components/input";
import ErrorText from "components/error-text";
import Button from "components/button";
import { Flex } from "components/flex";
import { Label } from "components/label";

import { Routes } from "constants/routes";

import { theme } from "theme";
import { useTranslation } from "contexts/translation-context";

const SingUp = () => {
  const [, setLocation] = useLocation();
  const {
    strings: { singUp: translations },
  } = useTranslation();

  const [error, setError] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    repeatPassword: "",
  };

  const SignupSchema = Yup.object().shape({
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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: useMemo(() => SignupSchema, [SignupSchema]),
    onSubmit: useCallback(
      (values) => {
        fetch("/api/users/signUp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        }).then((res) => {
          res.status !== 200 ? setError(true) : setLocation(Routes.SING_IN);
          return res.text();
        });
      },
      [setError, setLocation]
    ),
  });

  const handleSignInButtonClick = useCallback(() => {
    setLocation(Routes.SING_IN);
  }, [setLocation]);

  const handleChange = useCallback(
    (fieldName) => (e) => {
      formik.setFieldValue(fieldName, e);
    },
    [formik]
  );

  return (
    <Flex direction="column" alignItems="center">
      <Flex direction="column" mb={theme.spacing(1)}>
        <Label>{translations["registration"]}</Label>
      </Flex>

      <form onSubmit={formik.handleSubmit}>
        <Flex direction="column">
          <Flex mb={theme.spacing(1)} direction="column">
            <Flex direction="column">
              <Input
                id="email"
                type="string"
                label={translations["email"]}
                value={formik.values["email"]}
                onChange={handleChange("email")}
              />
            </Flex>
            {formik.touched.email && formik.errors.email && (
              <ErrorText>{formik.errors.email}</ErrorText>
            )}
          </Flex>

          <Flex mb={theme.spacing(1)} direction="column">
            <Flex direction="column">
              <Input
                id="password"
                type="password"
                label={translations["password"]}
                value={formik.values["password"]}
                onChange={handleChange("password")}
              />
            </Flex>
            {formik.touched.password && formik.errors.password && (
              <ErrorText>{formik.errors.password}</ErrorText>
            )}
          </Flex>

          <Flex mb={theme.spacing(1)} direction="column">
            <Flex direction="column">
              <Input
                id="repeatPassword"
                type="password"
                label={translations["repeat_password"]}
                value={formik.values["repeatPassword"]}
                onChange={handleChange("repeatPassword")}
              />
            </Flex>
            {formik.touched.repeatPassword && formik.errors.repeatPassword && (
              <ErrorText>{formik.errors.repeatPassword}</ErrorText>
            )}
          </Flex>
        </Flex>

        <Flex direction="column" alignItems="center">
          <Button type="submit">{translations["creat_accounts"]}</Button>
          {error && (
            <ErrorText>{translations["email_already_taken"]}</ErrorText>
          )}
        </Flex>
      </form>

      <Flex direction="column" mt={theme.spacing(1)}>
        <Button onClick={handleSignInButtonClick}>
          {translations["sing_in"]}
        </Button>
      </Flex>
    </Flex>
  );
};

export default memo(SingUp);
