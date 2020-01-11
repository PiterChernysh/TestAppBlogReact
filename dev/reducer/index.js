import { combineReducers } from "redux";

import user from "./user.js";
import posts from "./posts.js";
import userActive from "./userActive.js";
import comments from "./comments";
import rout from "./rout.js";

const reducer = combineReducers({
  userActive: userActive,
  user: user,
  posts:posts,
  comments:comments,
  rout:rout,
});

export default reducer;
