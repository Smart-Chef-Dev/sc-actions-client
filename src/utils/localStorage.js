export const Keys = {
  BLOCK_SCREEN: "blockScreen",
  ATTEMPTS_COUNT: "AttemptsCount",
  LOCK_COUNT: "LockCount",
  FIRST_ATTEMPT_TIME: "FirstAttemptTime",
};

export const getOrDefault = (key, defaultValue) => {
  return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
};
1;
