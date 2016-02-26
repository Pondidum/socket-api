import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'

import {createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux'

import App from './components/app'

import { setState } from './actions'
import rootReducer from './reducers'
import remoteMiddleware from './infrastructure/remoteMiddleware'



var socket = new WebSocket(`ws://${location.hostname}:8090`);
socket.onopen = () => console.log("opened");
socket.onclose = () => console.log("closed");

const createStoreWithMiddelware = applyMiddleware(remoteMiddleware(socket))(createStore);
const store = createStoreWithMiddelware(rootReducer);


socket.onmessage = (e) => {
  var state = JSON.parse(e.data);
  store.dispatch(setState(state));
}


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
