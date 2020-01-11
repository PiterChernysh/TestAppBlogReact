import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Comment from "../Comment";
import FormComment from "../FormComment";
import Button from "../Button";
import styles from "./style.css";

const CommentList = ({ match, idPost, commentList, userActive }) => {
  const [showForm, setShowForm] = useState(false);
  const [itemEdit, setEditItem] = useState(false);
  
  
  const setItemEdit = ()=>{
    setEditItem(!itemEdit);
  }

  const activeUser = () => {
    if (JSON.stringify(userActive) == "{}") return false;
    else return true;
  };

  const showEditComment = () => {
    setShowForm(!showForm);
  };
  const active = activeUser();
  let dataList = [];
  for (let key in commentList) {
    if (commentList[key].idPost == idPost) dataList.push(commentList[key]);
  }
  return (
    <>
      {active ? (
        !showForm ? (
          <Button handleClick={showEditComment}>Add comment</Button>
        ) : (
          <FormComment
            idPost={idPost}
            type="add"
            showEditComment={showEditComment}
          />
        )
      ) : (
        ""
      )}
      <ul className={styles.list}>
        {dataList.map(item => {
          return (
            <Comment
              key={item.id}
              comment={item}
              idPost={idPost}
              type={"show"}
              setItemEdit={setItemEdit}
            />
          );
        })}
      </ul>
    </>
  );
};

const mapStateToProps = store => ({
  commentList: store.comments,
  userActive: store.userActive
});

export default connect(mapStateToProps)(CommentList);
