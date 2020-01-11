import commentJson from "../data/comments.json";
const reducer = (comments = commentJson, { type, payload }) => {

  switch (type) {
    case "REMOVE_COMMENTS":
      delete comments[payload];
      return comments;
    case "UPDATE_COMMENTS":
      comments[payload.id] = payload;
      return comments;
    case "ADD_COMMENTS":
      let comment = [payload].reduce((prev, next) => {
        prev[next.id] = next;
        return prev;
      }, {});
      return {...comment, ...comments};
    default:
      return comments;
  }
};

export default reducer;
