import { Link, useLocation } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";

// Usamos <Link> (como pide el enunciado) y useLocation() para saber cuál es
// la ruta actual y aplicar la clase "nav-link-active" (ver global.css)
function NavBar() {
  const { pathname } = useLocation();

  const isInicio = pathname === "/";
  const isProductos =
    pathname.startsWith("/productos") || pathname.startsWith("/producto/");
  const isContacto = pathname === "/contacto";

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className={isInicio ? "nav-link-active" : undefined}>
            Inicio
          </Link>
        </li>
        <li>
          <Link
            to="/productos"
            className={isProductos ? "nav-link-active" : undefined}
          >
            Productos
          </Link>
        </li>
        <li>
          <Link
            to="/contacto"
            className={isContacto ? "nav-link-active" : undefined}
          >
            Contacto
          </Link>
        </li>
        {/* CartWidget: icono + contador que también funciona como link a /carrito */}
        <li className="navbar-cart-item">
          <CartWidget />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;