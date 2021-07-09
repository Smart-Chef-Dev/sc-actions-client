import { memo } from "react";
import ContentLoader from "react-content-loader";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { theme } from "theme";

const MenuItemLoaders = ({ quantity }) =>
  Array(quantity)
    .fill("")
    .map((m, i) => (
      <Flex key={i} mr={theme.spacing(1)}>
        <ContentLoader
          speed={2}
          width={135}
          height={155}
          viewBox="0 0 135 155"
          backgroundColor="var(--loader-background-color)"
          foregroundColor="var(--loader-foreground-color)"
        >
          <rect x="0" y="0" rx="20" ry="20" width="135" height="105" />
          <rect x="5" y="114" rx="0" ry="0" width="97" height="10" />
          <rect x="5" y="133" rx="0" ry="0" width="13" height="10" />
        </ContentLoader>
      </Flex>
    ));

MenuItemLoaders.propTypes = {
  quantity: PropTypes.number,
};

export default memo(MenuItemLoaders);
