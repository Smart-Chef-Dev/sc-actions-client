import { memo, useCallback, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { FormikProvider } from "formik";
import { useQuery } from "react-query";

import { Flex } from "components/flex";
import { Text } from "components/text";
import Input from "components/input";
import { Checkbox } from "components/checkbox";
import Textarea from "components/textarea";
import Button from "components/button";
import { Form } from "components/form";
import SelectComponent from "components/select-component";
import { theme } from "theme";
import Multiselect from "components/multiselect";
import { useConfirmationPopup } from "hooks/useConfirmationPopup";
import AddAddonPopup from "./add-addon-popup";
import { getRestaurantAddons } from "services/addonsService";
import UploadPhotoComponent from "./upload-photo-component";

const StyleEditMenuItem = ({
  formik,
  onToggleHidden,
  categories,
  translations,
}) => {
  const restaurantId = useMemo(
    () => categories[0].restaurant._id,
    [categories]
  );

  const addons = useQuery(
    ["addons", { restaurantId: restaurantId }],
    getRestaurantAddons
  );

  const addAddonPopup = useConfirmationPopup(AddAddonPopup, "900px", "550px", {
    restaurantId: restaurantId,
    translations,
  });

  const categoryOptions = useMemo(
    () =>
      categories.map((currentCategory) => ({
        value: currentCategory.name,
        label: currentCategory.name,
      })),
    [categories]
  );

  const addonOptions = useMemo(() => {
    if (addons.isLoading) {
      return;
    }

    const addonOptionsTmp = addons.data.map((addon) => ({
      ...addon,
      value: addon.name,
      label: addon.name,
    }));

    return [
      ...addonOptionsTmp,
      {
        value: translations["add_new_addon"],
        label: "add",
        isButton: true,
      },
    ];
  }, [addons, translations]);

  useEffect(() => {
    if (!addonOptions) {
      return;
    }

    const valueOfButtonAdding = addonOptions[addonOptions.length - 1].label;

    const isNewAddonRequested = formik.values["addons"].find(
      (selectedValue) => selectedValue.label === valueOfButtonAdding
    );

    if (isNewAddonRequested) {
      addAddonPopup.showNotification();
      formik.resetForm({
        values: {
          ...formik.values,
          addons: formik.values["addons"].filter(
            (selectedValue) => selectedValue.label !== valueOfButtonAdding
          ),
        },
      });
    }
  }, [formik, addonOptions, addAddonPopup]);

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
        {addAddonPopup.renderNotification()}
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
            {translations["create_item"]}
          </Text>
          <Flex mb={theme.spacing(1)}>
            <UploadPhotoComponent
              error={formik.errors?.pictureUrl}
              restaurantId={restaurantId}
              onFieldValue={formik.setFieldValue}
              pictureUrl={formik.values["pictureUrl"]}
              nameValue="pictureUrl"
            />
          </Flex>

          <Flex height={1} width={1} mb={theme.spacing(3)}>
            <Flex height={1} width={1} mr={theme.spacing(1)} direction="column">
              <Flex width={1} mb={theme.spacing(1)}>
                <Input
                  id="name"
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
                  id="price"
                  type="number"
                  placeholder="0.00"
                  label={translations["price"]}
                  value={formik.values["price"]}
                  onChange={handleChange("price")}
                  error={formik.touched.price ? formik.errors.price : ""}
                />
              </Flex>

              <Flex direction="column" width={1} mb={theme.spacing(1)}>
                <Flex mb={theme.spacing(1)} alignItems="flex-end" width={1}>
                  <Flex mb={theme.spacing(1)} mr={theme.spacing(1)}>
                    <Checkbox type="checkbox" name="toggleTime" />
                  </Flex>
                  <Flex width={1}>
                    <Input
                      id="time"
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
                      id="weight"
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
                <SelectComponent
                  placeholder="Select"
                  options={categoryOptions}
                  name="category"
                  value={formik.values["category"]}
                  onFieldValue={formik.setFieldValue}
                  label={translations["category"]}
                />
              </Flex>

              <Flex direction="column" width={1} mb={theme.spacing(1)}>
                <Multiselect
                  placeholder=""
                  options={addonOptions}
                  name="addons"
                  value={formik.values["addons"]}
                  onFieldValue={formik.setFieldValue}
                  label={translations["apply_add_ons"]}
                  translations={translations}
                />
              </Flex>

              <Flex
                direction="column"
                width={1}
                height={1}
                mb={theme.spacing(1)}
              >
                <Textarea
                  name="description"
                  label={translations["description"]}
                  placeholder={translations["enter_name"]}
                  error={
                    formik.touched.description ? formik.errors.description : ""
                  }
                />
              </Flex>
            </Flex>
          </Flex>

          <Flex width={1} justifyContent="space-between">
            <Button
              type="button"
              onClick={cancelAddingCategory}
              background="var(--text-grey)"
            >
              {translations["cancel"]}
            </Button>
            <Button type="submit">{translations["create"]}</Button>
          </Flex>
        </Flex>
      </Form>
    </FormikProvider>
  );
};

StyleEditMenuItem.propTypes = {
  formik: PropTypes.object,
  onToggleHidden: PropTypes.func,
  onPictureFile: PropTypes.func,
  categories: PropTypes.array,
  translations: PropTypes.object,
  isPreviewError: PropTypes.bool,
};

export default memo(StyleEditMenuItem);
