import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'

import {createStore} from 'redux';
import {Provider} from 'react-redux'

import io from 'socket.io-client'
import App from './components/app'


const socket = io(`${location.protocol}//${location.hostname}:8090`);


const store = createStore((state = {}, action) => {
  switch (action.type) {

    case 'SET_STATE':
      return state.merge(action.state);

    default:
      return state
  }
});


socket.on('state', state =>
  store.dispatch({type: 'SET_STATE', state})
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
