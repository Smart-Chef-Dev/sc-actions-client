import {memo, useState, useCallback} from "react"
import {styled} from "@linaria/react";
import {Link} from 'wouter';

import {Flex} from "components/flex";
import {theme} from "theme";
import Input from "../../../components/input";
import Button from "../../../components/button";
import {Label} from "../../../components/label";

const SingIn = () => {
    const [error, setError] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const click = useCallback(() => {
        fetch('/api/users/singIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then((res) => res.json(res.status !== 200 && setError(true)))
            .then((data) => {
                localStorage.setItem('token', data);
            })
    }, [email, password])

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
                <Button onClick={click}>Send</Button>
                {error && <s.error>Incorrect login or password</s.error>}
            </Flex>

            <Flex direction="column" mt={theme.spacing(1)}>
                <Link href="/back-office/sing-up"><Button>Sing up</Button></Link>
            </Flex>
        </s.Container>
    )
}

const s = {
    Container: styled(Flex)`
      overflow-y: auto;

    `,
    error: styled.p`
      color: #f36c6c;
      font-size: 12px;
      margin: 0;
    `,
}

export default memo(SingIn)