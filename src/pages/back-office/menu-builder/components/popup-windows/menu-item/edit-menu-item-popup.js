import { memo, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";

import StyleEditMenuItem from "./style-edit-menu-item";
import { ConstructorMenuItemScheme } from "pages/back-office/menu-builder/yup-schemes/constructor-menu-item-scheme";
import { useMutation, useQueryClient } from "react-query";
import { editMenuItem } from "services/menuItemsService";

const EditMenuItemPopup = ({
  onToggleHidden,
  menuItem,
  categories,
  translations,
}) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);
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
      const queryKeyOldMenuItem = [
        "menuItems",
        { categoryId: menuItem.category._id },
      ];
      const oldMenuItemInCache = queryClient.getQueryData(queryKeyOldMenuItem);

      if (data.category._id === menuItem.category._id) {
        queryClient.setQueryData(
          queryKeyOldMenuItem,
          oldMenuItemInCache.map((currentMenuItem) =>
            currentMenuItem._id === menuItem._id ? data : currentMenuItem
          )
        );

        return;
      }

      const queryKeyNewMenuItem = [
        "menuItems",
        { categoryId: data.category._id },
      ];
      const newMenuItemInCache = queryClient.getQueryData(queryKeyNewMenuItem);

      if (!newMenuItemInCache) {
        queryClient.setQueryData(
          queryKeyOldMenuItem,
          oldMenuItemInCache.filter(
            (currentMenuItem) => currentMenuItem._id !== data._id
          )
        );

        return;
      }

      queryClient.setQueryData(
        queryKeyNewMenuItem,
        newMenuItemInCache.map((currentMenuItem) =>
          currentMenuItem._id === menuItem._id ? data : currentMenuItem
        )
      );

      queryClient.setQueryData(
        queryKeyOldMenuItem,
        oldMenuItemInCache.filter(
          (currentMenuItem) => currentMenuItem._id !== data._id
        )
      );
    },
  });

  const initialValues = {
    name: menuItem.name,
    price: menuItem.price,
    description: menuItem.description,
    category: { value: menuItem.category.name, label: menuItem.category.name },
    toggleTime: !!menuItem.time,
    time: menuItem.time,
    toggleWeight: !!menuItem.weight,
    weight: menuItem.weight,
    addons: addons,
    pictureUrl: menuItem.pictureUrl,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ConstructorMenuItemScheme(translations),
    onSubmit: useCallback(
      async (values) => {
        try {
          const category = categories.find(
            (c) => c.name === values.category.value
          );

          if (!values.toggleWeight) {
            values.weight = "";
          }
          if (!values.toggleTime) {
            values.time = "";
          }

          await editMenuItemMutation.mutateAsync({
            menuItemId: menuItem._id,
            body: { ...values, categoryId: category._id },
          });
          onToggleHidden(true);
        } catch (err) {
          setError(err);
        }
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
      translations={translations}
      heading={translations["edit_item"]}
      error={error}
    />
  );
};

EditMenuItemPopup.propTypes = {
  onToggleHidden: PropTypes.func,
  categories: PropTypes.array,
  menuItem: PropTypes.object,
  translations: PropTypes.object,
};

export default memo(EditMenuItemPopup);
