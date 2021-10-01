import axios from 'axios'
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import ProductEditForm from "./ProductEditForm";

const EditableProduct = (props) => {
  const dispatch = useDispatch()
  const [editFormVisible, setEditFormVisible] = useState(false)

  const handleDelete = async (event, callback) => {
    console.log('delete button pressed');
    event.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:5000/api/products/${props.id}`)
      console.log(response);
      dispatch({
        type: 'PRODUCT_DELETED',
        data: props.id
      })
      if (callback) {
        callback()
      }
    } catch (e) {
      console.log(e);
    }
  }

  const showEditForm = () => {
    console.log('edit form rendered');
    setEditFormVisible(true);
  }

  const hideEditForm = () => {
    console.log('edit form removed');
    setEditFormVisible(false);
  }

  const decrementQuantity = (product) => {
    try {
      let quantity = props.quantity
      const updateObj = { ...product, quantity: quantity - 1 }
      // await onEdit(props.id, updateObj)
      dispatch(onEdit(props.id, updateObj))
    } catch (e) {
      console.log(e);
    }
  }

  const onEdit = (id, updateObj, callback) => {
    return async dispatch => {
      try {
        const response = await axios.put(`http://localhost:5000/api/products/${id}`, updateObj)
        console.log(response.data);
        dispatch({
          type: 'PRODUCT_UPDATED',
          data: response.data
        })
        if (callback) {
          callback()
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  // const onEdit = async (id, updateObj, callback) => {
  //   try {
  //     const response = await axios.put(`http://localhost:5000/api/products/${id}`, updateObj)
  //     console.log(response.data);
  //     dispatch({
  //       type: 'PRODUCT_UPDATED',
  //       data: response.data
  //     })
  //     if (callback) {
  //       callback()
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // const onAddToCart = async (product, quantity, callback) => {
  //   try {
  //     if (quantity <= 0) {
  //       return
  //     }
      
  //     await decrementQuantity(product);

  //     const response = await axios.post(`http://localhost:5000/api/cart`, product)
  //     const data =  response.data

  //     dispatch({
  //       type: 'CART_UPDATED',
  //       data: data,
  //     })

  //     if (callback) {
  //       callback()
  //     }
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  const onAddToCart = (product, quantity, callback) => {
    return async dispatch => {
      try {
        if (quantity <= 0) {
          return
        }
        
        await decrementQuantity(product);

        const response = await axios.post(`http://localhost:5000/api/cart`, product)
        const data = response.data

        dispatch({
          type: 'CART_UPDATED',
          data: data,
        })

        if (callback) {
          callback()
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  const handleAddToCart = e => {
    e.preventDefault()
    const product = {
      title: props.title,
      price: props.price,
      productId: props.id
    }
    dispatch(onAddToCart(product, props.quantity))
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
