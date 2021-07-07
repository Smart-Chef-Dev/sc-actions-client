import { createRef, memo, useCallback, useState } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import Category from "../category";

const listRef = createRef();

const Categories = ({ restaurantId, tableId, onLocation, categories }) => {
  const [itemsSizes, setItemsSizes] = useState([]);

  const getItemSize = useCallback(
    (index) => {
      const itemSize = itemsSizes.find((itemSize) => itemSize.index === index);
      return itemSize ? itemSize.size : 270;
    },
    [itemsSizes]
  );

  return (
    <Flex height={1} width={1}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            ref={listRef}
            itemCount={categories.data.length}
            itemSize={getItemSize}
            width={width}
          >
            {({ index, style }) => (
              <Flex direction="column" style={style}>
                <Category
                  category={categories.data[index]}
                  listRef={listRef}
                  index={index}
                  onItemsSizes={setItemsSizes}
                  itemsSizes={itemsSizes}
                  restaurantId={restaurantId}
                  tableId={tableId}
                  categories={categories}
                  onLocation={onLocation}
                />
              </Flex>
            )}
          </List>
        )}
      </AutoSizer>
    </Flex>
  );
};

Categories.propTypes = {
  restaurantId: PropTypes.string,
  tableId: PropTypes.string,
  onLocation: PropTypes.func,
  categories: PropTypes.object,
};

export default memo(Categories);
