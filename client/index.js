import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'

import {createStore} from 'redux';
import {Provider} from 'react-redux'

import App from './components/app'
import rootReducer from './reducers'

const store = createStore(rootReducer);

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
