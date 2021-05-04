import { memo, useState, useCallback } from "react";
import { styled } from "@linaria/react";
import { useLocation } from "wouter";

import { theme } from "theme";
import Input from "components/input";
import Button from "components/button";
import { Flex } from "components/flex";
import { Label } from "components/label";
import { Routes } from "constants/routes";
import { COLORS } from "constants/colors";

const SingUp = () => {
  const [, setLocation] = useLocation();

  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPassword, setChecktPassword] = useState(false);
  const [checkRepPassword, setCheckRepPassword] = useState(false);

  const handleClick = useCallback(() => {
    const emailRe = /.@.../;

    if (emailRe.test(email) && email.length < 4) {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }

    if (password.length <= 8) {
      setChecktPassword(true);
    } else {
      setChecktPassword(false);
    }

    if (password !== repPassword) {
      setCheckRepPassword(true);
    } else {
      setCheckRepPassword(false);
    }

    if (
      emailRe.test(email) &&
      password.length >= 8 &&
      password === repPassword
    ) {
      fetch("/api/users/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then((res) => {
        res.status !== 200 ? setError(true) : setLocation(Routes.SING_IN);
        return res.text();
      });
    }
  }, [password, email, repPassword, setLocation]);

  const transition = useCallback(() => {
    setLocation(Routes.SING_IN);
  }, [setLocation]);

  return (
    <s.Container direction="column" alignItems="center">
      <Flex direction="column" mb={theme.spacing(1)}>
        <Label>Registration</Label>
      </Flex>

      <Flex direction="column">
        <Flex mb={theme.spacing(1)} direction="column">
          <Flex direction="column">
            <Input
              type="string"
              label="Email:"
              name="email"
              value={email}
              onChange={setEmail}
            />
          </Flex>
          {checkEmail && <s.error>Please enter a valid email</s.error>}
        </Flex>

        <Flex mb={theme.spacing(1)} direction="column">
          <Flex direction="column">
            <Input
              type="password"
              label="Password:"
              name="password"
              value={password}
              onChange={setPassword}
            />
          </Flex>
          {checkPassword && <s.error>Password is small (min 8)</s.error>}
        </Flex>

        <Flex mb={theme.spacing(1)} direction="column">
          <Flex direction="column">
            <Input
              type="password"
              label="Repeat password:"
              name="password"
              value={repPassword}
              onChange={setRepPassword}
            />
          </Flex>
          {checkRepPassword && (
            <s.error>The entered password does not match</s.error>
          )}
        </Flex>
      </Flex>
      <Flex direction="column" alignItems="center">
        <Button onClick={handleClick}>Creat acconts</Button>
        {error && <s.error>Email already taken</s.error>}
      </Flex>

      <Flex direction="column" mt={theme.spacing(1)}>
        <Button onClick={transition}>Sing in</Button>
      </Flex>
    </s.Container>
  );
};

const s = {
  Container: styled(Flex)``,
  error: styled.p`
    color: ${COLORS.ERROR};
    font-size: 12px;
    margin: 0;
  `,
};

export default memo(SingUp);
