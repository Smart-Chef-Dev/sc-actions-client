import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";
import { FormikProvider, useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";

import { Flex } from "components/flex";
import { Text } from "components/text";
import Input from "components/input";
import Button from "components/button";
import ErrorText from "components/error-text";
import { addCategory } from "services/categoriesService";
import { theme } from "theme";
import { ConstructorCategoryScheme } from "../yup-schemes/constructor-category-scheme";

const AddCategoryPopup = ({
  onToggleHidden,
  restaurantId,
  categories,
  translations,
}) => {
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();
  const addCategoryMutation = useMutation(addCategory, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["categories", { restaurantId }],
        [...categories, data]
      );
    },
  });

  const initialValues = {
    name: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ConstructorCategoryScheme(translations),
    onSubmit: useCallback(
      async (values) => {
        try {
          await addCategoryMutation.mutateAsync({
            restaurantId,
            body: values,
          });

          onToggleHidden(true);
        } catch (err) {
          setError(err);
        }
      },
      [onToggleHidden, addCategoryMutation, restaurantId]
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
              {translations["create_category"]}
            </Text>
            <Flex mb={theme.spacing(2)} width={1} direction="column">
              <Input
                id="name"
                type="string"
                placeholder={translations["enter_name"]}
                onChange={handleChange("name")}
                label={translations["category_name"]}
                value={formik.values["name"]}
                error={formik.errors.name}
              />
            </Flex>
          </Flex>
          <Flex mb={theme.spacing(1)} width={1} justifyContent="center">
            {error?.status === 403 && (
              <ErrorText>
                {translations["category_with_the_same_name_already_exists"]}
              </ErrorText>
            )}
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
              {translations["create"]}
            </Button>
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

AddCategoryPopup.propTypes = {
  onToggleHidden: PropTypes.func,
  restaurantId: PropTypes.string,
  categories: PropTypes.array,
  translations: PropTypes.object,
};

export default memo(AddCategoryPopup);
