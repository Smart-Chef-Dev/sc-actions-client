import { memo, useCallback, useMemo, useState } from "react";
import { styled } from "@linaria/react";
import * as Yup from "yup";
import ImageUploader from "react-images-upload";
import PropTypes from "prop-types";
import { useFormik, FormikProvider } from "formik";
import { useMutation, useQueryClient } from "react-query";

import { Flex } from "components/flex";
import { theme } from "theme";
import { Text } from "components/text";
import Input from "components/input";
import Button from "components/button";
import { Checkbox } from "components/Checkbox";
import Textarea from "components/textarea";
import Select from "components/select";
import { uploadFileInRestaurant } from "services/restaurantService";
import { createMenuItem } from "services/menuItemsService";

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
  const onDrop = (picture) => {
    setPictureFile(picture[0]);
  };

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

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    description: Yup.string().max(200),
    price: Yup.number()
      .min(0, "The price cannot be menu less than zero")
      .max(999999, "The price cannot be more than 999999")
      .required("Required"),
    toggleTime: Yup.boolean(),
    time: Yup.number().when("toggleTime", {
      is: true,
      then: Yup.number().required("Required"),
    }),
    toggleWeight: Yup.boolean(),
    weight: Yup.number().when("toggleWeight", {
      is: true,
      then: Yup.number().required("Required"),
    }),
  });

  const categoryName = useMemo(
    () => categories.map((currentCategory) => currentCategory.name),
    [categories]
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: useMemo(() => SignupSchema, [SignupSchema]),
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
          p={theme.spacing(4)}
          pb={theme.spacing(3)}
          direction="column"
          boxSizing="border-box"
        >
          <Text fontWeight="bold" fontSize={theme.fontSize(2)}>
            Create Item
          </Text>
          <Flex mb={theme.spacing(1)}>
            <ImageUploader
              onChange={onDrop}
              buttonText={"Choose images"}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              withIcon={false}
              withPreview={false}
              singleImage={true}
              label=""
            />
          </Flex>

          <Flex height={1} width={1} mb={theme.spacing(3)}>
            <Flex height={1} width={1} mr={theme.spacing(1)} direction="column">
              <Flex width={1} mb={theme.spacing(1)}>
                <Input
                  id="name"
                  placeholder="Enter name"
                  type="string"
                  label="NAME"
                  value={formik.values["name"]}
                  onChange={handleChange("name")}
                  error={formik.touched.name && formik.errors.name}
                />
              </Flex>

              <Flex direction="column" width={1} mb={theme.spacing(1)}>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  label="PRICE"
                  value={formik.values["price"]}
                  onChange={handleChange("price")}
                  error={formik.touched.price && formik.errors.price}
                />
              </Flex>

              <Flex direction="column" width={1} mb={theme.spacing(1)}>
                <Flex mb={theme.spacing(1)} alignItems="flex-end" width={1}>
                  <Flex mb={theme.spacing(1)} mr={theme.spacing(1)}>
                    <Checkbox type="checkbox" name="toggleTime" />
                  </Flex>
                  <Flex width={1}>
                    <Input
                      id="time"
                      label="WAITING TIME, MIN"
                      type="number"
                      height="52px"
                      placeholder="0.00"
                      value={formik.values["time"]}
                      onChange={handleChange("time")}
                      disabled={!formik.values["toggleTime"]}
                      error={formik.touched.time && formik.errors.time}
                    />
                  </Flex>
                </Flex>

                <Flex alignItems="flex-end" width={1}>
                  <Flex mb={theme.spacing(1)} mr={theme.spacing(1)}>
                    <Checkbox type="checkbox" name="toggleWeight" />
                  </Flex>
                  <Flex width={1}>
                    <Input
                      id="weight"
                      label="WEIGHT, G"
                      type="number"
                      height="52px"
                      placeholder="0.00"
                      value={formik.values["weight"]}
                      onChange={handleChange("weight")}
                      disabled={!formik.values["toggleWeight"]}
                      error={formik.touched.weight && formik.errors.weight}
                    />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            <Flex width={1} height={1} ml={theme.spacing(1)} direction="column">
              <Flex direction="column" width={1} mb={theme.spacing(1)}>
                <Select
                  name="category"
                  label="CATEGORY"
                  options={categoryName}
                />
              </Flex>

              <Flex direction="column" width={1} mb={theme.spacing(1)}>
                <Select
                  name="category"
                  label="CATEGORY"
                  options={categoryName}
                />
              </Flex>

              <Flex
                direction="column"
                width={1}
                height={1}
                mb={theme.spacing(1)}
              >
                <Textarea
                  name="description"
                  label="DESCRIPTION"
                  placeholder="Enter text"
                  error={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Flex>
            </Flex>
          </Flex>

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

const Form = styled.form`
  width: 100%;
  height: 100%;
`;

AddMenuItemPopup.propTypes = {
  onToggleHidden: PropTypes.func,
  categories: PropTypes.array,
  category: PropTypes.object,
  restaurantId: PropTypes.string,
  menuItems: PropTypes.array,
};

export default memo(AddMenuItemPopup);
