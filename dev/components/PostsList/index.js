import React, { useState } from "react";
import { connect } from "react-redux";

import PostItem from "../PostItem";
import Button from "../Button";
import styles from "./style.css";
import Form from "../Form";

const List = ({ users, posts, userActive }) => {
  const [showForm, setShowForm] = useState(false);

  const activeUser = () => {
    if (JSON.stringify(userActive) == "{}") return false;
    else return true;
  };
  
  const changeShowForm = () => {
    setShowForm(!showForm);
  };
  const active = activeUser();
  let dataList = [];
  for (let key in posts) {
    dataList.push(posts[key]);
  }
  return (
    <div className={styles.box}>
      <ul className={styles.list}>
        {active && showForm == false ? (
          <Button handleClick={() => changeShowForm()}>Add post</Button>
        ) : (
          ""
        )}
        {showForm ? <Form type={"add"} changeShowForm={changeShowForm} /> : ""}
        {dataList.map(item => {
          return <PostItem key={item.id} item={item} author={users[item.idUser]} />;
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = store => ({
  users: store.user,
  posts: store.posts,
  userActive: store.userActive
});

export default connect(mapStateToProps)(List);
