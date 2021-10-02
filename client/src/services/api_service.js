import axios from 'axios'

const getAllProducts = async () => {
  const response = await axios.get('http://localhost:5000/api/products');
  return response.data
}

const getCart = async () => {
  const response = await axios.get('http://localhost:5000/api/cart');
  return response.data
}

const checkoutCart = async () => {
  const response = await axios.post(`http://localhost:5000/api/cart/checkout`)
  return response.data
}

const updateProduct = async (id, updateObj) => {
  const response = await axios.put(`http://localhost:5000/api/products/${id}`, updateObj)
  return response.data
}

const addToCart = async (product) => {
  const response = await axios.post(`http://localhost:5000/api/cart`, product)
  return response.data
}

const deleteProduct = async (id) => {
  const response = await axios.delete(`http://localhost:5000/api/products/${id}`)
  return response.data
}

const apiService = {
  getAllProducts,
  getCart,
  checkoutCart,
  updateProduct,
  addToCart,
  deleteProduct
}


export default apiService