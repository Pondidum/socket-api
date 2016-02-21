import React from 'react'
import { connect } from 'react-redux'

const App = connect()(({ state }) => (
  <div>
    <h1>Hello</h1>
    <p>{state}</p>
  </div>
))

export default App
