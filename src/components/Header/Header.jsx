import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src="/img/logo.jpg" alt="Toque Artesano de Sofi" />
      </Link>
      <NavBar />
    </header>
  );
}

export default Header;
