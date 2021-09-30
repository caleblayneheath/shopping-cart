import axios from 'axios';
import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux'

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
  const dispatch = useDispatch()

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get('http://localhost:5000/api/products');
      const data = response.data
      if (data.length > 0) {
        dispatch({
          type: 'PRODUCTS_RECEIVED',
          data: data
        })
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
        dispatch({
          type: 'CART_RECEIVED',
          data: data
        })
      } else {
        console.log('No products on the server')
      }
    }
    getCart()
  }, [])

  return (
    <div id="app">
      <Header />
      <main>
        <ProductListings />
        <ProductAddForm />
      </main>
    </div>
  );
};

export default App;

