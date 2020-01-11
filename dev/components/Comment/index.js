import React, { useState } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

import Icon from "../Icon";
import Button from "../Button";
import styles from "./style.css";
import FormComment from "../FormComment";
import { removeComments } from "../../actions/comments";

const Comment = ({ users, comment, idPost, userActive, setItemEdit }) => {
  const [isShowForm, setIsShowForm] = useState(false);

  const dispatch = new useDispatch();

  const userPostValidControl = () => {
    if (JSON.stringify(userActive) == "{}") return false;
    else {
      if (comment.idUser == userActive.id) return true;
      else return false;
    }
  };

  let validUser = userPostValidControl();

  const showEditComment = () => {
    setIsShowForm(!isShowForm);
    setItemEdit();
  };

  const remove = () => {
    dispatch(removeComments(comment.id));
    setItemEdit();
  };

  return (
    <li className={styles.item}>
      {isShowForm ? (
        <>
          <header className={styles.item__head}>
            <h3 className={styles.item__title}>Update comment</h3>
            {validUser ? (
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
              </div>
            ) : (
              ""
            )}
          </header>
          <FormComment
            comment={comment}
            idPost={idPost}
            type="edit"
            showEditComment={showEditComment}
          />
        </>
      ) : (
        <>
          <header className={styles.item__head}>
            <h3 className={styles.item__title}>"Comment"</h3>
            {validUser ? (
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
              </div>
            ) : (
              ""
            )}
          </header>
          <h3 className={styles.item__task}>Task: {comment.task}</h3>
          {JSON.stringify(userActive) != "{}" ? (
            <>
              <h3 className={styles.item__task}>
                Author: {users[comment.idUser].name}{" "}
              </h3>
              <h3 className={styles.item__task}>
                Email: {users[comment.idUser].email}{" "}
              </h3>
            </>
          ) : (
            ""
          )}
        </>
      )}
    </li>
  );
};

const mapStateToProps = store => ({
  users: store.user,
  userActive: store.userActive
});

export default connect(mapStateToProps)(Comment);
