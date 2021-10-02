import { useState } from "react";
import { useDispatch } from 'react-redux'

import ProductEditForm from "./ProductEditForm";
import { createAddToCart } from '../lib/reducers/cartReducer';
import { createProductDelete, createProductUpdate } from '../lib/reducers/productReducer';

const EditableProduct = (props) => {
  const dispatch = useDispatch()
  const [editFormVisible, setEditFormVisible] = useState(false)

  const handleDelete = async (event, callback) => {
    event.preventDefault();
    dispatch(createProductDelete(props.id))
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
    if (props.quantity <= 0) {
      return
    }

    const product = {
      title: props.title,
      price: props.price,
      productId: props.id
    }
    dispatch(createAddToCart(product, props.quantity))
    
    const update = {
      title: props.title,
      price: props.price,
      quantity: props.quantity - 1
    }
    dispatch(createProductUpdate(props.id, update))
  }

  return(
    <div className="product">
      <div className="product-details">
        <h3>{props.title}</h3>
        <p className="price">${props.price}</p>
        <p className="quantity">{props.quantity} left in stock</p>
        { !editFormVisible &&        
          <div className="actions product-actions">
            <a className={`button add-to-cart ${props.quantity <= 0 ? 'disabled': ''}`} onClick={handleAddToCart}>Add to Cart</a>
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
        /> 
      }
    </div> 
  );
};

export default EditableProduct;
