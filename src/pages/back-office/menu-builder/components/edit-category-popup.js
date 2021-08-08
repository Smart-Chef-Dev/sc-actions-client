import { memo, useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "react-query";
import { styled } from "@linaria/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import Input from "components/input";
import Button from "components/button";
import { theme } from "theme";
import { editCategory } from "services/categoriesService";

const EditCategoryPopup = ({
  category,
  categories,
  restaurantId,
  onToggleHidden,
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

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: useMemo(() => SignupSchema, [SignupSchema]),
    onSubmit: useCallback(
      async (values) => {
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
            Edit Category
          </Text>
          <Flex mb={theme.spacing(2)} width={1} direction="column">
            <Input
              id="name"
              type="string"
              placeholder="Enter name"
              onChange={handleChange("name")}
              label="CATEGORY NAME"
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
            CANCEL
          </Button>
          <Button width="auto" mb="0" type="submit">
            SAVE
          </Button>
        </Flex>
      </Flex>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  height: 100%;
`;

EditCategoryPopup.propTypes = {
  category: PropTypes.object,
  restaurantId: PropTypes.string,
  categories: PropTypes.array,
  onToggleHidden: PropTypes.func,
};

export default memo(EditCategoryPopup);
