import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "../Button";
import styles from "./style.css";
import { updatePost, addPost } from "../../actions/posts";

const Form = ({ item, type, userActive, changeShowForm }) => {
  const [title, setTitle] = useState(item ? item.title : "");
  const [img, setImg] = useState(item ? item.content.img : "");
  const [task, setTask] = useState(item ? item.content.task : "");
  const [idUser, setIdUser] = useState(userActive.id);

  const history = useHistory();
  const dispatch = new useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else {
      setTask(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      id: type === "edit" ? item.id : item ? item.id : Date.now(),
      idUser: idUser,
      title: title,
      content: {
        img: img,
        task: task
      }
    };
    if (title != "" && task != "" && img != "") {
      if (type === "edit") {
        dispatch(updatePost(data));
        changeShowForm();
      } else {
        dispatch(addPost(data));
        changeShowForm();
      }
      clearForm();
    }
  };

  const fileSelectedHandler = event => {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      setImg(e.target.result);
    };
  };

  const clearForm = () => {
    setTitle("");
    setImg("");
    setTask("");
  };

  return (
    <div className={styles.box0}>
      <form
        className={`${styles.form}  ${styles.type ? styles.type : ""}`}
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Title post </label>
        <small>{title != "" ? <br /> : "No title"}</small>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <label htmlFor="task">Image posts</label>
        <input type="file" onChange={fileSelectedHandler}></input>
        <img className={styles.image} src={img} />
        <label htmlFor="task">Text posts</label>
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
          <Button  handleClick={handleSubmit} theme="edit">Update post</Button>
        ) : (
          <Button  handleClick={handleSubmit}>Add post</Button>
        )}
        <Button handleClick={() => changeShowForm()}>Cancel</Button>
      </div>
    </div>
  );
};

const mapStateToProps = store => ({
  userActive: store.userActive
});

export default connect(mapStateToProps)(Form);
