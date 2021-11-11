import { memo } from "react";
import ContentLoader from "react-content-loader";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Divider } from "components/divider";
import { theme } from "theme";

const CategoriesLoader = ({ quantity }) => (
  <Flex direction="column" height={1} width={1}>
    <Flex
      height={1}
      width={1}
      direction="column"
      ml={theme.spacing(1)}
      flex={1}
    >
      <Flex my={theme.spacing(1)}>
        <ContentLoader
          speed={2}
          width={120}
          height={28}
          viewBox="0 0 120 28"
          backgroundColor="var(--loader-background-color)"
          foregroundColor="var(--loader-foreground-color)"
        >
          <rect x="0" y="0" rx="0" ry="0" width="120" height="28" />
        </ContentLoader>
      </Flex>
      <Divider />
    </Flex>
    <Flex height={1} width={1} pl={theme.spacing(1)} boxSizing="border-box">
      <Flex overflowX="auto">
        {Array(quantity)
          .fill("")
          .map((m, i) => (
            <Flex key={i} p={theme.spacing(1)}>
              <ContentLoader
                speed={2}
                width={80}
                height={15}
                viewBox="0 0 80 15"
                backgroundColor="var(--loader-background-color)"
                foregroundColor="var(--loader-foreground-color)"
              >
                <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
                <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
                <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
                <rect x="0" y="0" rx="0" ry="0" width="80" height="15" />
              </ContentLoader>
            </Flex>
          ))}
      </Flex>
    </Flex>
  </Flex>
);

CategoriesLoader.propTypes = {
  quantity: PropTypes.number,
};

export default memo(CategoriesLoader);
