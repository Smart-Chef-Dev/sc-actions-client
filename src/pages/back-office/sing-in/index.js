import { memo, useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { useLocation } from "wouter";
import { useFormik } from "formik";

import Input from "components/input";
import ErrorText from "components/error-text";
import Button from "components/button";
import { Flex } from "components/flex";
import { Label } from "components/label";

import { Routes } from "constants/routes";

import { theme } from "theme";
import { useTranslation } from "contexts/translation-context";

import UserDataState from "atoms/user";
import { SignInSchema } from "yup-schemes/sign-in-schema";

const initialValues = {
  email: "",
  password: "",
};

const SingIn = () => {
  const [, setLocation] = useLocation();
  const {
    strings: { singIn: translations },
  } = useTranslation();

  const [hasLoginError, setHasLoginError] = useState(false);

  const [, setUserDataAtoms] = useRecoilState(UserDataState);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SignInSchema(translations),
    onSubmit: useCallback(
      async (values) => {
        const response = await fetch("/api/users/sing-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });

        if (response.status === 404) {
          setHasLoginError(true);
          return;
        }

        const jwt = await response.text();

        setUserDataAtoms((oldUserData) => {
          return {
            ...oldUserData,
            jwt: jwt,
          };
        });

        setLocation(Routes.DASHBOARD);
      },
      [setLocation, setUserDataAtoms]
    ),
  });

  const handleChange = useCallback(
    (fieldName) => (e) => {
      formik.setFieldValue(fieldName, e);
    },
    [formik]
  );

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
                name="email"
                type="string"
                label={translations["email"]}
                value={formik.values["email"]}
                onChange={handleChange("email")}
              />
            </Flex>
            {formik.touched.email && formik.errors.email ? (
              <ErrorText>{formik.errors.email}</ErrorText>
            ) : null}
          </Flex>

          <Flex mb={theme.spacing(1)} direction="column">
            <Flex direction="column">
              <Input
                name="password"
                type="password"
                label={translations["password"]}
                value={formik.values["password"]}
                onChange={handleChange("password")}
              />
            </Flex>
            {formik.touched.password && formik.errors.password ? (
              <ErrorText>{formik.errors.password}</ErrorText>
            ) : null}
          </Flex>
        </Flex>

        <Flex direction="column" alignItems="center">
          <Button type="submit">{translations["sing_in"]}</Button>
          {hasLoginError && (
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
