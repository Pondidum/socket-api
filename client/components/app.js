import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTodoClick: (id) => {
//       dispatch(toggleTodo(id))
//     }
//   }
// }

const component = ({ state }) => (
  <div>
    <h1>Hello</h1>
    <p>{state.name}</p>
  </div>
)

const App = connect(mapStateToProps)(component)

export default App
