import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { useConfirmationPopup } from "hooks/useConfirmationPopup";
import Button from "components/button";
import ConstructCategoryPopup from "./popup-windows/category/construct-category-popup";

const CreateCategoryButton = ({ restaurantId, translations }) => {
  const { renderNotification, showNotification } = useConfirmationPopup(
    ConstructCategoryPopup,
    "500px",
    "380px",
    {
      restaurantId,
      translations,
      buttonName: translations["create"],
      heading: translations["create_category"],
    }
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
