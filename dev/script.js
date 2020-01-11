import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import styles from "./style.css";

import Router from "./router";

const App = () => {
  return (
    <Provider store={store}>
      <div className={styles.box}>
        <Router />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
