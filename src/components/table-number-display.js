import { useMemo, memo } from "react";
import PropTypes from "prop-types";
import { Flex } from "./flex";
import { styled } from "@linaria/react";

const TableNumberDisplay = ({ code, codeSize }) => {
  const codeArr = useMemo(() => {
    return (code + "").split("");
  }, [code]);

  const gapArr = useMemo(() => {
    const result = [];

    for (let i = 0; i < codeSize - codeArr.length; i++) {
      result.push(null);
    }

    return result;
  }, [codeArr, codeSize]);

  return (
    <s.Container>
      {codeArr.map((code, index) => (
        <s.Number
          key={`number-${code}-${index}`}
          flex={1}
          justifyContent="center"
          className="sc-pin-code-display__number"
        >
          {code}
        </s.Number>
      ))}
      {gapArr.map((_, index) => (
        <s.Gup
          key={`gup-${index}`}
          flex={1}
          justifyContent="center"
          className="sc-pin-code-display__gup flex flex-1 justify-center"
        >
          -
        </s.Gup>
      ))}
    </s.Container>
  );
};

const s = {
  Container: styled(Flex)`
    width: 180px;
    height: 60px;
    border: 1px solid var(--main-text-color);
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;
  `,
  Number: styled(Flex)`
    font-style: normal;
    font-weight: 300;
    font-size: 22px;
    color: var(--main-text-color);
  `,
  Gup: styled(Flex)`
    font-style: normal;
    font-weight: 300;
    font-size: 22px;
    color: var(--main-color);
  `,
};

TableNumberDisplay.propTypes = {
  code: PropTypes.string.isRequired,
  codeSize: PropTypes.number.isRequired,
};

export default memo(TableNumberDisplay);
