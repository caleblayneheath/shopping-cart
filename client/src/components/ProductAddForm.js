import { useState } from 'react'

const ProductAddForm = ({ onSubmit }) => {
  const [ title, setTitle ] = useState('')
  const [ price, setPrice ] = useState('')
  const [ quantity, setQuantity ] = useState('')
  const [ addFormVisible, setAddFormVisible ] = useState('')

  const resetInputs = () => {
    setTitle('')
    setPrice('')
    setQuantity('')
  }

  const handleSubmit = event => {
    console.log('form submitted')
    event.preventDefault();
    onSubmit({ title, price, quantity }, hideForm)
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
          <a className="button" onClick={handleSubmit}>Add</a>
          <a className="button" onClick={hideForm}>Cancel</a>
        </div>
      </form>
    </div>
  );
};

export default ProductAddForm;