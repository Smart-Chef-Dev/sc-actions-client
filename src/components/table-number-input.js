import React, { useState, useMemo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import RemoveNumber from "assets/icons/remove-number.svg";
import { splitArray } from "utils/array";
import TableNumberDisplay from "./table-number-display";
import ButtonRounded from "./button-rounded";
import { Flex } from "./flex";
import { styled } from "@linaria/react";

const pinNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const NUMBER_COUNT_IN_ROW = 3;
const PIN_CODE_SIZE = 3;
const INITIAL_CODE = "";

const TableNumberInput = ({
  isLoading,
  isInvalid,
  resetPasswordKey,
  onSubmit,
}) => {
  const [code, setCode] = useState(INITIAL_CODE);

  useEffect(() => {
    setCode(INITIAL_CODE);
  }, [resetPasswordKey]);

  const pinRows = useMemo(() => {
    return splitArray(pinNumbers, NUMBER_COUNT_IN_ROW);
  }, []);

  const isDisabled = isLoading || code.length < PIN_CODE_SIZE;

  const handleNumberClick = useCallback(
    (number) => () => {
      if (code.split("").length < PIN_CODE_SIZE) {
        setCode(code + number);
      }
    },
    [code]
  );

  const handleRemoveButtonClick = useCallback(() => {
    if (code.split("").length !== 0) {
      setCode(code.slice(0, -1));
    }
  }, [code]);

  const handleSubmitButtonClick = useCallback(() => {
    if (code.split("").length === PIN_CODE_SIZE) {
      onSubmit(code);
    }
  }, [code, onSubmit]);

  return (
    <div>
      <Flex justifyContent="center" alignItems="center">
        <TableNumberDisplay
          code={code}
          codeSize={PIN_CODE_SIZE}
          isInvalid={isInvalid}
        />
      </Flex>
      {pinRows.map((row, index) => (
        <Flex key={`row-${index}`} justifyContent="space-around">
          {row.map((n) => (
            <s.Number
              key={`input-number-${n}`}
              flex={1}
              justifyContent="center"
              alignItems="center"
              onClick={handleNumberClick(n)}
            >
              {n}
            </s.Number>
          ))}
        </Flex>
      ))}
      <Flex justifyContent="space-around">
        <s.Number
          flex={1}
          justifyContent="center"
          alignItems="center"
          onClick={handleRemoveButtonClick}
        >
          <RemoveNumber />
        </s.Number>
        <s.Number
          flex={1}
          justifyContent="center"
          alignItems="center"
          className="sc-pin-code-input__number"
          onClick={handleNumberClick(0)}
        >
          0
        </s.Number>
        <Flex
          flex={1}
          justifyContent="center"
          alignItems="center"
          className="sc-pin-code-input__number"
        >
          <s.Number alignItems="center" className="no-select">
            <ButtonRounded
              disabled={isDisabled}
              onClick={handleSubmitButtonClick}
            >
              OK
            </ButtonRounded>
          </s.Number>
        </Flex>
      </Flex>
    </div>
  );
};

const s = {
  Number: styled(Flex)`
    height: 60px;
    user-select: none;
    color: var(--main-text-color);

    svg {
      fill: var(--main-text-color);
    }
  `,
};

TableNumberInput.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isInvalid: PropTypes.bool.isRequired,
  resetPasswordKey: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default React.memo(TableNumberInput);
