export const setUserActive = user => ({
  type: "SET_USER_ACTIVE",
  payload: user
});

export const resetUserActive = user => ({
  type: "RESET_USER_ACTIVE",
  payload: user
});
