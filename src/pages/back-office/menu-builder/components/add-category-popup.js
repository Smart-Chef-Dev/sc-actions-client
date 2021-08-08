import { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";
import { useFormik } from "formik";

import { Flex } from "components/flex";
import { Text } from "components/text";
import Input from "components/input";
import Button from "components/button";
import ErrorText from "components/error-text";
import { theme } from "theme";
import * as Yup from "yup";

const AddCategoryPopup = ({ onToggleHidden }) => {
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
        console.log(values);
        onToggleHidden(true);
      },
      [onToggleHidden]
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
    <Flex
      direction="column"
      width={1}
      pt={theme.spacing(3)}
      p={theme.spacing(4)}
    >
      <Form onSubmit={formik.handleSubmit}>
        <Flex direction="column" width={1} alignItems="center">
          <Text
            fontWeight="bold"
            fontSize={theme.fontSize(3)}
            mb={theme.spacing(4)}
          >
            Create Category
          </Text>
          <Flex mb={theme.spacing(4)} width={1} direction="column">
            <Text fontSize={theme.fontSize(0)} color="var(--label-color)">
              CATEGORY NAME
            </Text>
            <Input
              id="name"
              type="string"
              placeholder="Enter name"
              onChange={handleChange("name")}
              value={formik.values["name"]}
              height="48px"
              background="var(--main-bg-color)"
            />
            {formik.errors.name && <ErrorText>{formik.errors.name}</ErrorText>}
          </Flex>
        </Flex>
        <Flex justifyContent="space-between">
          <Button
            width="none"
            mb="0"
            onClick={cancelAddingCategory}
            type="button"
          >
            Cancel
          </Button>
          <Button width="none" mb="0" type="submit">
            Create
          </Button>
        </Flex>
      </Form>
    </Flex>
  );
};

const Form = styled.form`
  width: 100%;
`;

AddCategoryPopup.propTypes = {
  onToggleHidden: PropTypes.func,
};

export default memo(AddCategoryPopup);
