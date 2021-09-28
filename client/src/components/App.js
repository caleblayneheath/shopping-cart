import axios from 'axios';
import React, {useState, useEffect} from "react";

import Header from './Header';
import ProductAddForm from "./ProductAddForm";
import ProductListings from "./ProductListings";

const test = [
  {
    id: 1,
    title: 'Amazon Kindle E-reader',
    quantity: 5,
    price: 79.99
  },
  {
    id: 2,
    title: 'Apple 10.5-Inch iPad Pro',
    quantity: 3,
    price: 649.99
  },
  {
    id: 3,
    title: 'Yamaha Portable Keyboard',
    quantity: 2,
    price: 155.99
  },
  {
    id: 4,
    title: 'Tinker, Tailor, Soldier, Spy - A John le Carre Novel',
    quantity: 12,
    price: 13.74
  }
];

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  const handleSubmit = async (newProduct, callback) => {
    try {
      const response = await axios.post('http://localhost:5000/api/products', newProduct)
      const data = response.data
      setProducts([...products, data])
      if (callback) {
        callback()
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleDelete = async (id, callback) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/products/${id}`)
      console.log(response);
      setProducts(products.filter(({_id}) => _id !== id))
      if (callback) {
        callback()
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get('http://localhost:5000/api/products');
      const data = response.data
      if (data.length > 0) {
        setProducts(data)
      } else {
        console.log('No products on the server')
      }
    }
    getProducts()
  }, [])

  return (
    <div id="app">
      <Header cart={cart}/>
      <main>
        <ProductListings products={products} onDelete={handleDelete}/>
        <ProductAddForm onSubmit={handleSubmit}/>
      </main>
    </div>
  );
};

export default App;
