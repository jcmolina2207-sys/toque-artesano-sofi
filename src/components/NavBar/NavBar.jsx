import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import CartWidget from "../CartWidget/CartWidget";
import { useAuth } from "../../context/AuthContext";
import { esAdmin } from "../../utils/admin";
import {
  FaHome,
  FaStore,
  FaEnvelope,
  FaUserCog,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";

// Los estilos del menú viven acá. Se usa && para que ganen sobre las reglas
// globales (.header ul, .navbar ul) sin depender del orden de los CSS.
const Nav = styled.nav`
  && ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.6rem 1.5rem;
    margin-top: 0.8rem;
    padding: 0;
    list-style: none;
  }

  && ul li a,
  && ul li button {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: #d4dee2;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: color 0.15s;
  }

  && ul li a:hover,
  && ul li button:hover {
    color: #fff;
    text-decoration: underline;
  }

  && ul li a:focus-visible,
  && ul li button:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 3px;
    border-radius: 4px;
  }

  @media (max-width: 576px) {
    && ul {
      gap: 0.5rem 1rem;
    }

    && ul li a,
    && ul li button {
      font-size: 0.9rem;
    }
  }
`;

// Usamos <Link> y useLocation() para saber cuál es la ruta actual y aplicar
// la clase "nav-link-active" (ver global.css).
// El link Admin solo se muestra a la administradora; el resto de los
// usuarios ven Ingresar (sin sesión) o Salir (con sesión).
function NavBar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  const isInicio = pathname === "/";
  const isProductos =
    pathname.startsWith("/productos") || pathname.startsWith("/producto/");
  const isContacto = pathname === "/contacto";

  return (
    <Nav aria-label="Menú principal">
      <ul>
        <li>
          <Link to="/" className={isInicio ? "nav-link-active" : undefined}>
            <FaHome aria-hidden="true" /> Inicio
          </Link>
        </li>
        <li>
          <Link
            to="/productos"
            className={isProductos ? "nav-link-active" : undefined}
          >
            <FaStore aria-hidden="true" /> Productos
          </Link>
        </li>
        <li>
          <Link
            to="/contacto"
            className={isContacto ? "nav-link-active" : undefined}
          >
            <FaEnvelope aria-hidden="true" /> Contacto
          </Link>
        </li>
        {esAdmin(user) && (
          <li>
            <Link to="/admin">
              <FaUserCog aria-hidden="true" /> Admin
            </Link>
          </li>
        )}
        <li>
          {user ? (
            <button type="button" onClick={logout}>
              <FaSignOutAlt aria-hidden="true" /> Salir
            </button>
          ) : (
            <Link to="/login">
              <FaSignInAlt aria-hidden="true" /> Ingresar
            </Link>
          )}
        </li>
        {/* CartWidget: icono + contador que también funciona como link a /carrito */}
        <li className="navbar-cart-item">
          <CartWidget />
        </li>
      </ul>
    </Nav>
  );
}

export default NavBar;
