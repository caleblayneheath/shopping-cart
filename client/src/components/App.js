import axios from 'axios';
import React, {useEffect} from "react";
import { useDispatch } from 'react-redux'

import Header from './Header';
import ProductAddForm from "./ProductAddForm";
import ProductListings from "./ProductListings";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeProducts())
  }, [dispatch])

  const initializeProducts = () => {
    return async dispatch => {
      const response = await axios.get('http://localhost:5000/api/products');
      const data = response.data
      dispatch({
        type: 'PRODUCTS_RECEIVED',
        data: data
      })
    }
  }

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const response = await axios.get('http://localhost:5000/api/products');
  //     const data = response.data
  //     if (data.length > 0) {
  //       dispatch({
  //         type: 'PRODUCTS_RECEIVED',
  //         data: data
  //       })
  //     } else {
  //       console.log('No products on the server')
  //     }
  //   }
  //   getProducts()
  // }, [])

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

