import { styled } from "@linaria/react";
import { Field } from "formik";

export const StyledInput = styled(Field)`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: ${(props) => props.height ?? "48px"};
  border: ${(props) =>
    props.error ? "1px solid var(--error)" : "1px solid #ddd"};
  background: ${(props) =>
    props.disabled
      ? "var(--grey-color-for-selected-object)"
      : "var(--main-bg-color)"};
  outline: none;
  font: inherit;
  padding: 1rem;
  border-radius: 3px;
  font-size: 13px;
  color: var(--label-color);

  ::placeholder {
    color: var(--text-grey);
    font-size: 13px;
  }

  :focus {
    border: ${(props) =>
      props.error ? "1px solid var(--error)" : "1px solid var(--label-color)"};
  }
`;
