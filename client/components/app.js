import React from 'react'
import { connect } from 'react-redux'
import { increment, decrement } from '../actions'

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement())
  }
}

const component = ({ state, increment, decrement }) => (
  <div>
    <h1>Hello</h1>
    <p>
      <a href="#" onClick={e => {
        e.preventDefault();
        decrement();
      }}>
      Decrement
      </a>
      { " " }
      <a href="#" onClick={e => {
        e.preventDefault();
        increment();
      }}>
      Increment
      </a>
    </p>
    <p>{state.counter.count}</p>
  </div>
)

const App = connect(mapStateToProps, mapDispatchToProps)(component)

export default App
