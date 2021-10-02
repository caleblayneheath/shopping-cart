import apiService from "../../services/api_service"

const CART_RECEIVED = 'CART_RECEIVED'
const CART_UPDATED = 'CART_UPDATED'
const CART_CHECKED_OUT = 'CART_CHECKED_OUT'

const cartReducer = ((state = [], action) => {
  switch (action.type) {
    case CART_RECEIVED: {
      return state.concat(action.data)
    }
    case CART_UPDATED: {
      const oldCartItem = state.find(item => item.productId === action.data.productId)

      if (oldCartItem) {
        const newCartItem = {...oldCartItem, quantity: action.data.quantity}
        state = state.map(cartItem => cartItem.productId === newCartItem.productId ? newCartItem : cartItem)
      } else {
        state = state.concat(action.data)
      }
      return state
    }
    case CART_CHECKED_OUT: {
      state = []
      return state
    }
    default: {
      return state
    }
  }
})

export const createInitialCart = () => {
  return async dispatch => {
    try {
      const data = await apiService.getCart()
      dispatch({
        type: CART_RECEIVED,
        data: data
      })
    } catch (e) {
      console.log(e);
    }
  }
}

export const createCheckout = () => {
  return async dispatch => {
    try {
      await apiService.checkoutCart() 
      dispatch({
        type: CART_CHECKED_OUT,
      }) 
    } catch (e) {
      console.error(e);
    }
  }
}

export const createAddToCart = (product, quantity, callback) => {
  return async dispatch => {
    try {
      if (quantity <= 0) {
        return
      }
      
      const data = await apiService.addToCart(product)
      dispatch({
        type: CART_UPDATED,
        data: data,
      })
      if (callback) {
        callback()
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export default cartReducer
