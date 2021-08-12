import { memo } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

import { Text } from "./text";

const Textarea = ({ name, label, error, placeholder, id }) => {
  return (
    <>
      {label && <s.Label htmlFor={name}>{label}</s.Label>}
      <s.StyledTextarea
        component="textarea"
        name={name}
        placeholder={placeholder}
        id={id}
        error={error}
      />
    </>
  );
};

const s = {
  StyledTextarea: styled.input`
    width: 100%;
    height: 100%;
    display: block;
    box-sizing: border-box;
    border: ${(props) =>
      props.error ? "1px solid var(--error)" : "1px solid #ddd"};
    background: var(--main-bg-color);
    outline: none;
    font: inherit;
    padding: 1rem;
    border-radius: 3px;
    font-size: 13px;
    color: var(--label-color);
    resize: none;

    ::placeholder {
      color: var(--text-grey);
      font-size: 13px;
    }

    :focus {
      border: ${(props) =>
        props.error
          ? "1px solid var(--error)"
          : "1px solid var(--label-color)"};
    }
  `,

  Label: styled(Text)`
    color: var(--main-text-color);
    font-size: 10px;
    padding-bottom: 7px;
    padding-right: 7px;
  `,
};

Textarea.propTypes = {
  onToggleHidden: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
};

export default memo(Textarea);
