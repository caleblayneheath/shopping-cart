import axios from 'axios';
import React, {useState, useEffect} from "react";

import Header from './Header';
import ProductAddForm from "./ProductAddForm";
import ProductListings from "./ProductListings";

// const test = [
//   {
//     id: 1,
//     title: 'Amazon Kindle E-reader',
//     quantity: 5,
//     price: 79.99
//   },
//   {
//     id: 2,
//     title: 'Apple 10.5-Inch iPad Pro',
//     quantity: 3,
//     price: 649.99
//   },
//   {
//     id: 3,
//     title: 'Yamaha Portable Keyboard',
//     quantity: 2,
//     price: 155.99
//   },
//   {
//     id: 4,
//     title: 'Tinker, Tailor, Soldier, Spy - A John le Carre Novel',
//     quantity: 12,
//     price: 13.74
//   }
// ];

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

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

  useEffect(() => {
    const getCart = async () => {
      const response = await axios.get('http://localhost:5000/api/cart');
      const data = response.data
      if (data.length > 0) {
        setCart(data)
      } else {
        console.log('No products on the server')
      }
    }
    getCart()
  }, [])

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

  const handleEdit = async (id, updateObj, callback) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/products/${id}`, updateObj)
      console.log(response.data);
      setProducts(products.map(product => {
        if (product._id === id) {
          return response.data;
        } else {
          return product;
        }
      }))
      if (callback) {
        callback()
      }
    } catch (e) {
      console.log(e);
    }
  }

  const decrementQuantity = async ({productId}) => {
    try {
      const product = products.find(product => product._id === productId)
      console.log(product);
      let quantity = product.quantity
      const updateObj = { ...product, quantity: quantity - 1 }
      await handleEdit(productId, updateObj)
    } catch (e) {
      console.log(e);
    }
  }

  const handleAddToCart = async (product, quantity, callback) => {
    try {
      if (quantity <= 0) {
        return
      }
      
      await decrementQuantity(product);

      const response = await axios.post(`http://localhost:5000/api/cart`, product)
      const data =  response.data
      const oldCartItem = cart.find(item => item._id === data._id)

      if (oldCartItem) {
        const newCartItem = {...oldCartItem, quantity: data.quantity}
        setCart(cart.map(cartItem => cartItem._id === newCartItem._id ? newCartItem : cartItem))
      } else {
        setCart([...cart, data])
      }
      
      if (callback) {
        callback()
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleCheckout = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/cart/checkout`)
      console.log(response);
      setCart([])
    } catch (e) {

    }
  }

  return (
    <div id="app">
      <Header cart={cart} onCheckout={handleCheckout}/>
      <main>
        <ProductListings products={products} onDelete={handleDelete} onEdit={handleEdit} onAddToCart={handleAddToCart}/>
        <ProductAddForm onSubmit={handleSubmit}/>
      </main>
    </div>
  );
};

export default App;
