import { memo } from "react";
import PropTypes from "prop-types";
import { useQuery } from "react-query";

import MenuItem from "./menuItem";
import { Flex } from "components/flex";
import { getMenuItemsByCategoryId } from "services/menuItemsService";

const MenuItems = ({ categories, translations, categoryId }) => {
  const { isLoading, data } = useQuery(
    ["menuItems", { categoryId }],
    getMenuItemsByCategoryId
  );

  return (
    !isLoading && (
      <Flex direction="column" boxSizing="border-box" width={1}>
        {data.map((menuItem, i) => (
          <Flex
            key={menuItem._id}
            background={(i + 1) % 2 !== 0 ? "var(--light-grey)" : ""}
            width={1}
          >
            <MenuItem
              menuItem={menuItem}
              menuItems={data}
              index={i}
              categories={categories}
              translations={translations}
            />
          </Flex>
        ))}
      </Flex>
    )
  );
};

MenuItems.propTypes = {
  menuItems: PropTypes.object,
  categories: PropTypes.array,
  translations: PropTypes.object,
  categoryId: PropTypes.string,
};

export default memo(MenuItems);
