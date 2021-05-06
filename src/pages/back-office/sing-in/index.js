import { memo, useCallback, useState } from "react";
import { useFormik } from "formik";
import { useLocation } from "wouter";
import { styled } from "@linaria/react";
import * as Yup from "yup";

import { Flex } from "components/flex";
import InputFormik from "components/input-formik";
import Button from "components/button";
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
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
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
          localStorage.setItem(LocalStorageKeys.JWT_TOKEN, data);
        });
    },
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
              <InputFormik
                id="email"
                type="string"
                label={translations["email"]}
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Flex>
            {formik.touched.email && formik.errors.email ? (
              <Error>{formik.errors.email}</Error>
            ) : null}
          </Flex>

          <Flex mb={theme.spacing(1)} direction="column">
            <Flex direction="column">
              <InputFormik
                id="password"
                type="password"
                label={translations["password"]}
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Flex>
            {formik.touched.password && formik.errors.password ? (
              <Error>{formik.errors.password}</Error>
            ) : null}
          </Flex>
        </Flex>

        <Flex direction="column" alignItems="center">
          <Button type="submit">{translations["sing_in"]}</Button>
          {error && (
            <Error>{translations["incorrect_login_or_password"]}</Error>
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

const Error = styled.p`
  color: var(--error);
  font-size: 12px;
  margin: 0;
`;

export default memo(SingIn);
