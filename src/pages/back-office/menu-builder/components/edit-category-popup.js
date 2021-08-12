import { memo, useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { FormikProvider, useFormik } from "formik";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import Input from "components/input";
import Button from "components/button";
import { Form } from "components/form";
import { editCategory } from "services/categoriesService";
import { ConstructorAddonScheme } from "../yup-schemes/constructor-addon-scheme";
import { theme } from "theme";

const EditCategoryPopup = ({
  category,
  categories,
  restaurantId,
  onToggleHidden,
  translations,
}) => {
  const queryClient = useQueryClient();
  const addCategoryMutation = useMutation(editCategory, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["categories", { restaurantId }],
        categories.map((currentCategory) =>
          currentCategory._id === category._id ? data : currentCategory
        )
      );
    },
  });

  const initialValues = {
    name: category.name,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ConstructorAddonScheme(translations),
    onSubmit: useCallback(
      async (values) => {
        ``;
        try {
          await addCategoryMutation.mutateAsync({
            categoryId: category._id,
            body: values,
          });

          onToggleHidden(true);
        } catch (err) {
          console.log(err);
        }
      },
      [onToggleHidden, addCategoryMutation, category]
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
          direction="column"
          width={1}
          height={1}
          p={theme.spacing(4)}
          pt={theme.spacing(3)}
          boxSizing="border-box"
          justifyContent="space-between"
        >
          <Flex direction="column" width={1} alignItems="center">
            <Text
              fontWeight="bold"
              fontSize={theme.fontSize(3)}
              mb={theme.spacing(4)}
            >
              {translations["edit_category"]}
            </Text>
            <Flex mb={theme.spacing(2)} width={1} direction="column">
              <Input
                id="name"
                type="string"
                placeholder="Enter name"
                onChange={handleChange("name")}
                label={translations["category_name"]}
                value={formik.values["name"]}
                error={formik.errors.name}
              />
            </Flex>
          </Flex>
          <Flex justifyContent="space-between" width={1}>
            <Button
              background="var(--text-grey)"
              width="none"
              mb="0"
              onClick={cancelAddingCategory}
              type="button"
            >
              {translations["cancel"]}
            </Button>
            <Button width="auto" mb="0" type="submit">
              {translations["save"]}
            </Button>
          </Flex>
        </Flex>
      </Form>
    </FormikProvider>
  );
};

EditCategoryPopup.propTypes = {
  category: PropTypes.object,
  restaurantId: PropTypes.string,
  categories: PropTypes.array,
  onToggleHidden: PropTypes.func,
  translations: PropTypes.object,
};

export default memo(EditCategoryPopup);
