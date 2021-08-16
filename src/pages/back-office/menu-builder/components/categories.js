import { Fragment, memo, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";
import { useQuery } from "react-query";

import { Flex } from "components/flex";
import Category from "./category";
import { Divider } from "components/divider";
import { getAllCategories } from "services/categoriesService";

const Categories = ({ restaurantId, translations }) => {
  const [expandedCategoryId, setExpandedCategoryId] = useState("");
  const { data, isLoading } = useQuery(
    ["categories", { restaurantId }],
    getAllCategories
  );

  return (
    !isLoading && (
      <CategoriesContainer width={1} direction="column" overflowY="hidden">
        {data.map((category, i) => (
          <Fragment key={category._id}>
            <Category
              category={category}
              restaurantId={restaurantId}
              onExpandedCategoryId={setExpandedCategoryId}
              expandedCategoryId={expandedCategoryId}
              translations={translations}
              index={i}
            />
            {i !== data.length - 1 && <Divider />}
          </Fragment>
        ))}
      </CategoriesContainer>
    )
  );
};

const CategoriesContainer = styled(Flex)`
  background: var(--main-bg-color);
  border-radius: 6px;
`;

Categories.propTypes = {
  restaurantId: PropTypes.string,
  translations: PropTypes.object,
};

export default memo(Categories);
