const cartReducer = ((state = [], action) => {
  switch (action.type) {
    case 'CART_RECEIVED': {
      return state.concat(action.data)
    }
    case 'CART_UPDATED': {
      const oldCartItem = state.find(item => item.productId === action.data.productId)

      if (oldCartItem) {
        const newCartItem = {...oldCartItem, quantity: action.data.quantity}
        state = state.map(cartItem => cartItem.productId === newCartItem.productId ? newCartItem : cartItem)
      } else {
        state = state.concat(action.data)
      }
      return state
    }
    case 'CART_CHECKED_OUT': {
      state = []
      return state
    }
    default: {
      return state
    }
  }
})

export default cartReducer
