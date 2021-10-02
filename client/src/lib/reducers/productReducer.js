import apiService from '../../services/api_service'

const PRODUCTS_RECEIVED = 'PRODUCTS_RECEIVED'
const PRODUCT_DELETED = 'PRODUCT_DELETED'
const PRODUCT_ADDED = 'PRODUCT_ADDED'
const PRODUCT_UPDATED = 'PRODUCT_UPDATED'

const productReducer = ((state = [], action) => {
  switch (action.type) {
    case PRODUCTS_RECEIVED: {
      return state.concat(action.data)
    }
    case PRODUCT_DELETED: {
      return state.filter(product => product._id !== action.data)
    }
    case PRODUCT_ADDED: {
      return state.concat(action.data)
    }
    case PRODUCT_UPDATED: {
      return state.map(product => product._id === action.data._id ? action.data : product)
    }
    default: {
      return state
    }
  }
})

export const createInitialProducts = () => {
  return async dispatch => {
    try {  
      const data = await apiService.getAllProducts()
      dispatch({
        type: PRODUCTS_RECEIVED,
        data: data
      })
    } catch (e) {
      console.log(e);
    }
  }
}

export const createProductUpdate = (id, updateObj, callback) => {
  return async dispatch => {
    try {
      const data = await apiService.updateProduct(id, updateObj)
      dispatch({
        type: PRODUCT_UPDATED,
        data: data
      })
      if (callback) {
        callback()
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export const createProductDelete = (id, callback) => {
  return async dispatch => {
    try {
      await apiService.deleteProduct(id) 
      dispatch({
        type: PRODUCT_DELETED,
        data: id
      })
      if (callback) {
        callback()
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default productReducer