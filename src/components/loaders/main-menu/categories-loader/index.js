import { memo } from "react";

import { Flex } from "components/flex";
import { Divider } from "components/divider";
import { theme } from "theme";
import MenuItemLoaders from "../menu-items-loaders";
import CategoryLoader from "../category-loader";

const CategoriesLoader = ({ quantity }) =>
  Array(quantity)
    .fill("")
    .map((m, i) => (
      <Flex direction="column" key={i} mb={theme.spacing(1)}>
        <Flex mb={theme.spacing(1)}>
          <CategoryLoader />
        </Flex>
        <Flex ml={theme.spacing(1)}>
          <MenuItemLoaders quantity={7} />
        </Flex>
        <Divider />
      </Flex>
    ));

export default memo(CategoriesLoader);
