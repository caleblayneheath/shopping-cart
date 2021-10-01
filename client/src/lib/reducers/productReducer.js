import axios from 'axios'
import apiService from '../../services/api_service'

const productReducer = ((state = [], action) => {
  switch (action.type) {
    case 'PRODUCTS_RECEIVED': {
      return state.concat(action.data)
    }
    case 'PRODUCT_DELETED': {
      return state.filter(product => product._id !== action.data)
    }
    case 'PRODUCT_ADDED': {
      return state.concat(action.data)
    }
    case 'PRODUCT_UPDATED': {
      return state.map(product => product._id === action.data._id ? action.data : product)
    }
    default: {
      return state
    }
  }
})

export const createInitialProducts = () => {
  return async dispatch => {
    const data = await apiService.getAllProducts()
    dispatch({
      type: 'PRODUCTS_RECEIVED',
      data: data
    })
  }
}

export default productReducer