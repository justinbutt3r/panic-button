import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

const head = document.getElementsByTagName("head")[0];
const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`;
head.appendChild(script);

const interval = setInterval(() => {
  if (window.google.maps) {
    clearInterval(interval);
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById("root")
    );
  }
}, 1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
