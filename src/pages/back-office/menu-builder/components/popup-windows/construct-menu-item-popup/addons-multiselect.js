import { memo, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import PropTypes from "prop-types";

import SelectComponent from "components/select";
import AddAddonPopup from "../add-addon-popup";
import { useConfirmationPopup } from "hooks/useConfirmationPopup";
import { getRestaurantAddons } from "services/addonsService";

const AddonsMultiselect = ({ restaurantId, translations, formik }) => {
  const addons = useQuery(["addons", { restaurantId }], getRestaurantAddons);

  const addAddonPopup = useConfirmationPopup(AddAddonPopup, "900px", "550px", {
    restaurantId,
    translations,
  });

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

  return (
    <>
      {addAddonPopup.renderNotification()}
      <SelectComponent
        placeholder=""
        options={addonOptions}
        name="addons"
        value={formik.values["addons"]}
        onFieldValue={formik.setFieldValue}
        label={translations["apply_add_ons"]}
        translations={translations}
        isMultiSelect={true}
      />
    </>
  );
};

AddonsMultiselect.propTypes = {
  restaurantId: PropTypes.string,
  translations: PropTypes.object,
  formik: PropTypes.object,
};

export default memo(AddonsMultiselect);
