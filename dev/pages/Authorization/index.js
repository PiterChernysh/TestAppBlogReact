import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "../../components/Button";
import styles from "./style.css";
import { validNameEmail } from "../../validation/authorization.js";
import { setUserActive } from "../../actions/userActive";

const Authorization = ({ item, type, addFromProps, list }) => {
  const [email, setEmail] = useState(item ? item.email : "");
  const [password, setPassword] = useState(item ? item.password : "");
  const [exist, setExist] = useState(true);

  const history = useHistory();
  const dispatch = new useDispatch();

  const home = () => {
    history.push("/");
  };
  const setActive = user => dispatch(setUserActive(user));
  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      email: email,
      password: password
    };
    if (email != "" && password != "") {
      let item = validNameEmail(data, list);
      setExist(item.exist);
      if (item.exist) {
        let authUser = list[item.id];
        authUser.status = "true";
        setActive(authUser);
        clearForm();
        home();
      }
      setExist(false);
    }
  };
  const clearForm = () => {
    setEmail("");
    setPassword("");
  };
  return (
    <div className={styles.box0}>
      <div className={styles.box}>
        <h1>Authorization</h1>
        <form
          className={`${styles.form} ${styles.type ? styles.type : ""}`}
          onSubmit={handleSubmit}
        >
          {!exist && email != "" && password != "" ? (
            <h3>Login or password do not match</h3>
          ) : (
            ""
          )}
          <label htmlFor="email"> Login </label>
          <small>{email != "" ? <br /> : "No email"}</small>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <small>{password != "" ? <br /> : "No password"}</small>
          <input
            type="password"
            name="password"
            id="password"
            minLength={4}
            maxLength={8}
            size="8"
            value={password}
            onChange={handleChange}
          ></input>
          <Button>LOGIN</Button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = store => ({ list: store.user });

export default connect(mapStateToProps)(Authorization);
