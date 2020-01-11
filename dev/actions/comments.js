export const removeComments = id => ({
  type: "REMOVE_COMMENTS",
  payload: id
});

export const updateComments = user => ({
  type: "UPDATE_COMMENTS",
  payload: user
});

export const addComments = user => ({
  type: "ADD_COMMENTS",
  payload: user
});
