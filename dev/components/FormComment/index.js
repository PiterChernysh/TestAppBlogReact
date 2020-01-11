import React, { useState } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

import Button from "../Button";
import styles from "./style.css";
import { updateComments, addComments } from "../../actions/comments";

const CommentForm = ({
  comment,
  idPost,
  type,
  userActive,
  showEditComment,
}) => {
  const [task, setTask] = useState(type === "edit" ? comment.task : "");

  const dispatch = new useDispatch();

  const idComment = type === "edit" ? comment.id : Date.now();
  const idUser = type === "add" ? userActive.id : comment.idUser;

  const handleChange = e => {
    const { name, value } = e.target;
    setTask(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      id: idComment,
      idUser: idUser,
      idPost: idPost,
      task: task
    };
    if (task != "") {
      if (type === "edit") {
        dispatch(updateComments(data));
      } else if (type === "add") {
        dispatch(addComments(data));
      }
      showEditComment();
      
    }
  };

  return (
    <div className={styles.box0}>
      <h3 className={styles.item__title}>
        {type === "edit" ? "Update comment" : "Add comment"}
      </h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="task">Text comment</label>
        <small>{task != "" ? <br /> : "No task"}</small>
        <input
          type="text"
          name="task"
          id="task"
          value={task}
          onChange={handleChange}
        ></input>
      </form>
      <div className={styles.novigation}>
        {type == "edit" ? (
          <Button handleClick={handleSubmit} theme="edit">
            Update post
          </Button>
        ) : (
          <Button handleClick={handleSubmit}>Add comment</Button>
        )}
        <Button handleClick={showEditComment}>Cancel</Button>
      </div>
    </div>
  );
};

const mapStateToProps = store => ({
  userActive: store.userActive
});

export default connect(mapStateToProps)(CommentForm);
