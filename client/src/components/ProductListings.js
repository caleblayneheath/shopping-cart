import EditableProduct from "./EditableProduct";

const ProductListings = ({products, onDelete, onEdit}) => {
  
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
            onDelete={onDelete}
            onEdit={onEdit}
          />
        })}
    </div>
  );
};

export default ProductListings;