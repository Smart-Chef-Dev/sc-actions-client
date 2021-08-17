import { memo, useCallback, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import { addCategory, editCategory } from "services/categoriesService";
import { ConstructorCategoryScheme } from "pages/back-office/menu-builder/yup-schemes/constructor-category-scheme";
import { Flex } from "components/flex";
import { Text } from "components/text";
import Input from "components/input";
import ErrorText from "components/error-text";
import { Form } from "components/form";
import PopupWindowControlButton from "./popup-window-control-button";
import { theme } from "theme";

const ConstructCategoryPopup = ({
  category,
  restaurantId,
  onToggleHidden,
  translations,
  heading,
  buttonName,
}) => {
  const [error, setError] = useState(null);

  const initialValues = useMemo(
    () =>
      category
        ? {
            name: category.name,
          }
        : {
            name: "",
          },
    [category]
  );

  const queryClient = useQueryClient();
  const addCategoryMutation = useMutation(
    category ? editCategory : addCategory,
    {
      onSuccess: (data) => {
        const dataInCache = queryClient.getQueryData([
          "categories",
          { restaurantId },
        ]);

        if (category) {
          queryClient.setQueryData(
            ["categories", { restaurantId }],
            dataInCache.map((currentCategory) =>
              currentCategory._id === category._id ? data : currentCategory
            )
          );

          return;
        }

        queryClient.setQueryData(
          ["categories", { restaurantId }],
          [...dataInCache, data]
        );
      },
    }
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ConstructorCategoryScheme(translations),
    onSubmit: useCallback(
      async (values) => {
        try {
          const requestData = category
            ? {
                categoryId: category._id,
                body: values,
              }
            : {
                restaurantId,
                body: values,
              };

          await addCategoryMutation.mutateAsync(requestData);

          onToggleHidden(true);
        } catch (err) {
          setError(err);
        }
      },
      [onToggleHidden, addCategoryMutation, category, restaurantId]
    ),
  });

  const handleChange = useCallback(
    (fieldName) => (e) => {
      formik.setFieldValue(fieldName, e);
    },
    [formik]
  );

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
            {heading}
          </Text>
          <Flex mb={theme.spacing(2)} width={1} direction="column">
            <Input
              name="name"
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
        <PopupWindowControlButton
          onToggleHidden={onToggleHidden}
          nameContinueButton={buttonName}
          nameCancelButton={translations["cancel"]}
          buttonWidth="auto"
        />
      </Flex>
    </Form>
  );
};

ConstructCategoryPopup.propTypes = {
  category: PropTypes.object,
  restaurantId: PropTypes.string,
  onToggleHidden: PropTypes.func,
  translations: PropTypes.object,
  buttonName: PropTypes.string,
  heading: PropTypes.string,
};

export default memo(ConstructCategoryPopup);
