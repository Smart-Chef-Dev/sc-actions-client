import { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { FormikProvider } from "formik";
import { styled } from "@linaria/react";

import { Flex } from "components/flex";
import { Text } from "components/text";
import Input from "components/input";
import { Checkbox } from "components/checkbox";
import Textarea from "components/textarea";
import UploadPhotoComponent from "../../upload-photo-component";
import PopupWindowControlButton from "../popup-window-control-button";
import { Form } from "components/form";
import ErrorText from "components/error-text";
import { theme } from "theme";
import AddonsMultiselect from "./addons-multiselect";
import CategoriesSelect from "./categories-select";

const StyleEditMenuItem = ({
  formik,
  onToggleHidden,
  categories,
  translations,
  heading,
  error,
}) => {
  const restaurantId = useMemo(
    () => categories[0].restaurant._id,
    [categories]
  );

  const handleChange = useCallback(
    (fieldName) => (e) => {
      formik.setFieldValue(fieldName, e);
    },
    [formik]
  );

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
          <Text
            fontWeight="bold"
            fontSize={theme.fontSize(2)}
            mb={theme.spacing(1)}
          >
            {heading}
          </Text>
          <Flex mb={theme.spacing(1)}>
            <UploadPhotoComponent
              error={formik.errors?.pictureUrl && formik.touched.pictureUrl}
              restaurantId={restaurantId}
              onFieldValue={formik.setFieldValue}
              pictureUrl={formik.values["pictureUrl"]}
              nameValue="pictureUrl"
            />
          </Flex>

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
              <s.DescriptionInformation
                fontSize={theme.fontSize(0)}
                color={formik.errors.description ? "var(--error)" : ""}
              >
                {translations["maximum_characters"]}
              </s.DescriptionInformation>
            </Flex>
          </Flex>
          <Flex width={1} justifyContent="center">
            {error?.status === 403 && (
              <s.ErrorText>
                {translations["item_with_the_same_name_already_exists"]}
              </s.ErrorText>
            )}
          </Flex>
          <Flex width={1} mt={theme.spacing(3)}>
            <PopupWindowControlButton
              onToggleHidden={onToggleHidden}
              translations={translations}
              buttonName={translations["create"]}
            />
          </Flex>
        </Flex>
      </Form>
    </FormikProvider>
  );
};

const s = {
  DescriptionInformation: styled(Text)`
    position: absolute;
    bottom: 0;
  `,
  ErrorText: styled(ErrorText)`
    position: absolute;
  `,
};

StyleEditMenuItem.propTypes = {
  formik: PropTypes.object,
  onToggleHidden: PropTypes.func,
  onPictureFile: PropTypes.func,
  categories: PropTypes.array,
  translations: PropTypes.object,
  isPreviewError: PropTypes.bool,
  heading: PropTypes.string,
  error: PropTypes.bool,
};

export default memo(StyleEditMenuItem);
