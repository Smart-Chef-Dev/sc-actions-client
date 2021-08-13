import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { useConfirmationPopup } from "hooks/useConfirmationPopup";
import AddCategoryPopup from "./popup-windows/category/add-category-popup";
import Button from "components/button";

const CreateCategoryButton = ({ restaurantId, translations }) => {
  const { renderNotification, showNotification } = useConfirmationPopup(
    AddCategoryPopup,
    "500px",
    "380px",
    { restaurantId, translations }
  );

  const createCategory = useCallback(() => {
    showNotification();
  }, [showNotification]);

  return (
    <>
      {renderNotification()}
      <Button onClick={createCategory} width="auto">
        {translations["create_category_bold"]}
      </Button>
    </>
  );
};

CreateCategoryButton.propTypes = {
  restaurantId: PropTypes.string,
  translations: PropTypes.object,
};

export default memo(CreateCategoryButton);
