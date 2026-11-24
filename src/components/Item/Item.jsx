import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { FaEye } from "react-icons/fa";

function Item({ id, nombre, precio, imagen }) {
  return (
    <Card className="item-card">
      <Card.Img
        variant="top"
        src={imagen}
        alt={nombre}
        className="item-imagen"
        loading="lazy"
      />
      <Card.Body className="d-flex flex-column text-center">
        <Card.Title as="h3" className="item-nombre">
          {nombre}
        </Card.Title>
        <Card.Text className="item-precio">
          {precio > 0 ? `$${precio.toLocaleString("es-AR")}` : "Consultar"}
        </Card.Text>
        <Link
          to={`/producto/${id}`}
          className="item-boton mt-auto justify-content-center"
        >
          <FaEye aria-hidden="true" /> Ver detalle
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Item;