import { memo } from "react";
import PropTypes from "prop-types";

import { Text } from "components/text";
import { theme } from "theme";

const MenuItem = ({ menuItem }) => {
  return (
    <Text
      p={theme.spacing(1)}
      pl={theme.spacing(5)}
      width={1}
      boxSizing="border-box"
      fontSize={theme.fontSize(0)}
      color="var(--text-grey)"
    >
      {menuItem.name}
    </Text>
  );
};

MenuItem.propTypes = {
  menuItem: PropTypes.object,
};

export default memo(MenuItem);
