import { memo } from "react";
import { styled } from "@linaria/react";
import ContentLoader from "react-content-loader";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { theme } from "theme";

const MenuItemLoaders = ({ quantity }) =>
  Array(quantity)
    .fill("")
    .map((m, i) => (
      <Container key={i} width={1} direction="column" mb={theme.spacing(1)}>
        <ContentLoader
          speed={2}
          backgroundColor="var(--loader-background-color)"
          foregroundColor="var(--loader-foreground-color)"
          style={{ width: "100%" }}
        >
          <rect x="0" y="0" rx="16" ry="16" width="100%" height="13" />
          <rect x="0" y="7" rx="0" ry="0" width="100%" height="100%" />
        </ContentLoader>
        <Flex
          p={theme.spacing(1)}
          direction="column"
          width={1}
          boxSizing="border-box"
        >
          <ContentLoader
            speed={2}
            width={80}
            height={45}
            viewBox="0 0 80 45"
            backgroundColor="var(--loader-background-color)"
            foregroundColor="var(--loader-foreground-color)"
          >
            <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
            <rect x="0" y="0" rx="0" ry="0" width="49" height="15" />
            <rect x="0" y="30" rx="0" ry="0" width="80" height="15" />
          </ContentLoader>
          <Flex justifyContent="space-between" width={1} mt={theme.spacing(1)}>
            <ContentLoader
              speed={2}
              width={30}
              height={15}
              viewBox="0 0 30 15"
              backgroundColor="var(--loader-background-color)"
              foregroundColor="var(--loader-foreground-color)"
            >
              <rect x="0" y="0" rx="0" ry="0" width="30" height="15" />
            </ContentLoader>
            <ContentLoader
              speed={2}
              width={20}
              height={15}
              viewBox="0 0 20 15"
              backgroundColor="var(--loader-background-color)"
              foregroundColor="var(--loader-foreground-color)"
            >
              <rect x="0" y="0" rx="0" ry="0" width="20" height="15" />
            </ContentLoader>
          </Flex>
        </Flex>
      </Container>
    ));

const Container = styled(Flex)`
  box-shadow: 0 5px 15px var(--box-shadow);
  border-radius: 16px;
`;

MenuItemLoaders.propTypes = {
  quantity: PropTypes.number,
};

export default memo(MenuItemLoaders);
