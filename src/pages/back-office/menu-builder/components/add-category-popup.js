import { memo, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import * as Yup from "yup";

import { Flex } from "components/flex";
import { Text } from "components/text";
import Input from "components/input";
import Button from "components/button";
import ErrorText from "components/error-text";
import { addCategory } from "services/categoriesService";
import { theme } from "theme";

const AddCategoryPopup = ({ onToggleHidden, restaurantId, categories }) => {
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
            Create Category
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
        <Flex mb={theme.spacing(1)} width={1} justifyContent="center">
          {error?.status === 403 && (
            <ErrorText>A category with the same name already exists</ErrorText>
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
            CANCEL
          </Button>
          <Button width="auto" mb="0" type="submit">
            CREATE
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

AddCategoryPopup.propTypes = {
  onToggleHidden: PropTypes.func,
  restaurantId: PropTypes.string,
  categories: PropTypes.array,
};

export default memo(AddCategoryPopup);
