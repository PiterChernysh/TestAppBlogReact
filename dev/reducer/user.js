import userJson from "../data/usersData.json";

let data = localStorage.getItem("userList");
let userLocal = data ? JSON.parse(data) : {};
let userList = !JSON.stringify(userLocal) == "{}" ? userLocal : userJson;
if (data) localStorage.setItem("userList", JSON.stringify(userList));
const reducer = (users = userList, { type, payload }) => {
  switch (type) {
    case "REMOVE_USER":
      return delete users[payload];
    case "UPDATE_USER":
      delete users[payload.id];
      users[payload.id] = payload;
      return users;
    case "CREATE_USER":
      users[payload.id] = payload;
      return users;
    default:
      return users;
  }
};

export default reducer;
