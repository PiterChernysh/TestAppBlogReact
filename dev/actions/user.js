export const removeUser = id => ({
  type: "REMOVE_USER",
  payload: id
});

export const updateUser = user => ({
  type: "UPDATE_USER",
  payload: user
});

export const createUser = user => ({
  type: "CREATE_USER",
  payload: user
});

export const createAllUser = user => ({
  type: "CREATE_ALL_USER",
  payload: user
});
