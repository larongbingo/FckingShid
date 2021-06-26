/**
 * Written by Renz Christen Yeomer A. Pagulayan
 */


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
navigator.permissions.query({name: "geolocation"})
.then(data => {
  if (data.state === "denied") {
    alert("You need to allow the app to access your location");
  }
  else {
    require("./MappingShidPenis");
  }
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/**
 * Written by Renz Christen Yeomer A. Pagulayan
 */

