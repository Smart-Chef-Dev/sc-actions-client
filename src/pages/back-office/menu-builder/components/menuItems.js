import { Fragment, memo } from "react";
import PropTypes from "prop-types";

import MenuItem from "./menuItem";
import { Flex } from "components/flex";
import { useQuery } from "react-query";
import { getMenuItemsByCategoryId } from "../../../../services/menuItemsService";

const MenuItems = ({ categories, translations, categoryId }) => {
  const { isLoading, data } = useQuery(
    ["menuItems", { categoryId }],
    getMenuItemsByCategoryId
  );

  return (
    !isLoading && (
      <Flex direction="column" boxSizing="border-box" width={1}>
        {data.map((menuItem, i) => (
          <Fragment key={menuItem._id}>
            {(i + 1) % 2 !== 0 ? (
              <Flex background="var(--light-grey)" width={1}>
                <MenuItem
                  menuItem={menuItem}
                  menuItems={data}
                  index={i}
                  categories={categories}
                  translations={translations}
                />
              </Flex>
            ) : (
              <MenuItem
                menuItem={menuItem}
                menuItems={data}
                index={i}
                categories={categories}
                translations={translations}
              />
            )}
          </Fragment>
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
