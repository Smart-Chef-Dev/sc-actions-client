import * as Yup from "yup";

export const ConstructorAddonScheme = Yup.object().shape({
  name: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
});
