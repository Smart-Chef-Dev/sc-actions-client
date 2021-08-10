import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";

import StyleEditMenuItem from "./style-edit-menu-item";
import { ConstructorMenuItemScheme } from "../yup-schemes/constructor-menu-item-scheme";
import { useMutation, useQueryClient } from "react-query";
import { editMenuItem } from "services/menuItemsService";

const EditMenuItemPopup = ({
  onToggleHidden,
  menuItem,
  categories,
  menuItems,
}) => {
  const queryClient = useQueryClient();
  const [pictureFile, setPictureFile] = useState({});

  const editMenuItemMutation = useMutation(editMenuItem, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["menuItems", { categoryId: menuItem.category._id }],
        menuItems.map((currentMenuItem) => {
          if (currentMenuItem._id === menuItem._id) {
            return data;
          }

          return currentMenuItem;
        })
      );
    },
  });

  console.log(pictureFile);

  const initialValues = {
    name: menuItem.name,
    price: menuItem.price,
    description: menuItem.description,
    category: menuItem.category.name,
    toggleTime: !!menuItem.time,
    time: menuItem.time,
    toggleWeight: !!menuItem.weight,
    weight: menuItem.weight,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ConstructorMenuItemScheme,
    onSubmit: useCallback(
      async (values) => {
        console.log(categories);
        console.log(values);
        const category = categories.find(
          (category) => category.name === values.category
        );
        delete values.category;
        await editMenuItemMutation.mutateAsync({
          menuItemId: menuItem._id,
          body: { ...values, categoryId: category._id },
        });
        onToggleHidden(true);
      },
      [onToggleHidden, menuItem, editMenuItemMutation, categories]
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

EditMenuItemPopup.propTypes = {
  onToggleHidden: PropTypes.func,
  categories: PropTypes.array,
  menuItem: PropTypes.object,
  menuItems: PropTypes.array,
};

export default memo(EditMenuItemPopup);
