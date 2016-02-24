import React from 'react'
import { connect } from 'react-redux'
import { increment } from '../actions'

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(increment())
  }
}

const component = ({ state, increment }) => (
  <div>
    <h1>Hello</h1>
    <p>{state.counter.count}</p>
      <p><a href="#" onClick={e => {
        e.preventDefault();
        increment();
      }}>
      Increment please.
      </a>
    </p>
  </div>
)

const App = connect(mapStateToProps, mapDispatchToProps)(component)

export default App
