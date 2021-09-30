const cartReducer = ((state = [], action) => {
  switch (action.type) {
    case 'CART_RECEIVED': {
      return state.concat(action.data)
    }
    default: {
      return state
    }
  }
})

export default cartReducer
