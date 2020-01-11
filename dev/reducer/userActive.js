const reducer = (userActive = {}, { type, payload }) => {
  switch (type) {
    case "SET_USER_ACTIVE":
      return (userActive = payload);
    case "RESET_USER_ACTIVE":
      return (userActive = {});
    default:
      return userActive;
  }
};

export default reducer;
