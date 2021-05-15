import { memo, useCallback, useState, useMemo } from "react";
import { useFormik } from "formik";
import { useLocation } from "wouter";
import * as Yup from "yup";

import Input from "components/input";
import ErrorText from "components/error-text";
import Button from "components/button";
import { Flex } from "components/flex";
import { Label } from "components/label";

import { Routes } from "constants/routes";
import { LocalStorageKeys } from "constants/local-storage-keys";

import { theme } from "theme";
import { useTranslation } from "contexts/translation-context";

const SingIn = () => {
  const [, setLocation] = useLocation();
  const {
    strings: { singIn: translations },
  } = useTranslation();

  const [error, setError] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, translations["min_password"])
      .max(25, translations["max_password"])
      .required(translations["required"]),
    email: Yup.string()
      .email(translations["validation_email"])
      .required(translations["required"]),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: useMemo(() => SignupSchema, [SignupSchema]),
    onSubmit: useCallback(
      (values) => {
        fetch("/api/users/singIn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        })
          .then((res) => {
            res.status !== 200 && setError(true);
            return res.json();
          })
          .then((data) => {
            if (!data.statusCode) {
              localStorage.setItem(LocalStorageKeys.JWT_TOKEN, data);
              setLocation(Routes.DASHBOARD);
            }
          });
      },
      [setError, setLocation]
    ),
  });

  const handleSignInButtonClick = useCallback(() => {
    setLocation(Routes.SING_UP);
  }, [setLocation]);

  return (
    <Flex direction="column" alignItems="center">
      <Flex direction="column" mb={theme.spacing(1)}>
        <Label>{translations["sing_in"]}</Label>
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
                onChange={useCallback((e) => formik.setFieldValue("email", e), [
                  formik,
                ])}
              />
            </Flex>
            {formik.touched.email && formik.errors.email ? (
              <ErrorText>{formik.errors.email}</ErrorText>
            ) : null}
          </Flex>

          <Flex mb={theme.spacing(1)} direction="column">
            <Flex direction="column">
              <Input
                id="password"
                type="password"
                label={translations["password"]}
                value={formik.values["password"]}
                onChange={useCallback(
                  (e) => formik.setFieldValue("password", e),
                  [formik]
                )}
              />
            </Flex>
            {formik.touched.password && formik.errors.password ? (
              <ErrorText>{formik.errors.password}</ErrorText>
            ) : null}
          </Flex>
        </Flex>

        <Flex direction="column" alignItems="center">
          <Button type="submit">{translations["sing_in"]}</Button>
          {error && (
            <ErrorText>{translations["incorrect_login_or_password"]}</ErrorText>
          )}
        </Flex>
      </form>

      <Flex direction="column" mt={theme.spacing(1)}>
        <Button onClick={handleSignInButtonClick}>
          {translations["sing_up"]}
        </Button>
      </Flex>
    </Flex>
  );
};

export default memo(SingIn);
