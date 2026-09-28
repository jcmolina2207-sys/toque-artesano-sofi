import { NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";

// NavLink en vez de Link porque necesitamos saber cuál es la ruta activa
// para aplicarle la clase "nav-link-active" (ver style.css)
const activeClass = ({ isActive }) => (isActive ? "nav-link-active" : undefined);

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/" end className={activeClass}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/productos" className={activeClass}>
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink to="/contacto" className={activeClass}>
            Contacto
          </NavLink>
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
