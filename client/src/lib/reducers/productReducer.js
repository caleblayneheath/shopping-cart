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

export default productReducer