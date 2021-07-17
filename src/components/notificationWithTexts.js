import { memo } from "react";
import PropTypes from "prop-types";

import { Text } from "./text";
import { theme } from "theme";
import { Flex } from "./flex";

import DoneIcon from "assets/icons/actions/done-icon.svg";

const notificationWithTexts = ({ texts }) => {
  return (
    <Flex direction="column">
      <Flex justifyContent="center" width={1} mb={theme.spacing(1)}>
        <DoneIcon />
      </Flex>
      <Flex direction="column" alignItems="center">
        {texts.map((currentValue, index) => (
          <Text
            key={index}
            color="#fff"
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
};

export default memo(notificationWithTexts);
