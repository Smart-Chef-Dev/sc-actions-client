import * as Yup from "yup";

export const ConstructorAddonScheme = (translations) => {
  return Yup.object().shape({
    name: Yup.string().required(translations["required"]),
    price: Yup.number().required(translations["required"]),
  });
};
