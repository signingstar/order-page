const users = (state = [], {type, params}) => {

  let index, newState
  switch (type) {
    case 'ADD_USER':
      if(!params) return state

      newState = state.slice()
      index = newState.findIndex(user => user.email ===  params.email)

      if(index > -1) {
        newState[index] = params
      } else {
        newState.push(params)
      }

      return newState

    case 'DELETE_USER':
      if(!params) return state

      newState = state.slice()
      index = newState.findIndex(user => user.email ===  params.email)

      if(index > -1) {
        newState.splice(index, 1)
      }

      return newState

    default:
      return state
  }
}

export default users
