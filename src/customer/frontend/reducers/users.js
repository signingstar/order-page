const users = (state = [], {type, params}) => {
  switch (type) {
    case 'ADD_USER':
      const newState = state.slice()
      newState.push(params)
      return newState

    default:
      return state
  }
}

export default users
