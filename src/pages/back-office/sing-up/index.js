import { memo, useState, useCallback } from "react";
import { useLocation } from "wouter";
import { useFormik } from "formik";
import { styled } from "@linaria/react";
import * as Yup from "yup";

import Button from "components/button";
import { Flex } from "components/flex";
import { Label } from "components/label";
import { Routes } from "constants/routes";
import InputFormik from "components/input-formik";

import { theme } from "theme";
import { useTranslation } from "contexts/translation-context";

const SingUp = () => {
  const [, setLocation] = useLocation();
  const {
    strings: { singUp: translations },
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
    repPassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        translations["entered_password_does_not_match"]
      )
      .required(translations["required"]),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
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
  });

  const handleSignInButtonClick = useCallback(() => {
    setLocation(Routes.SING_IN);
  }, [setLocation]);

  return (
    <Flex direction="column" alignItems="center">
      <Flex direction="column" mb={theme.spacing(1)}>
        <Label>{translations["registration"]}</Label>
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

          <Flex mb={theme.spacing(1)} direction="column">
            <Flex direction="column">
              <InputFormik
                id="repPassword"
                type="password"
                label={translations["repeat_password"]}
                value={formik.values.repPassword}
                onChange={formik.handleChange}
              />
            </Flex>
            {formik.touched.repPassword && formik.errors.repPassword ? (
              <Error>{formik.errors.repPassword}</Error>
            ) : null}
          </Flex>
        </Flex>

        <Flex direction="column" alignItems="center">
          <Button type="submit">{translations["creat_accounts"]}</Button>
          {error && <Error>{translations["email_already_taken"]}</Error>}
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

const Error = styled.p`
  color: var(--error);
  font-size: 12px;
  margin: 0;
`;

export default memo(SingUp);
