import { memo } from "react";
import PropTypes from "prop-types";

import { Text } from "./text";
import { theme } from "theme";
import { Flex } from "./flex";

import DoneIcon from "assets/icons/actions/done-icon.svg";
import ProhibitedIcon from "assets/icons/actions/prohibited_icon.svg";

const notificationWithTexts = ({ texts, isDone = true }) => {
  return (
    <Flex direction="column">
      <Flex justifyContent="center" width={1} mb={theme.spacing(1)}>
        {isDone ? <DoneIcon /> : <ProhibitedIcon />}
      </Flex>
      <Flex direction="column" alignItems="center">
        {texts.map((currentValue, index) => (
          <Text
            key={index}
            color="#fff"
            justify-content="center"
            textAlign="center"
            mb={theme.spacing(1)}
          >
            {currentValue}
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};

notificationWithTexts.propTypes = {
  texts: PropTypes.array,
  isDone: PropTypes.bool,
};

export default memo(notificationWithTexts);
