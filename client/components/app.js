import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const component = ({ state }) => (
  <div>
    <h1>Hello</h1>
    <p>{state.counter.count}</p>
  </div>
)

const App = connect(mapStateToProps)(component)

export default App
