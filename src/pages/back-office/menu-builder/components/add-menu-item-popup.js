import { memo, useCallback, useMemo } from "react";
import { styled } from "@linaria/react";
import * as Yup from "yup";
import ImageUploader from "react-images-upload";
import PropTypes from "prop-types";
import { useFormik, FormikProvider } from "formik";

import { Flex } from "components/flex";
import { theme } from "theme";
import { Text } from "components/text";
import Input from "components/input";
import Button from "components/button";
import { Checkbox } from "components/Checkbox";

const AddMenuItemPopup = ({ onToggleHidden }) => {
  const onDrop = (picture) => {
    console.log(picture);
  };

  const initialValues = {
    toggleTime: true,
    toggleWeight: true,
    name: "",
    price: "",
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    price: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: useMemo(() => SignupSchema, [SignupSchema]),
    onSubmit: useCallback(
      async (values) => {
        console.log(values);
        // onToggleHidden(true);
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

  console.log(formik.values["toggle"]);
  console.log(formik.values);

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        <Flex p={theme.spacing(4)} pb={theme.spacing(3)} direction="column">
          <Text>Create Item</Text>
          <Flex>
            <ImageUploader
              onChange={onDrop}
              buttonText={"Choose images"}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              withIcon={false}
              withPreview={false}
              label=""
            />
          </Flex>
          <Flex width={1} justifyContent="space-between" mb={theme.spacing(1)}>
            <Flex direction="column" width={1} mr={theme.spacing(1)}>
              <Input
                id="name"
                placeholder="Enter name"
                type="string"
                label="NAME"
                value={formik.values["name"]}
                onChange={handleChange("name")}
              />
            </Flex>
            <Flex direction="column" width={1} ml={theme.spacing(1)}>
              <Input
                id="name"
                type="string"
                placeholder="Enter name"
                label="Category"
              />
            </Flex>
          </Flex>
          <Flex width={1} justifyContent="space-between" mb={theme.spacing(1)}>
            <Flex direction="column" width={1} mr={theme.spacing(1)}>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                label="PRICE"
                value={formik.values["price"]}
                onChange={handleChange("price")}
              />
            </Flex>
            <Flex direction="column" width={1} ml={theme.spacing(1)}>
              <Input
                id="name"
                type="string"
                placeholder="Enter name"
                label="Category"
              />
            </Flex>
          </Flex>

          <Flex width={1} mb={theme.spacing(1)} mr={theme.spacing(1)}>
            <Flex direction="column" width={1}>
              <Flex mb={theme.spacing(1)} alignItems="flex-end">
                <Flex mb={theme.spacing(1)} mr={theme.spacing(1)}>
                  <Checkbox type="checkbox" name="toggleTime" />
                </Flex>
                <Flex direction="column">
                  <Input label="WAITING TIME, MIN" type="number" />
                </Flex>
              </Flex>

              <Flex alignItems="flex-end">
                <Flex mb={theme.spacing(1)} mr={theme.spacing(1)}>
                  <Checkbox type="checkbox" name="toggleWeight" />
                </Flex>
                <Flex direction="column">
                  <Input label="WEIGHT, G" type="number" />
                </Flex>
              </Flex>
            </Flex>

            <Flex
              direction="column"
              weight={1}
              height={1}
              ml={theme.spacing(1)}
            >
              <Input label="DESCRIPTION" type="text" />
            </Flex>
          </Flex>

          <Flex width={1} justifyContent="space-between">
            <Button type="button" onClick={cancelAddingCategory}>
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
};

export default memo(AddMenuItemPopup);
