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
  const [products, setProducts] = useState(test)
  const [cart, setCart] = useState([])

  return (
    <div id="app">
      <Header cart={cart}/>
      <main>
        <ProductListings products={products}/>
        <ProductAddForm />
      </main>
    </div>
  );
};

export default App;
