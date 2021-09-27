import React from "react";
import Header from './Header';
import Main from './Main';
/*
header/navbar/cart

product-listings
  product components

add product form  

      <ProductListings />
      <AddProduct Form />
*/

const App = () => {
  return (
    <div id="app">
      <Header />
      <Main />
    </div>
  );
};

export default App;
