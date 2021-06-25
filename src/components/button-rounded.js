import { styled } from "@linaria/react";

const ButtonRounded = styled.button`
  background-color: ${(props) =>
    props.disabled ? "var(--main-color-disabled)" : "var(--main-color)"};
  border: ${(props) =>
    props.disabled
      ? "1px solid var(--main-color-disabled)"
      : "1px solid var(--main-color)"};
  color: var(--main-text-color);
  width: 60px;
  height: 60px;
  padding: 6px 20px;
  font-size: 16px;
  border-radius: 50%;
  outline: none;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  user-select: none;
  font-family: sans-serif;
  margin-bottom: 1em;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    outline: none;
  }

  a {
    color: var(--text);
    text-decoration: none;
  }
`;

export default ButtonRounded;
