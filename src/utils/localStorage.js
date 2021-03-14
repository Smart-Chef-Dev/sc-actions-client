export const Keys = {
  BLOCK_SCREEN: "blockScreen",
};

export const getOrDefault = (key, defaultValue) => {
  return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
};
1;
