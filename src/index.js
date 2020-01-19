import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
require('dotenv').config({path: __dirname + '/.env'})


// const dotenv = require('dotenv');
 // call dotenv and it will return an Object with a parsed key 
//  const env = dotenv.config().parsed;
//  console.log(env);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
