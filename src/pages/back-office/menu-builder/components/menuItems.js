import { Fragment, memo } from "react";
import PropTypes from "prop-types";

import MenuItem from "./menuItem";
import { Flex } from "components/flex";

const MenuItems = ({ menuItems, categories }) => {
  const { isLoading, data } = menuItems;

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
                />
              </Flex>
            ) : (
              <MenuItem
                menuItem={menuItem}
                menuItems={data}
                index={i}
                categories={categories}
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
};

export default memo(MenuItems);
