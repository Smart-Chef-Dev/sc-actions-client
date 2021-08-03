import { memo } from "react";
import PropTypes from "prop-types";

import { Text } from "./text";
import { theme } from "theme";
import { Flex } from "./flex";

import DoneIcon from "assets/icons/actions/done-icon.svg";

const NotificationWithTexts = ({ texts, Icon = DoneIcon }) => {
  return (
    <Flex direction="column">
      <Flex justifyContent="center" width={1} mb={theme.spacing(1)}>
        <Icon />
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
  Icon: PropTypes.elementType,
};

export default memo(NotificationWithTexts);
