import { memo } from "react";
import PropTypes from "prop-types";

import { Text } from "./text";
import { theme } from "theme";
import { Flex } from "./flex";

import DoneIcon from "assets/icons/actions/done-icon.svg";
import ForbiddenIcon from "assets/icons/actions/forbidden_icon.svg";

const NotificationWithTexts = ({ texts, iconWithDefault = true }) => {
  return (
    <Flex direction="column">
      <Flex justifyContent="center" width={1} mb={theme.spacing(1)}>
        {iconWithDefault ? <DoneIcon /> : <ForbiddenIcon />}
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

NotificationWithTexts.propTypes = {
  texts: PropTypes.array,
  iconWithDefault: PropTypes.bool,
};

export default memo(NotificationWithTexts);
