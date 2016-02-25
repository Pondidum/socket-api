export const increment = () => {
  return {
    meta: { remote: true },
    type: "INCREMENT"
  }
}

export const decrement = () => {
  return {
    meta: { remote: true },
    type: "DECREMENT"
  }
}

export const setState = (state) => {
  return {
    type: "SET_STATE",
    state: state
  }
}
