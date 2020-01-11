import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";

import Title from "../Title";
import styles from "./style.css";
import Button from "../Button";
import { resetUserActive } from "../../actions/userActive";
import { updateUser } from "../../actions/user";

const Header = ({rout, userActive }) => {
  const history = useHistory();
  const dispatch = new useDispatch();

  const list = Object.keys(rout);
  const transition = page => {
    if (page != history.location.pathname) history.push(page);
  };
  const resetActiveUser = () => {
    dispatch(resetUserActive({}));
    let userLogOut = userActive;
    dispatch(updateUser(userLogOut));
  };
  const createMenu = () => {
    return list.map(item => {
      return (
        <Button handleClick={() => transition(rout[item])} key={item}>
          {item}
        </Button>
      );
    });
  };
  return (
    <header>
      <Title />
      <nav className={styles.novigation}>
        {createMenu()}
        <Button handleClick={() => resetActiveUser()}>Sign out</Button>{" "}
      </nav>
    </header>
  );
};

const mapStateToProps = store => ({
  userActive: store.userActive
});

export default connect(mapStateToProps)(Header);
