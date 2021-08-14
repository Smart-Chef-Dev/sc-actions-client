import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";

import { addCategory } from "services/categoriesService";
import { ConstructorCategoryScheme } from "pages/back-office/menu-builder/yup-schemes/constructor-category-scheme";
import StyleConstructCategory from "./style-construct-category";

const initialValues = {
  name: "",
};

const AddCategoryPopup = ({ onToggleHidden, restaurantId, translations }) => {
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();
  const addCategoryMutation = useMutation(addCategory, {
    onSuccess: (data) => {
      const dataInCache = queryClient.getQueryData([
        "categories",
        { restaurantId },
      ]);

      queryClient.setQueryData(
        ["categories", { restaurantId }],
        [...dataInCache, data]
      );
    },
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ConstructorCategoryScheme(translations),
    onSubmit: useCallback(
      async (values) => {
        try {
          await addCategoryMutation.mutateAsync({
            restaurantId,
            body: values,
          });

          onToggleHidden(true);
        } catch (err) {
          setError(err);
        }
      },
      [onToggleHidden, addCategoryMutation, restaurantId]
    ),
  });

  return (
    <StyleConstructCategory
      formik={formik}
      error={error}
      translations={translations}
      onToggleHidden={onToggleHidden}
      heading={translations["create_category"]}
      buttonName={translations["create"]}
    />
  );
};

AddCategoryPopup.propTypes = {
  onToggleHidden: PropTypes.func,
  restaurantId: PropTypes.string,
  translations: PropTypes.object,
};

export default memo(AddCategoryPopup);
