import { combineReducers } from 'redux'

import productReducer from './productReducer'
import cartReducer from './cartReducer'

const reducer = combineReducers({
  products: productReducer,
  cart: cartReducer
})

export default reducer;