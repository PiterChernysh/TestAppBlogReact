import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import Error from "../components/Error";
import styles from "./style.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import Post from "../pages/Post";
import Task from "../pages/Task";
import Authorization from "../pages/Authorization";
import Registration from "../pages/Registration";

const Rout = ({ user }) => {
  return (
    <div className={styles.box}>
      <Router>
        <Header
          rout={{
            Home: "/",
            Task: "/task",
            "Sign in": "/authorization",
            "Sign up": "/registration"
          }}
        />
        <div className={styles.boxPages}>
          <h2>
            {JSON.stringify(user) == "{}" ? (
              <a>View mode. Please sign in or sign up. </a>
            ) : (
              <a>User name: {user.name}</a>
            )}
          </h2>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/task" exact component={Task} />
            <Route path="/authorization" exact component={Authorization} />
            <Route path="/registration" exact component={Registration} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="*" component={Error} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

const mapStateToProps = store => ({ user: store.userActive });

export default connect(mapStateToProps)(Rout);
