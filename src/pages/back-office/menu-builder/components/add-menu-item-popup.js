import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";

import { uploadFileInRestaurant } from "services/restaurantService";
import { createMenuItem } from "services/menuItemsService";
import StyleEditMenuItem from "./style-edit-menu-item";
import { ConstructorMenuItemScheme } from "../yup-schemes/constructor-menu-item-scheme";

const AddMenuItemPopup = ({
  onToggleHidden,
  categories,
  category,
  restaurantId,
  translations,
}) => {
  const queryClient = useQueryClient();
  const [pictureFile, setPictureFile] = useState({});

  const uploadFileInRestaurantMutation = useMutation(uploadFileInRestaurant);
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
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ConstructorMenuItemScheme(translations),
    onSubmit: useCallback(
      async (values) => {
        const categoryTmp = categories.find(
          (currentCategory) => currentCategory.name === values.category.value
        );

        const pictureUrl = await uploadFileInRestaurantMutation.mutateAsync({
          restaurantId,
          file: pictureFile,
        });

        await createMenuItemMutation.mutateAsync({
          categoryId: categoryTmp._id,
          body: { ...values, pictureUrl },
        });

        onToggleHidden(true);
      },
      [
        onToggleHidden,
        uploadFileInRestaurantMutation,
        createMenuItemMutation,
        restaurantId,
        pictureFile,
        categories,
      ]
    ),
  });

  return (
    <StyleEditMenuItem
      formik={formik}
      categories={categories}
      onToggleHidden={onToggleHidden}
      onPictureFile={setPictureFile}
      translations={translations}
    />
  );
};

AddMenuItemPopup.propTypes = {
  onToggleHidden: PropTypes.func,
  categories: PropTypes.array,
  category: PropTypes.object,
  translations: PropTypes.object,
  restaurantId: PropTypes.string,
};

export default memo(AddMenuItemPopup);
