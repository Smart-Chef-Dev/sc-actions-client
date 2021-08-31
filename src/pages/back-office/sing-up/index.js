import { memo, useState, useCallback } from "react";
import { useMutation } from "react-query";
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
import { SignUpSchema } from "yup-schemes/sign-up-schema";
import { signUpAccount } from "services/userService";

const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
};

const SingUp = () => {
  const [, setLocation] = useLocation();
  const {
    strings: { singUp: translations },
  } = useTranslation();
  const [isEmailExists, setIsEmailExists] = useState(false);
  const signUpAccountMutation = useMutation(signUpAccount);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SignUpSchema(translations),
    onSubmit: useCallback(
      async (values) => {
        try {
          await signUpAccountMutation.mutateAsync({
            body: {
              email: values.email,
              password: values.password,
            },
          });

          setLocation(Routes.SING_IN);
        } catch {
          setIsEmailExists(true);
        }
      },
      [setIsEmailExists, setLocation, signUpAccountMutation]
    ),
  });

  const handleSignInButtonClick = useCallback(
    () => setLocation(Routes.SING_IN),
    [setLocation]
  );

  const handleChange = useCallback(
    (fieldName) => (e) => formik.setFieldValue(fieldName, e),
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
                name="email"
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
                name="password"
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
                name="repeatPassword"
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
          {isEmailExists && (
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
