import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "../../components/Button";
import styles from "./style.css";
import { validNameEmail } from "../../validation/registration.js";
import { createUser } from "../../actions/user";
import { setUserActive } from "../../actions/userActive";

const Registration = ({ item, type, list }) => {
  const [name, setName] = useState(item ? item.name : "");
  const [email, setEmail] = useState(item ? item.email : "");
  const [password, setPassword] = useState(item ? item.password : "");
  const [exist, setExist] = useState("no");

  const history = useHistory();
  const dispatch = new useDispatch();

  const home = () => {
    history.push("/");
  };
  const create = data => dispatch(createUser(data));
  const setActive = user => dispatch(setUserActive(user));
  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        return setName(value);
      case "email":
        return setEmail(value);
      default:
        return setPassword(value);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      id: item ? item.id : Date.now(),
      name: name,
      email: email,
      password: password,
      status: "true",
    };
    if (email != "" && password != "") {
      let item = validNameEmail(data, list);
      setExist(item.name);
      if (item.name === "no") {
        setActive(data);
        create(data);
        clearForm();
        home();
      }
    }
  };
  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setExist("no");
  };

  return (
    <div className={styles.box0}>
      <div className={styles.box}>
        {type != "update" ? <h1>Registration</h1> : <h1>Update profile</h1>}
        <form
          className={`${styles.form} ${styles.type ? styles.type : ""}`}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name"> Name </label>
          <small>{name != "" ? <br /> : "No name"}</small>
          <small>
            {exist === "name"
              ? "user with this name exists, enter another name"
              : ""}
          </small>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <label htmlFor="email"> Login </label>
          <small>{email != "" ? <br /> : "No email"}</small>
          <small>
            {exist === "email"
              ? "user with this email exists, enter another name"
              : ""}
          </small>
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
          <div className={styles.novigation}>
            <Button>Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = store => ({ list: store.user });

export default connect(mapStateToProps)(Registration);
