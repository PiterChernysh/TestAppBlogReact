const reducer = (rout = { next: "/", prev: "/" }, { type, payload }) => {
  switch (type) {
    case "SET_ROUT_NEXT":
      rout.prev = rout.next;
      rout.next = payload;
      return rout;
    case "SET_ROUT_PREV":
      rout.next = rout.prev;
      rout.prev = payload;
      return rout;
    default:
      return rout;
  }
};

export default reducer;
