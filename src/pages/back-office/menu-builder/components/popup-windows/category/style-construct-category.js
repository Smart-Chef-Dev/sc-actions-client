import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import Input from "components/input";
import ErrorText from "components/error-text";
import Button from "components/button";
import { Form } from "components/form";
import { theme } from "theme";

const StyleConstructCategory = ({
  formik,
  heading,
  onToggleHidden,
  translations,
  error,
  buttonName,
}) => {
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
            {buttonName}
          </Button>
        </Flex>
      </Flex>
    </Form>
  );
};

StyleConstructCategory.propTypes = {
  formik: PropTypes.object,
  heading: PropTypes.string,
  onToggleHidden: PropTypes.func,
  translations: PropTypes.object,
  error: PropTypes.bool,
  buttonName: PropTypes.string,
};

export default memo(StyleConstructCategory);
