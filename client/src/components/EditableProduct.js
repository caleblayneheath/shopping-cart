import { useState } from "react";
import ProductEditForm from "./ProductEditForm";

const EditableProduct = (props) => {
  const [editFormVisible, setEditFormVisible] = useState(false)

  const handleDelete = event => {
    console.log('delete button pressed');
    event.preventDefault();
    props.onDelete(props.id)
  }

  const showEditForm = () => {
    console.log('edit form rendered');
    setEditFormVisible(true);
  }

  const hideEditForm = () => {
    console.log('edit form removed');
    setEditFormVisible(false);
  }

  const handleAddToCart = e => {
    e.preventDefault()
    const product = {
      title: props.title,
      price: props.price,
      productId: props.id
    }
    props.onAddToCart(product, props.quantity)
  }

  return(
    <div className="product">
      <div className="product-details">
        <h3>{props.title}</h3>
        <p className="price">${props.price}</p>
        <p className="quantity">{props.quantity} left in stock</p>
        { !editFormVisible &&        
          <div className="actions product-actions">
            <a className="button add-to-cart" onClick={handleAddToCart}>Add to Cart</a>
            <a className="button edit" onClick={showEditForm}>Edit</a>
          </div>        
        }
        <a className="delete-button" onClick={handleDelete}><span>X</span></a>
      </div>
      { editFormVisible &&
        <ProductEditForm 
          hideEditForm={hideEditForm} 
          id={props.id}
          title={props.title}
          quantity={props.quantity}
          price={props.price}
          onEdit={props.onEdit}
        /> 
      }
    </div> 
  );
};

export default EditableProduct;