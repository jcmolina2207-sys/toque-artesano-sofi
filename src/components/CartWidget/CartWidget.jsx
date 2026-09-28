import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function CartWidget() {
  const { totalItems } = useCart();

  return (
    <Link to="/carrito" className="cart-widget" aria-label="Ver carrito">
      <span className="cart-widget-icon" role="img" aria-hidden="true">
        🛒
      </span>
      {totalItems > 0 && <span className="cart-widget-badge">{totalItems}</span>}
    </Link>
  );
}

export default CartWidget;
