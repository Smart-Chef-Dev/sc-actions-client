import { memo, useMemo } from "react";
import PropTypes from "prop-types";

import SelectComponent from "components/select";

const CategoriesSelect = ({ categories, formik, translations }) => {
  const categoryOptions = useMemo(
    () =>
      categories.map((currentCategory) => ({
        value: currentCategory.name,
        label: currentCategory.name,
      })),
    [categories]
  );

  return (
    <SelectComponent
      placeholder="Select"
      options={categoryOptions}
      name="category"
      value={formik.values["category"]}
      onFieldValue={formik.setFieldValue}
      label={translations["category"]}
      translations={translations}
    />
  );
};

CategoriesSelect.propTypes = {
  formik: PropTypes.object,
  categories: PropTypes.array,
  translations: PropTypes.object,
};

export default memo(CategoriesSelect);
