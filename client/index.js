import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'

import {createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux'

import App from './components/app'
import rootReducer from './reducers'


const remoteMiddleware = store => next => action => {
  console.log("remoteMiddleware", action);
  next(action);
}

const createStoreWithMiddelware = applyMiddleware(remoteMiddleware)(createStore);
const store = createStoreWithMiddelware(rootReducer);

var socket = new WebSocket("ws://localhost:8090");

socket.onopen = () => console.log("opened");
socket.onclose = () => console.log("closed");

socket.onmessage = (e) => {
  var state = JSON.parse(e.data);

  store.dispatch({ type: "SET_STATE", state});
}


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
