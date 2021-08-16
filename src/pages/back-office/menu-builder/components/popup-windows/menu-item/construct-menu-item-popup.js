import { memo, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";

import StyleEditMenuItem from "./style-edit-menu-item";
import { ConstructorMenuItemScheme } from "pages/back-office/menu-builder/yup-schemes/constructor-menu-item-scheme";
import { useMutation, useQueryClient } from "react-query";
import { createMenuItem, editMenuItem } from "services/menuItemsService";

const ConstructMenuItemPopup = ({
  onToggleHidden,
  menuItem,
  categories,
  translations,
  category,
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

  const editMenuItemMutation = useMutation(
    menuItem ? editMenuItem : createMenuItem,
    {
      onSuccess: (data) => {
        const queryKeyOldMenuItem = [
          "menuItems",
          { categoryId: menuItem.category._id },
        ];
        const queryKeyNewMenuItem = [
          "menuItems",
          { categoryId: data.category._id },
        ];

        const newMenuItemInCache =
          queryClient.getQueryData(queryKeyNewMenuItem);
        const oldMenuItemInCache =
          queryClient.getQueryData(queryKeyOldMenuItem);

        if (!menuItem) {
          queryClient.setQueryData(queryKeyNewMenuItem, [
            ...newMenuItemInCache,
            data,
          ]);

          return;
        }

        if (data.category._id === menuItem.category._id) {
          queryClient.setQueryData(
            queryKeyOldMenuItem,
            oldMenuItemInCache.map((currentMenuItem) =>
              currentMenuItem._id === menuItem._id ? data : currentMenuItem
            )
          );

          return;
        }

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
    }
  );

  const initialValues = useMemo(
    () =>
      menuItem
        ? {
            name: menuItem.name,
            price: menuItem.price,
            description: menuItem.description,
            category: {
              value: menuItem.category.name,
              label: menuItem.category.name,
            },
            toggleTime: !!menuItem.time,
            time: menuItem.time,
            toggleWeight: !!menuItem.weight,
            weight: menuItem.weight,
            addons: addons,
            pictureUrl: menuItem.pictureUrl,
          }
        : {
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
          },
    [category, menuItem, addons]
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ConstructorMenuItemScheme(translations),
    onSubmit: useCallback(
      async (values) => {
        try {
          const menuItemCategory = categories.find(
            (c) => c.name === values.category.value
          );
          const requestData = menuItem
            ? {
                menuItemId: menuItem._id,
                body: { ...values, categoryId: menuItemCategory._id },
              }
            : {
                categoryId: menuItemCategory._id,
                body: { ...values },
              };

          if (!values.toggleWeight) {
            values.weight = "";
          }
          if (!values.toggleTime) {
            values.time = "";
          }

          await editMenuItemMutation.mutateAsync(requestData);
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

ConstructMenuItemPopup.propTypes = {
  onToggleHidden: PropTypes.func,
  categories: PropTypes.array,
  menuItem: PropTypes.object,
  translations: PropTypes.object,
  category: PropTypes.object,
};

export default memo(ConstructMenuItemPopup);
