import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'

import {createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux'

import App from './components/app'
import rootReducer from './reducers'


const remoteMiddleware = socket => store => next => action => {

  if (action.meta && action.meta.remote)
    socket.emit('action', action);

  next(action);
}



var socket = new WebSocket("ws://localhost:8090");
socket.onopen = () => console.log("opened");
socket.onclose = () => console.log("closed");

const createStoreWithMiddelware = applyMiddleware(remoteMiddleware(socket))(createStore);
const store = createStoreWithMiddelware(rootReducer);


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
