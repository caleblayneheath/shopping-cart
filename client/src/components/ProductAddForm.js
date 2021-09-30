import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const ProductAddForm = () => {
  const dispatch = useDispatch()
  const [ title, setTitle ] = useState('')
  const [ price, setPrice ] = useState('')
  const [ quantity, setQuantity ] = useState('')
  const [ addFormVisible, setAddFormVisible ] = useState('')

  const handleSubmit = event => {
    console.log('form submitted')
    event.preventDefault();
    onSubmit({ title, price, quantity }, hideForm)
  }
  
  const onSubmit = async (newProduct, callback) => {
    try {
      const response = await axios.post('http://localhost:5000/api/products', newProduct)
      const data = response.data
      // setProducts([...products, data])
      dispatch({ 
        type: 'PRODUCT_ADDED',
        data: data
      })
      if (callback) {
        callback()
      }
    } catch (e) {
      console.error(e)
    }
  }

  const resetInputs = () => {
    setTitle('')
    setPrice('')
    setQuantity('')
  }

  const showForm = event => {
    setAddFormVisible('visible')
  }

  const hideForm = event => {
    setAddFormVisible('')
    resetInputs()
  }

  return(
    <div className={`add-form ${addFormVisible}`}>
      <p><a className="button add-product-button" onClick={showForm}>Add A Product</a></p>
      <h3>Add Product</h3>
      <form >
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input type="text" id="product-name" value={title} onChange={e => setTitle(e.target.value)}/>
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input type="text" id="product-price" value={price} onChange={e => setPrice(e.target.value)}/>
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input type="text" id="product-quantity" value={quantity} onChange={e => setQuantity(e.target.value)}/>
        </div>

        <div className="actions form-actions">
          <a className="button" onClick={handleSubmit}>Add</a>
          <a className="button" onClick={hideForm}>Cancel</a>
        </div>
      </form>
    </div>
  );
};

export default ProductAddForm;