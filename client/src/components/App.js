import React, {useEffect} from "react";
import { useDispatch } from 'react-redux'

import Header from './Header';
import ProductAddForm from "./ProductAddForm";
import ProductListings from "./ProductListings";
import { createInitialProducts } from '../lib/reducers/productReducer'
import { createInitialCart } from '../lib/reducers/cartReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(createInitialProducts())
  }, [dispatch])

  useEffect(() => {
    dispatch(createInitialCart())
  }, [dispatch])

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

