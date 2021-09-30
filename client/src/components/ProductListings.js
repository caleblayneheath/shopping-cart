import { useSelector } from 'react-redux'
import EditableProduct from "./EditableProduct";

const ProductListings = ({ onDelete, onEdit, onAddToCart}) => {
  const products = useSelector(store => store.products)

  return(
     <div className="product-listing">
        <h2>Products</h2>
        {products.map(product => {
          return <EditableProduct 
            key={product._id}
            id={product._id}
            title={product.title}
            quantity={product.quantity}
            price={product.price}
          />
        })}
    </div>
  );
};

export default ProductListings;

