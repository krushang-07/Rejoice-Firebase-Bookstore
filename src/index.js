import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import FirebaseContext from "./context/FirebaseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FirebaseContext>
    <App />
  </FirebaseContext>
);
