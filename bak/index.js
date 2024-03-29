import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "../src/serviceWorker";

const app = <App />;

ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();
