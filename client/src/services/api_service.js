import axios from 'axios'

const getAllProducts = async () => {
  const response = await axios.get('http://localhost:5000/api/products');
  return response.data
}

const apiService = {
  getAllProducts,
}

export default apiService