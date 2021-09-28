import EditableProduct from "./EditableProduct";

const ProductListings = ({products}) => {
  
  return(
     <div className="product-listing">
        <h2>Products</h2>
        {products.map(product => {
          return <EditableProduct 
            key={product.id}
            title={product.title}
            quantity={product.quantity}
            price={product.price}
          />
        })}
    </div>
  );
};

export default ProductListings;