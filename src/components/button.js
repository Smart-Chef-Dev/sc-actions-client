import { styled } from "@linaria/react";

const Button = styled.button`
  background-color: ${(props) =>
    props.disabled ? "var(--main-color-disabled)" : "var(--main-color)"};
  border: ${(props) =>
    props.disabled
      ? "1px solid var(--main-color-disabled)"
      : "1px solid var(--main-color)"};
  color: var(--text);
  width: 200px;
  height: 40px;
  padding: 6px 20px;
  font-size: 16px;
  border-radius: 40px;
  outline: none;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  user-select: none;
  font-family: sans-serif;
  margin-bottom: 1em;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    outline: none;
  }

  a {
    color: var(--text);
    text-decoration: none;
  }
`;

export default Button;
