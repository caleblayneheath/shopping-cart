import { useDispatch } from 'react-redux'
import { useState } from "react";

import { createProductUpdate } from '../lib/reducers/productReducer';

const ProductEditForm = props => {
  const dispatch = useDispatch()

  const [ title, setTitle ] = useState(props.title)
  const [ price, setPrice ] = useState(props.price)
  const [ quantity, setQuantity ] = useState(props.quantity)

  const handleUpdate = event => {
    event.preventDefault();
    dispatch(createProductUpdate(props.id, {title, price, quantity}, props.hideEditForm))
  };

  const handleCancel = event => {
    event.preventDefault();
    props.hideEditForm();
  }

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form>
        <div className="input-group">
          <label for="product-name">Product Name</label>
          <input type="text" id="product-name" value={title} onChange={e => setTitle(e.target.value)}/>
        </div>

        <div className="input-group">
          <label for="product-price">Price</label>
          <input type="text" id="product-price" value={price} onChange={e => setPrice(e.target.value)}/>
        </div>

        <div className="input-group">
          <label for="product-quantity">Quantity</label>
          <input type="text" id="product-quantity" value={quantity} onChange={e => setQuantity(e.target.value)}/>
        </div>

        <div className="actions form-actions">
          <a className="button" onClick={handleUpdate}>Update</a>
          <a className="button" onClick={handleCancel}>Cancel</a>
        </div>
      </form>
    </div>
  )
};

export default ProductEditForm;