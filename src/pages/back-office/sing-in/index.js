import { memo, useState, useCallback } from "react";
import { styled } from "@linaria/react";
import { useLocation } from "wouter";

import { theme } from "theme";
import { Flex } from "components/flex";
import Input from "components/input";
import Button from "components/button";
import { Label } from "components/label";
import { Routes } from "constants/routes";
import { LocalStorageKeys } from "constants/local-storage-keys";
import { COLORS } from "constants/colors";

const SingIn = () => {
  const [, setLocation] = useLocation();

  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = useCallback(() => {
    fetch("/api/users/singIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        res.status !== 200 && setError(true);
        return res.json();
      })
      .then((data) => {
        localStorage.setItem(LocalStorageKeys.TOKEN, data);
      });
  }, [email, password]);

  const transition = useCallback(() => {
    setLocation(Routes.SING_UP);
  }, [setLocation]);

  return (
    <s.Container direction="column" alignItems="center">
      <Flex direction="column" mb={theme.spacing(1)}>
        <Label>Sing in</Label>
      </Flex>

      <Flex direction="column">
        <Flex mb={theme.spacing(1)} direction="column">
          <Input
            type="string"
            label="Email:"
            name="email"
            value={email}
            onChange={setEmail}
          />
        </Flex>

        <Flex mb={theme.spacing(1)} direction="column">
          <Input
            type="password"
            label="Password:"
            name="password"
            value={password}
            onChange={setPassword}
          />
        </Flex>
      </Flex>
      <Flex direction="column" alignItems="center">
        <Button onClick={handleClick}>Send</Button>
        {error && <s.error>Incorrect login or password</s.error>}
      </Flex>

      <Flex direction="column" mt={theme.spacing(1)}>
        <Button onClick={transition}>Sing up</Button>
      </Flex>
    </s.Container>
  );
};

const s = {
  Container: styled(Flex)`
    overflow-y: auto;
  `,
  error: styled.p`
    color: ${COLORS.ERROR};
    font-size: 12px;
    margin: 0;
  `,
};

export default memo(SingIn);
