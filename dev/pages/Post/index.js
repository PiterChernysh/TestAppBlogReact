import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import Form from "../../components/Form";
import Icon from "../../components/Icon";
import Button from "../../components/Button";
import styles from "./style.css";
import { removePost } from "../../actions/posts";
import CommentList from "../../components/CommentList";

const Item = ({ match, users, posts, userActive }) => {
  const [isShowForm, setIsShowForm] = useState(false);
  const [isShowFillPost, setIsShowFillPost] = useState(false);

  useEffect(() => {
    setIsShowForm(false);
  }, [item]);

  const history = useHistory();

  const idPost = match.params.id;
  const item = posts[idPost];

  const dispatch = new useDispatch();

  const authorName = users[item.idUser].name;
  const authorStatus = users[item.idUser].status;

  const home = () => {
    history.push("/");
  };
  const userPostValidControl = () => {
    if (JSON.stringify(userActive) == "{}") return false;
    else {
      if (posts[idPost].idUser == userActive.id) return true;
      else return false;
    }
  };
  let validUser = userPostValidControl();
  const remove = () => {
    dispatch(removePost(idPost));
    home();
  };
  const changeShowForm = () => {
    setIsShowForm(false);
  };
  return (
    <div className={styles.box}>
      <div className={styles.post}>
        {isShowForm ? (
          <div className={styles.item}>
            <header className={styles.item__head}>
              <h3 className={styles.item__title}>Update post</h3>
              <div className={styles.item__action}>
                <Button
                  theme="small"
                  handleClick={() => setIsShowForm(!isShowForm)}
                >
                  <Icon name="noEdit" />
                </Button>
                <Button theme="small" handleClick={() => remove()}>
                  <Icon name="delete" />
                </Button>
                <Button theme="small" handleClick={() => home()}>
                  Home
                </Button>
              </div>
            </header>
            <Form type="edit" item={item} changeShowForm={changeShowForm} />
          </div>
        ) : (
          <div className={styles.item}>
            <div
              className={styles.item__title}
              onClick={() => setIsShowFillPost(!isShowFillPost)}
            >
              <header className={styles.item__head}>
                <h3 className={styles.item__title}>{item.title}</h3>
                <div className={styles.item__action}>
                  {validUser ? (
                    <>
                      <Button
                        theme="small"
                        handleClick={() => setIsShowForm(!isShowForm)}
                      >
                        <Icon name="edit" />
                      </Button>
                      <Button theme="small" handleClick={() => remove()}>
                        <Icon name="delete" />
                      </Button>
                    </>
                  ) : (
                    ""
                  )}
                  <Button theme="small" handleClick={() => home()}>
                    Home
                  </Button>
                </div>
              </header>
              <img
                className={styles.image}
                src={item.content.img}
                onClick={() => home()}
              />
              <h3 className={styles.item__task}>{item.content.task}</h3>
              <h3 className={styles.item__task}>Author: {authorName} </h3>
              <h3 className={styles.item__task}>
                Status: {authorStatus === "true" ? "Online" : "Offline"}
              </h3>
            </div>
          </div>
        )}
        <CommentList idPost={idPost} />
      </div>
    </div>
  );
};
const mapStateToProps = store => ({
  users: store.user,
  posts: store.posts,
  userActive: store.userActive,
});

export default connect(mapStateToProps)(Item);
