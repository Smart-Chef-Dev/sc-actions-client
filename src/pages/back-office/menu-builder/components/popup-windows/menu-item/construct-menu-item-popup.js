import { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { FormikProvider, useFormik } from "formik";
import { styled } from "@linaria/react";

import { ConstructorMenuItemScheme } from "pages/back-office/menu-builder/yup-schemes/constructor-menu-item-scheme";
import { useMutation, useQueryClient } from "react-query";
import { createMenuItem, editMenuItem } from "services/menuItemsService";
import { Form } from "components/form";
import { Flex } from "components/flex";
import { theme } from "theme";
import { Text } from "components/text";
import UploadPhotoComponent from "../../upload-photo-component";
import Input from "components/input";
import { Checkbox } from "components/checkbox";
import CategoriesSelect from "./categories-select";
import AddonsMultiselect from "./addons-multiselect";
import Textarea from "components/textarea";
import PopupWindowControlButton from "../popup-window-control-button";

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

          return;
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
          console.log(err);
        }
      },
      [onToggleHidden, menuItem, editMenuItemMutation, categories]
    ),
  });

  const handleChange = useCallback(
    (fieldName) => (e) => {
      formik.setFieldValue(fieldName, e);
    },
    [formik]
  );

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
              error={formik.errors?.pictureUrl && formik.touched.pictureUrl}
              restaurantId={restaurantId}
              onFieldValue={formik.setFieldValue}
              pictureUrl={formik.values["pictureUrl"]}
              nameValue="pictureUrl"
            />
          </Flex>

          <Flex height={1} width={1} mb={theme.spacing(1)}>
            <Flex height={1} width={1} mr={theme.spacing(1)} direction="column">
              <Flex width={1} mb={theme.spacing(1)}>
                <Input
                  name="name"
                  placeholder={translations["enter_name"]}
                  type="string"
                  label={translations["name"]}
                  value={formik.values["name"]}
                  onChange={handleChange("name")}
                  error={formik.touched.name ? formik.errors.name : ""}
                />
              </Flex>

              <Flex direction="column" width={1} mb={theme.spacing(1)}>
                <Input
                  name="price"
                  type="number"
                  placeholder="0.00"
                  label={translations["price"]}
                  value={formik.values["price"]}
                  onChange={handleChange("price")}
                  error={formik.touched.price ? formik.errors.price : ""}
                />
              </Flex>

              <Flex direction="column" width={1}>
                <Flex mb={theme.spacing(1)} alignItems="flex-end" width={1}>
                  <Flex mb={theme.spacing(1)} mr={theme.spacing(1)}>
                    <Checkbox type="checkbox" name="toggleTime" />
                  </Flex>
                  <Flex width={1}>
                    <Input
                      name="time"
                      label={translations["time"]}
                      type="number"
                      height="52px"
                      placeholder="0.00"
                      value={formik.values["time"]}
                      onChange={handleChange("time")}
                      disabled={!formik.values["toggleTime"]}
                      error={formik.touched.time ? formik.errors.time : ""}
                    />
                  </Flex>
                </Flex>

                <Flex alignItems="flex-end" width={1}>
                  <Flex mb={theme.spacing(1)} mr={theme.spacing(1)}>
                    <Checkbox type="checkbox" name="toggleWeight" />
                  </Flex>
                  <Flex width={1}>
                    <Input
                      name="weight"
                      label={translations["weight"]}
                      type="number"
                      height="52px"
                      placeholder="0.00"
                      value={formik.values["weight"]}
                      onChange={handleChange("weight")}
                      disabled={!formik.values["toggleWeight"]}
                      error={formik.touched.weight ? formik.errors.weight : ""}
                    />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            <Flex width={1} height={1} ml={theme.spacing(1)} direction="column">
              <Flex direction="column" width={1} mb={theme.spacing(1)}>
                <CategoriesSelect
                  categories={categories}
                  formik={formik}
                  translations={translations}
                />
              </Flex>

              <Flex direction="column" width={1} mb={theme.spacing(1)}>
                <AddonsMultiselect
                  translations={translations}
                  restaurantId={restaurantId}
                  formik={formik}
                />
              </Flex>

              <Flex direction="column" width={1} height={1}>
                <Textarea
                  name="description"
                  label={translations["description"]}
                  placeholder={translations["enter_text"]}
                  error={formik.errors.description ?? ""}
                />
              </Flex>
            </Flex>
          </Flex>
          <Flex width={1} mb={theme.spacing(1)}>
            <Flex width={1} mr={theme.spacing(1)} />
            <Flex width={1} ml={theme.spacing(1)} position="relative">
              <s.DescriptionInformation
                fontSize={theme.fontSize(0)}
                color={formik.errors.description ? "var(--error)" : ""}
              >
                {translations["maximum_characters"]}
              </s.DescriptionInformation>
            </Flex>
          </Flex>
          <Flex width={1} mt={theme.spacing(3)}>
            <PopupWindowControlButton
              onToggleHidden={onToggleHidden}
              translations={translations}
              buttonName={translations["create"]}
            />
          </Flex>
        </Flex>
      </Form>
    </FormikProvider>
  );
};

const s = {
  DescriptionInformation: styled(Text)`
    position: absolute;
    bottom: 0;
  `,
};

ConstructMenuItemPopup.propTypes = {
  onToggleHidden: PropTypes.func,
  menuItem: PropTypes.object,
  translations: PropTypes.object,
  category: PropTypes.object,
  restaurantId: PropTypes.string,
};

export default memo(ConstructMenuItemPopup);
