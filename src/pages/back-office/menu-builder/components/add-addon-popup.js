import { memo, useCallback, useMemo, useState } from "react";
import { FormikProvider, useFormik } from "formik";
import PropTypes from "prop-types";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Flex } from "components/flex";
import { Text } from "components/text";
import { Form } from "components/form";
import Input from "components/input";
import Button from "components/button";
import Multiselect from "components/multiselect";
import ErrorText from "components/error-text";
import { findAllMenuItems } from "services/menuItemsService";
import {
  addAddonIntoMenuItem,
  addAddonIntoRestaurant,
} from "services/addonsService";
import { ConstructorAddonScheme } from "../yup-schemes/constructor-addon-scheme";
import { theme } from "theme";

const initialValues = {
  name: "",
  price: "",
  weight: "",
  menuItems: [],
};

const AddAddonPopup = ({ onToggleHidden, restaurantId }) => {
  const [isError, setError] = useState(false);

  const queryClient = useQueryClient();
  const menuItems = useQuery(["menuItems", { restaurantId }], findAllMenuItems);
  const addAddonMutation = useMutation(addAddonIntoRestaurant, {
    onSuccess: (data) => {
      const dataInCache = queryClient.getQueryData([
        "addons",
        { restaurantId: restaurantId },
      ]);

      queryClient.setQueryData(
        ["addons", { restaurantId: restaurantId }],
        [...dataInCache, data]
      );
    },
  });
  const addAddonIntoMenuItemMutation = useMutation(addAddonIntoMenuItem);

  const menuItemOption = useMemo(
    () =>
      !menuItems.isLoading &&
      menuItems.data.map((menuItem) => ({
        _id: menuItem._id,
        value: menuItem.name,
        label: menuItem.name,
      })),
    [menuItems]
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ConstructorAddonScheme,
    onSubmit: useCallback(
      async (values) => {
        try {
          const newAddon = await addAddonMutation.mutateAsync({
            restaurantId,
            body: values,
          });

          for (const menuItem of values.menuItems) {
            await addAddonIntoMenuItemMutation.mutateAsync({
              menuItemId: menuItem._id,
              addonId: newAddon._id,
            });
          }

          onToggleHidden(true);
        } catch (err) {
          if (!err.status) {
            return;
          }

          setError(true);
        }
      },
      [
        addAddonMutation,
        restaurantId,
        onToggleHidden,
        addAddonIntoMenuItemMutation,
      ]
    ),
  });

  const handleChange = useCallback(
    (fieldName) => (e) => {
      formik.setFieldValue(fieldName, e);
    },
    [formik]
  );

  const cancelAddingCategory = useCallback(() => {
    onToggleHidden(true);
  }, [onToggleHidden]);

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        <Flex
          width={1}
          height={1}
          boxSizing="border-box"
          p={theme.spacing(4)}
          direction="column"
        >
          <Text
            mb={theme.spacing(4)}
            fontSize={theme.fontSize(2)}
            fontWeight="bold"
          >
            Create Add-on
          </Text>

          <Flex width={1} height={1}>
            <Flex width={1} height={1} mr={theme.spacing(1)} direction="column">
              <Flex width={1} mb={theme.spacing(1)}>
                <Input
                  id="name"
                  placeholder="Enter name"
                  type="string"
                  label="NAME"
                  value={formik.values["name"]}
                  onChange={handleChange("name")}
                  error={formik.touched.name ? formik.errors.name : ""}
                />
              </Flex>
              <Flex width={1} mb={theme.spacing(1)}>
                <Input
                  id="price"
                  placeholder="0.00"
                  type="string"
                  label="PRICE"
                  value={formik.values["price"]}
                  onChange={handleChange("price")}
                  error={formik.touched.price ? formik.errors.price : ""}
                />
              </Flex>
              <Flex width={1}>
                <Input
                  id="weight"
                  placeholder="0.00"
                  type="string"
                  label="WEIGHT, G"
                  value={formik.values["weight"]}
                  onChange={handleChange("weight")}
                />
              </Flex>
            </Flex>

            <Flex width={1} height={1} ml={theme.spacing(1)} direction="column">
              <Multiselect
                placeholder=""
                options={menuItemOption}
                name="menuItems"
                value={formik.values["menuItems"]}
                onFieldValue={formik.setFieldValue}
                label="APPLY ADD-ON TO ITEM"
              />
            </Flex>
          </Flex>
          {isError && (
            <Flex mb={theme.spacing(1)} width={1} justifyContent="center">
              <ErrorText>An add-on with the same name already exists</ErrorText>
            </Flex>
          )}
          <Flex width={1} justifyContent="space-between">
            <Button
              type="button"
              onClick={cancelAddingCategory}
              background="var(--text-grey)"
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Flex>
        </Flex>
      </Form>
    </FormikProvider>
  );
};

AddAddonPopup.propTypes = {
  onToggleHidden: PropTypes.func,
  restaurantId: PropTypes.string,
};

export default memo(AddAddonPopup);
