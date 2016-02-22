import expect from 'expect'
import * as actions from '../../actions'

describe('todo actions', () => {

  it('addTodo should create ADD_TODO action', () => {
    expect(actions.addTodo('use redux')).toEqual({
      type: "ADD_TODO",
      id: 0,
      text: "use redux"
    })
  })

  it('toggleTodo should create TOGGLE_TODO action', () => {
    expect(actions.toggleTodo(1)).toEqual({
      type: "TOGGLE_TODO",
      id: 1
    })
  })

  it('setVisibilityFilter should create SET_VISIBILITY_FILTER action', () => {
    expect(actions.setVisibilityFilter('active')).toEqual({
      type: 'SET_VISIBILITY_FILTER',
      filter: 'active'
    })
  })

})
