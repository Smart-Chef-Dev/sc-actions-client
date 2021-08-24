import * as Yup from "yup";

export const ConstructorMenuItemScheme = (translations) => {
  return Yup.object().shape({
    name: Yup.string().required(translations["required"]),
    description: Yup.string().max(200),
    price: Yup.number()
      .min(0, translations["min_price"])
      .max(999999, translations["max_price"])
      .required(translations["required"]),
    toggleTime: Yup.boolean(),
    time: Yup.number().when("toggleTime", {
      is: true,
      then: Yup.number()
        .required(translations["required"])
        .min(1, translations["min_time"]),
    }),
    toggleWeight: Yup.boolean(),
    weight: Yup.number().when("toggleWeight", {
      is: true,
      then: Yup.number()
        .required(translations["required"])
        .min(1, translations["min_weight"]),
    }),
    picture: Yup.string().required(translations["required"]),
  });
};
