import { Fragment, memo } from "react";
import PropTypes from "prop-types";
import { useQuery } from "react-query";

import MenuItem from "./menuItem";
import { Flex } from "components/flex";
import { getMenuItemsByCategoryId } from "services/menuItemsService";

const MenuItems = ({ categoryId }) => {
  const menuItems = useQuery(
    ["menuItems", { categoryId }],
    getMenuItemsByCategoryId
  );

  return (
    !menuItems.isLoading && (
      <Flex direction="column" boxSizing="border-box" width={1}>
        {menuItems.data.map((menuItem, i) => (
          <Fragment key={menuItem._id}>
            {(i + 1) % 2 !== 0 ? (
              <Flex background="var(--light-grey)" width={1}>
                <MenuItem menuItem={menuItem} />
              </Flex>
            ) : (
              <MenuItem menuItem={menuItem} />
            )}
          </Fragment>
        ))}
      </Flex>
    )
  );
};

MenuItems.propTypes = {
  categoryId: PropTypes.string,
};

export default memo(MenuItems);
