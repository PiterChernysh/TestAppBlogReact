import postsJson from "../data/posts.json";

// let data = localStorage.getItem("postsList");
// let postsLocal = data ? JSON.parse(data) : {};
// let postsList = !JSON.stringify(postsLocal) == "{}" ? postsLocal : postsJson;
// if (data) localStorage.setItem("postsList", JSON.stringify(postsList));
const reducer = (posts = postsJson, { type, payload }) => {

  switch (type) {
    case "REMOVE_POST":
      delete posts[payload];
      return posts;
    case "UPDATE_POST":
      posts[payload.id] = payload;
      return posts;
    case "ADD_POST":
      let post = [payload].reduce((prev, next) => {
        prev[next.id] = next;
        return prev;
      }, {});
      return {...post, ...posts};
    default:
      return posts;
  }
};

export default reducer;
