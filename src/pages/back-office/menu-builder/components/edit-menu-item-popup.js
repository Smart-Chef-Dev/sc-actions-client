import { memo, useCallback, useMemo, useState } from "react";
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
  const [, setPictureFile] = useState({});

  const addons = useMemo(
    () =>
      menuItem.addons.map((a) => ({
        ...a,
        value: a.name,
        label: a.name,
      })),
    [menuItem]
  );

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

  const initialValues = {
    name: menuItem.name,
    price: menuItem.price,
    description: menuItem.description,
    category: menuItem.category.name,
    toggleTime: !!menuItem.time,
    time: menuItem.time,
    toggleWeight: !!menuItem.weight,
    weight: menuItem.weight,
    addons: addons,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ConstructorMenuItemScheme,
    onSubmit: useCallback(
      async (values) => {
        try {
          const category = categories.find(
            (c) => c.name === values.category.value
          );
          delete values.category;
          await editMenuItemMutation.mutateAsync({
            menuItemId: menuItem._id,
            body: { ...values, categoryId: category._id },
          });
          onToggleHidden(true);
        } catch (err) {
          console.log(err);
        }
      },
      [onToggleHidden, menuItem, editMenuItemMutation, categories]
    ),
  });

  console.log(formik.values);

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