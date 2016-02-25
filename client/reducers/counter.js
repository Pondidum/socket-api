const counter = (state = { count: 0 }, action) => {

  switch (action.type) {

    case "SET_STATE":
      return {
        count: action.state.count,
        lastUpdated: action.state.lastUpdated
      }

    default:
      return state;
  }

}

export default counter
