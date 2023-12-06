import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; // install this dependecy fo using store 
import store from "./Store";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(
  // need to mention a provider for using store 
  <Provider store={store}> 
    <App />
  </Provider>,
);
// ReactDOM.render(
//   // need to mention a provider for using store 
//   <Provider store={store}> 
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
