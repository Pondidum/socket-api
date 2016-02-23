import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({
      meta: { remote: true },
      type: "INCREMENT"
    })
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
