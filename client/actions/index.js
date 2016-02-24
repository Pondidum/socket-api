export const increment = () => {
  return {
    meta: { remote: true },
    type: "INCREMENT"
  }
}

export const setState = (state) => {
  return {
    type: "SET_STATE",
    state: state
  }
}
