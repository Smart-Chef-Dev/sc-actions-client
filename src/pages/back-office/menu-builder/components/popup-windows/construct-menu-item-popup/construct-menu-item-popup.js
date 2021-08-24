import { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { FormikProvider, useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";

import { ConstructorMenuItemScheme } from "yup-schemes/constructor-menu-item-scheme";
import { createMenuItem, editMenuItem } from "services/menuItemsService";
import { Form } from "components/form";
import { Flex } from "components/flex";
import { theme } from "theme";
import { Text } from "components/text";
import UploadPhotoComponent from "./upload-photo-component";
import ConfirmationPopupControlButton from "components/confirmationPopup/confirmation-popup-control-button";
import FormComponent from "./form-component";
import { uploadFileInRestaurant } from "services/restaurantService";

const ConstructMenuItemPopup = ({
  onToggleHidden,
  menuItem,
  translations,
  category,
  restaurantId,
}) => {
  const queryClient = useQueryClient();

  const categories = useMemo(
    () => queryClient.getQueryData(["categories", { restaurantId }]),
    [restaurantId, queryClient]
  );

  const addons = useMemo(
    () =>
      menuItem &&
      menuItem.addons.map((a) => ({
        ...a,
        value: a.name,
        label: a.name,
      })),
    [menuItem]
  );

  const uploadFileInRestaurantMutation = useMutation(uploadFileInRestaurant);
  const editMenuItemMutation = useMutation(
    menuItem ? editMenuItem : createMenuItem,
    {
      onSuccess: (data) => {
        const queryKeyNewMenuItem = [
          "menuItems",
          { categoryId: data.category._id },
        ];

        const newMenuItemInCache =
          queryClient.getQueryData(queryKeyNewMenuItem);

        if (!menuItem) {
          queryClient.setQueryData(queryKeyNewMenuItem, [
            ...newMenuItemInCache,
            data,
          ]);

          return onToggleHidden(true);
        }

        const queryKeyOldMenuItem = [
          "menuItems",
          { categoryId: menuItem.category._id },
        ];
        const oldMenuItemInCache =
          queryClient.getQueryData(queryKeyOldMenuItem);

        if (data.category._id === menuItem.category._id) {
          queryClient.setQueryData(
            queryKeyOldMenuItem,
            oldMenuItemInCache.map((currentMenuItem) =>
              currentMenuItem._id === menuItem._id ? data : currentMenuItem
            )
          );

          return onToggleHidden(true);
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
            time: menuItem.time ?? "",
            toggleWeight: !!menuItem.weight,
            weight: menuItem.weight ?? "",
            addons: addons,
            picture: menuItem.pictureUrl,
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
            picture: "",
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

          let pictureUrl = null;
          if (typeof values.picture !== "string") {
            pictureUrl = await uploadFileInRestaurantMutation.mutateAsync({
              restaurantId,
              file: values.picture,
            });
          }

          if (!values.toggleWeight) {
            values.weight = "";
          }
          if (!values.toggleTime) {
            values.time = "";
          }

          const requestData = menuItem
            ? {
                menuItemId: menuItem._id,
                body: {
                  ...values,
                  categoryId: menuItemCategory._id,
                  pictureUrl: pictureUrl ?? values.picture,
                },
              }
            : {
                categoryId: menuItemCategory._id,
                body: { ...values, pictureUrl },
              };

          await editMenuItemMutation.mutateAsync(requestData);
        } catch (err) {
          console.log(err);
        }
      },
      [
        menuItem,
        editMenuItemMutation,
        uploadFileInRestaurantMutation,
        categories,
        restaurantId,
      ]
    ),
  });

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        <Flex
          width={1}
          height={1}
          p={theme.spacing(4)}
          pb={theme.spacing(3)}
          direction="column"
          boxSizing="border-box"
        >
          <Text
            fontWeight="bold"
            fontSize={theme.fontSize(2)}
            mb={theme.spacing(1)}
          >
            {translations["edit_item"]}
          </Text>
          <Flex mb={theme.spacing(1)}>
            <UploadPhotoComponent
              error={formik.errors?.picture && formik.touched.picture}
              onFieldValue={formik.setFieldValue}
              pictureInFormikValue={formik.values["picture"]}
              nameValue="picture"
            />
          </Flex>
          <FormComponent
            translations={translations}
            formik={formik}
            categories={categories}
            restaurantId={restaurantId}
          />
          <Flex width={1} mt={theme.spacing(3)}>
            <ConfirmationPopupControlButton
              onToggleHidden={onToggleHidden}
              nameContinueButton={translations["create"]}
              nameCancelButton={translations["cancel"]}
            />
          </Flex>
        </Flex>
      </Form>
    </FormikProvider>
  );
};

ConstructMenuItemPopup.propTypes = {
  onToggleHidden: PropTypes.func,
  menuItem: PropTypes.object,
  translations: PropTypes.object,
  category: PropTypes.object,
  restaurantId: PropTypes.string,
};

export default memo(ConstructMenuItemPopup);
