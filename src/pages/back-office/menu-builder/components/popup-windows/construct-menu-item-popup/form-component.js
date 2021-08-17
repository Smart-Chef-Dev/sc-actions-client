import { memo, useCallback } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";

import { Flex } from "components/flex";
import { Text } from "components/text";
import Textarea from "components/textarea";
import { Checkbox } from "components/checkbox";
import Input from "components/input";

import { theme } from "theme";
import CategoriesSelect from "./categories-select";
import AddonsMultiselect from "./addons-multiselect";

const FormComponent = ({ translations, formik, restaurantId, categories }) => {
  const handleChange = useCallback(
    (fieldName) => (e) => {
      formik.setFieldValue(fieldName, e);
    },
    [formik]
  );

  return (
    <>
      <Flex height={1} width={1} mb={theme.spacing(1)}>
        <Flex height={1} width={1} mr={theme.spacing(1)} direction="column">
          <Flex width={1} mb={theme.spacing(1)}>
            <Input
              name="name"
              placeholder={translations["enter_name"]}
              type="string"
              label={translations["name"]}
              value={formik.values["name"]}
              onChange={handleChange("name")}
              error={formik.touched.name ? formik.errors.name : ""}
            />
          </Flex>

          <Flex direction="column" width={1} mb={theme.spacing(1)}>
            <Input
              name="price"
              type="number"
              placeholder="0.00"
              label={translations["price"]}
              value={formik.values["price"]}
              onChange={handleChange("price")}
              error={formik.touched.price ? formik.errors.price : ""}
            />
          </Flex>

          <Flex direction="column" width={1}>
            <Flex mb={theme.spacing(1)} alignItems="flex-end" width={1}>
              <Flex mb={theme.spacing(1)} mr={theme.spacing(1)}>
                <Checkbox type="checkbox" name="toggleTime" />
              </Flex>
              <Flex width={1}>
                <Input
                  name="time"
                  label={translations["time"]}
                  type="number"
                  height="52px"
                  placeholder="0.00"
                  value={formik.values["time"]}
                  onChange={handleChange("time")}
                  disabled={!formik.values["toggleTime"]}
                  error={formik.touched.time ? formik.errors.time : ""}
                />
              </Flex>
            </Flex>

            <Flex alignItems="flex-end" width={1}>
              <Flex mb={theme.spacing(1)} mr={theme.spacing(1)}>
                <Checkbox type="checkbox" name="toggleWeight" />
              </Flex>
              <Flex width={1}>
                <Input
                  name="weight"
                  label={translations["weight"]}
                  type="number"
                  height="52px"
                  placeholder="0.00"
                  value={formik.values["weight"]}
                  onChange={handleChange("weight")}
                  disabled={!formik.values["toggleWeight"]}
                  error={formik.touched.weight ? formik.errors.weight : ""}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex width={1} height={1} ml={theme.spacing(1)} direction="column">
          <Flex direction="column" width={1} mb={theme.spacing(1)}>
            <CategoriesSelect
              categories={categories}
              formik={formik}
              translations={translations}
            />
          </Flex>

          <Flex direction="column" width={1} mb={theme.spacing(1)}>
            <AddonsMultiselect
              translations={translations}
              restaurantId={restaurantId}
              formik={formik}
            />
          </Flex>

          <Flex direction="column" width={1} height={1}>
            <Textarea
              name="description"
              label={translations["description"]}
              placeholder={translations["enter_text"]}
              error={formik.errors.description ?? ""}
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex width={1} mb={theme.spacing(1)}>
        <Flex width={1} mr={theme.spacing(1)} />
        <Flex width={1} ml={theme.spacing(1)} position="relative">
          <DescriptionInformation
            fontSize={theme.fontSize(0)}
            color={formik.errors.description ? "var(--error)" : ""}
          >
            {translations["maximum_characters"]}
          </DescriptionInformation>
        </Flex>
      </Flex>
    </>
  );
};

const DescriptionInformation = styled(Text)`
  position: absolute;
  bottom: 0;
`;

FormComponent.propTypes = {
  translations: PropTypes.object,
  formik: PropTypes.object,
  restaurantId: PropTypes.string,
  categories: PropTypes.array,
};

export default memo(FormComponent);
