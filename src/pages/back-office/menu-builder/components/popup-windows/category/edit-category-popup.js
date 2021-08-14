import { memo, useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import { editCategory } from "services/categoriesService";
import { ConstructorCategoryScheme } from "pages/back-office/menu-builder/yup-schemes/constructor-category-scheme";
import StyleConstructCategory from "./style-construct-category";

const EditCategoryPopup = ({
  category,
  restaurantId,
  onToggleHidden,
  translations,
}) => {
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();
  const addCategoryMutation = useMutation(editCategory, {
    onSuccess: (data) => {
      const dataInCache = queryClient.getQueryData([
        "categories",
        { restaurantId },
      ]);

      queryClient.setQueryData(
        ["categories", { restaurantId }],
        dataInCache.map((currentCategory) =>
          currentCategory._id === category._id ? data : currentCategory
        )
      );
    },
  });

  const initialValues = {
    name: category.name,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ConstructorCategoryScheme(translations),
    onSubmit: useCallback(
      async (values) => {
        try {
          await addCategoryMutation.mutateAsync({
            categoryId: category._id,
            body: values,
          });

          onToggleHidden(true);
        } catch (err) {
          setError(err);
        }
      },
      [onToggleHidden, addCategoryMutation, category]
    ),
  });

  return (
    <StyleConstructCategory
      formik={formik}
      heading={translations["edit_category"]}
      translations={translations}
      onToggleHidden={onToggleHidden}
      error={error}
      buttonName={translations["save"]}
    />
  );
};

EditCategoryPopup.propTypes = {
  category: PropTypes.object,
  restaurantId: PropTypes.string,
  onToggleHidden: PropTypes.func,
  translations: PropTypes.object,
};

export default memo(EditCategoryPopup);
