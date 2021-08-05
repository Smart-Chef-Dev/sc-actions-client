import { Fragment, memo, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

import { Flex } from "components/flex";
import Category from "./category";
import { Divider } from "components/divider";

const Categories = ({ categories }) => {
  const [expandedCategoryId, setExpandedCategoryId] = useState("");
  const { data, isLoading } = categories;

  return (
    !isLoading && (
      <CategoriesContainer width={1} direction="column">
        {data.map((category, i) => (
          <Fragment key={category._id}>
            <Category
              category={category}
              onExpandedCategoryId={setExpandedCategoryId}
              expandedCategoryId={expandedCategoryId}
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
  categories: PropTypes.object,
};

export default memo(Categories);
