import * as Yup from "yup";

export const ConstructorCategoryScheme = (translations) => {
  return Yup.object().shape({
    name: Yup.string().required(translations["required"]),
  });
};
