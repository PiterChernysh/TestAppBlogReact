export const removePost = id => ({
  type: "REMOVE_POST",
  payload: id
});

export const updatePost = user => ({
  type: "UPDATE_POST",
  payload: user
});

export const addPost = user => ({
  type: "ADD_POST",
  payload: user
});
