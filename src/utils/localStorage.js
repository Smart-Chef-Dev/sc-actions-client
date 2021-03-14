export const Keys = {
  BLOCK_SCREEN: "blockScreen",
  CURRENT_LANGUAGE: "currentLanguage",
  THEME: "theme",
};

export const getOrDefault = (key, defaultValue) => {
  return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
};
1;
