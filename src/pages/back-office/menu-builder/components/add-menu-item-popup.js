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
  menuItems,
}) => {
  const queryClient = useQueryClient();
  const [pictureFile, setPictureFile] = useState({});

  const uploadFileInRestaurantMutation = useMutation(uploadFileInRestaurant);
  const createMenuItemMutation = useMutation(createMenuItem, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["menuItems", { categoryId: category._id }],
        [...menuItems, data]
      );
    },
  });

  const initialValues = {
    toggleTime: true,
    toggleWeight: true,
    name: "",
    price: "",
    description: "",
    category: category.name,
    time: "",
    weight: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ConstructorMenuItemScheme,
    onSubmit: useCallback(
      async (values) => {
        const pictureUrl = await uploadFileInRestaurantMutation.mutateAsync({
          restaurantId,
          file: pictureFile,
        });

        await createMenuItemMutation.mutateAsync({
          categoryId: category._id,
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
        category,
      ]
    ),
  });

  return (
    <StyleEditMenuItem
      formik={formik}
      categories={categories}
      onToggleHidden={onToggleHidden}
      onPictureFile={setPictureFile}
    />
  );
};

AddMenuItemPopup.propTypes = {
  onToggleHidden: PropTypes.func,
  categories: PropTypes.array,
  category: PropTypes.object,
  restaurantId: PropTypes.string,
  menuItems: PropTypes.array,
};

export default memo(AddMenuItemPopup);
