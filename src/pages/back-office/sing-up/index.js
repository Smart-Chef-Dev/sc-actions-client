import { memo, useState, useCallback } from "react";
import { styled } from "@linaria/react";
import { useFormik } from "formik";
import { useLocation } from "wouter";
import * as Yup from "yup";

import { theme } from "theme";
import Button from "components/button";
import { Flex } from "components/flex";
import { Label } from "components/label";
import { Routes } from "constants/routes";
import InputFormik from "components/input-formik";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .max(25, "Must be 25 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  repPassword: Yup.string()
    .oneOf([Yup.ref("password")], "The entered password does not match")
    .required("Required"),
});

const SingUp = () => {
  const [, setLocation] = useLocation();

  const [error, setError] = useState(false);

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
        <Label>Registration</Label>
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

          <Flex mb={theme.spacing(1)} direction="column">
            <Flex direction="column">
              <InputFormik
                id="repPassword"
                type="password"
                label="Repeat password::"
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
          <Button type="submit">Creat accounts</Button>
          {error && <Error>Email already taken</Error>}
        </Flex>
      </form>

      <Flex direction="column" mt={theme.spacing(1)}>
        <Button onClick={handleSignInButtonClick}>Sing in</Button>
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
