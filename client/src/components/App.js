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

  useEffect(() => {
    dispatch(initializeCart())
  }, [dispatch])

  const initializeCart = () => {
    return async dispatch => {
      const response = await axios.get('http://localhost:5000/api/cart');
      const data = response.data
      dispatch({
        type: 'CART_RECEIVED',
        data: data
      })
    }
  }

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

