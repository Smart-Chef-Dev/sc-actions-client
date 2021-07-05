import { memo } from "react";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import Category from "../category";

const Categories = ({ restaurantId, tableId, onLocation, categories }) => {
  return (
    <Flex height={1} width={1}>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            height={height}
            itemCount={categories.data.length}
            itemSize={270}
            width={width}
            itemData={{
              restaurantId,
              tableId,
              categories,
              onLocation,
            }}
          >
            {({ index, style, data }) => (
              <Flex direction="column" style={style}>
                <Category {...data} category={data.categories.data[index]} />
              </Flex>
            )}
          </FixedSizeList>
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
