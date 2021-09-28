import Cart from "./Cart";

const Header = (props) => {
  return (
    <header>
      <h1>The Shop!</h1>
      <Cart cart={props.cart} />
   </header>
  );
}

export default Header;