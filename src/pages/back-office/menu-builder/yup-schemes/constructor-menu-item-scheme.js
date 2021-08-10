import * as Yup from "yup";

export const ConstructorMenuItemScheme = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().max(200),
  price: Yup.number()
    .min(0, "The price cannot be menu less than zero")
    .max(999999, "The price cannot be more than 999999")
    .required("Required"),
  toggleTime: Yup.boolean(),
  time: Yup.number().when("toggleTime", {
    is: true,
    then: Yup.number().required("Required"),
  }),
  toggleWeight: Yup.boolean(),
  weight: Yup.number().when("toggleWeight", {
    is: true,
    then: Yup.number().required("Required"),
  }),
});
