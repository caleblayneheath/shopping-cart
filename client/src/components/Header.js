import { useSelector, useDispatch } from 'react-redux'
import { createCheckout } from '../lib/reducers/cartReducer'

const Header = () => {
  const dispatch = useDispatch();
  const cart = useSelector(store => store.cart)
  
  const onCheckout = () => {
    dispatch(createCheckout())    
  }
  
  const getTotalPrice = () => {
    return cart.reduce((total, cartItem) => {
      return total + (cartItem.price * cartItem.quantity)
    }, 0)
  }

  return (
    <header>
      <h1>The Shop!</h1>
      <div className="cart">
        <h2>Your Cart</h2>
        {
          cart.length === 0 
          ? (
            <>
              <p>Your cart is empty</p>
              <p>Total: $0</p>
              <a className="button checkout disabled">Checkout</a>
            </>
          )
          : (
            <>
              <table className="cart-items">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(cartItem => {
                    return (
                      <tr key={cartItem._id}>
                      <td>{cartItem.title}</td>
                      <td>{cartItem.quantity}</td>
                      <td>${cartItem.price}</td>
                    </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="total">Total: ${getTotalPrice()}</td>
                  </tr>
                </tfoot>
              </table>
              <a className="button checkout" onClick={onCheckout}>Checkout</a>
            </>  
          )
        }
      </div> 
   </header>
  );
}

export default Header;