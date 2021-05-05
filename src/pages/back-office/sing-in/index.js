import { memo, useCallback, useState } from "react";
import { styled } from "@linaria/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation } from "wouter";

import { theme } from "theme";
import { Flex } from "components/flex";
import InputFormik from "components/input-formik";
import Button from "components/button";
import { Label } from "components/label";
import { Routes } from "constants/routes";
import { LocalStorageKeys } from "constants/local-storage-keys";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .max(25, "Must be 25 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
});

const SingIn = () => {
  const [, setLocation] = useLocation();

  const [error, setError] = useState(false);

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
        <Label>Sing in</Label>
      </Flex>

      <form onSubmit={formik.handleSubmit}>
        <Flex direction="column">
          <Flex mb={theme.spacing(1)} direction="column">
            <Flex direction="column">
              <InputFormik
                id="email"
                type="string"
                label="Email:"
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
                label="Password:"
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
          <Button type="submit">Sing in</Button>
          {error && <Error>Incorrect login or password</Error>}
        </Flex>
      </form>

      <Flex direction="column" mt={theme.spacing(1)}>
        <Button onClick={handleSignInButtonClick}>Sing up</Button>
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
