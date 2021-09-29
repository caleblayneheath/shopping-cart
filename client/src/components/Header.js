//import Cart from "./Cart";

const Header = (props) => {
  const getTotalPrice = () => {
    return props.cart.reduce((total, cartItem) => {
      return total + (cartItem.price * cartItem.quantity)
    }, 0)
  }

  return (
    <header>
      <h1>The Shop!</h1>
      <div className="cart">
        <h2>Your Cart</h2>
        {
          props.cart.length === 0 
          ? (
            <>
              <p>Your cart is empty</p>
              <p>Total: $0</p>
              <a className="button checkout disabled">Checkout</a>
            </>
          )
          : (
            <>
              <table class="cart-items">
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
                {props.cart.map(cartItem => {
                  return (
                    <tr>
                    <td>{cartItem.title}</td>
                    <td>{cartItem.quantity}</td>
                    <td>${cartItem.price}</td>
                  </tr>
                  )
                })}
                

                <tr>
                  <td colspan="3" class="total">Total: ${getTotalPrice()}</td>
                </tr>
              </table>
              <a class="button checkout">Checkout</a>
            </>  
          )
        }
      </div> 
   </header>
  );
}

export default Header;