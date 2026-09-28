import { Link } from "react-router-dom";

function Item({ id, nombre, precio, imagen }) {
  return (
    <div className="item-card">
      <img src={imagen} alt={nombre} className="item-imagen" />
      <h3 className="item-nombre">{nombre}</h3>
      <p className="item-precio">
        {precio > 0 ? `$${precio.toLocaleString("es-AR")}` : "Consultar"}
      </p>
      <Link to={`/producto/${id}`} className="item-boton">
        Ver detalle
      </Link>
    </div>
  );
}

export default Item;
