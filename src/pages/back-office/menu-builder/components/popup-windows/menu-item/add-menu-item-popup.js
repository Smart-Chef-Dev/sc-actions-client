import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";

import { createMenuItem } from "services/menuItemsService";
import StyleEditMenuItem from "./style-edit-menu-item";
import { ConstructorMenuItemScheme } from "../../../yup-schemes/constructor-menu-item-scheme";

const AddMenuItemPopup = ({
  onToggleHidden,
  category,
  translations,
  restaurantId,
}) => {
  const queryClient = useQueryClient();
  const categories = queryClient.getQueryData(["categories", { restaurantId }]);

  const createMenuItemMutation = useMutation(createMenuItem, {
    onSuccess: (data, queryVariables) => {
      const dataInCache = queryClient.getQueryData([
        "menuItems",
        { categoryId: queryVariables.categoryId },
      ]);

      queryClient.setQueryData(
        ["menuItems", { categoryId: queryVariables.categoryId }],
        [...dataInCache, data]
      );
    },
  });

  const initialValues = {
    toggleTime: true,
    toggleWeight: true,
    name: "",
    price: "",
    description: "",
    category: {
      value: category.name,
      label: category.name,
    },
    time: "",
    weight: "",
    addons: [],
    pictureUrl: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ConstructorMenuItemScheme(translations),
    onSubmit: useCallback(
      async (values) => {
        const categoryTmp = categories.find(
          (currentCategory) => currentCategory.name === values.category.value
        );

        await createMenuItemMutation.mutateAsync({
          categoryId: categoryTmp._id,
          body: { ...values },
        });

        onToggleHidden(true);
      },
      [onToggleHidden, createMenuItemMutation, categories]
    ),
  });

  return (
    <StyleEditMenuItem
      formik={formik}
      categories={categories}
      onToggleHidden={onToggleHidden}
      translations={translations}
    />
  );
};

AddMenuItemPopup.propTypes = {
  onToggleHidden: PropTypes.func,
  category: PropTypes.object,
  translations: PropTypes.object,
  restaurantId: PropTypes.string,
};

export default memo(AddMenuItemPopup);
