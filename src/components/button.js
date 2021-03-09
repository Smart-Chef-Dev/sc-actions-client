import { styled } from "@linaria/react";

const Button = styled.button`
  background-color: var(--main-color);
  border: 1px solid var(--main-color);
  color: var(--white);
  width: 200px;
  height: 40px;
  padding: 6px 20px;
  font-size: 16px;
  border-radius: 40px;
  outline: none;
  cursor: pointer;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  user-select: none;
  font-family: sans-serif;
  margin-bottom: 1em;

  &:hover {
    outline: none;
  }
`;

export default Button;