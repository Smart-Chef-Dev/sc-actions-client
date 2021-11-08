import { memo, useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { useLocation } from "wouter";
import { useFormik } from "formik";
import { useMutation } from "react-query";

import Input from "components/input";
import ErrorText from "components/error-text";
import Button from "components/button";
import { Flex } from "components/flex";
import { Label } from "components/label";

import { Routes } from "constants/routes";
import { theme } from "theme";
import { useTranslation } from "contexts/translation-context";
import UserDataState from "atoms/user";
import { signInAccount } from "services/userService";
import LanguageSelection from "components/language-selection";
import { SignInSchema } from "yup-schemes/sign-in-schema";
import {signInAccount} from "services/userService";

const initialValues = {
  email: "",
  password: "",
};

const SingIn = () => {
  const [hasLoginError, setHasLoginError] = useState(false);
  const [, setUserDataAtoms] = useRecoilState(UserDataState);
  const signInAccountMutation = useMutation(signInAccount);
  const [, setLocation] = useLocation();
  const {
    strings: { singIn: translations },
  } = useTranslation();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SignInSchema(translations),
    onSubmit: useCallback(
      async (values) => {
        try {
          const jwt = await signInAccountMutation.mutateAsync({
            body: {
              email: values.email,
              password: values.password,
            },
          });

          setUserDataAtoms((oldUserData) => {
            return {
              ...oldUserData,
              jwt: jwt,
            };
          });

          setLocation(Routes.DASHBOARD);
        } catch {
          setHasLoginError(true);
        }
      },
      [setLocation, setUserDataAtoms, signInAccountMutation]
    ),
  });

  const handleChange = useCallback(
    (fieldName) => (e) => formik.setFieldValue(fieldName, e),
    [formik]
  );

  const handleSignInButtonClick = useCallback(
    () => setLocation(Routes.SING_UP),
    [setLocation]
  );

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

      <LanguageSelection text={translations["change_language_to"]} />
    </Flex>
  );
};

export default memo(SingIn);
