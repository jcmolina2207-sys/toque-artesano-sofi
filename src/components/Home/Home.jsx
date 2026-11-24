import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Item from "../Item/Item";
import { obtenerProductos } from "../../services/productosService";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { FaStore } from "react-icons/fa";

const resenas = [
  {
    autor: "Carla M.",
    texto:
      "Los alfajores de maicena son una locura, quedan siempre tiernitos y con la medida justa de dulce de leche.",
    estrellas: 5,
  },
  {
    autor: "Nico R.",
    texto:
      "Pedí una docena de churros con DDL para un cumpleaños y volaron en minutos. Repetimos seguro.",
    estrellas: 5,
  },
  {
    autor: "Vale F.",
    texto:
      "El lemon pie tiene un equilibrio perfecto entre ácido y dulce. Mi torta favorita de la zona.",
    estrellas: 4,
  },
  {
    autor: "Tomás D.",
    texto: "Buenísima atención y todo casero. El pan de chipa se termina en el día.",
    estrellas: 5,
  },
];

function Home() {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
  obtenerProductos()
    .then((data) => {
      const destacados = data.filter((p) => p.precio > 0).slice(0, 4);
      setOfertas(destacados);
    })
    .catch((error) => console.error("Error al cargar ofertas:", error));
}, []);

  return (
    <>
      <Helmet>
        <title>Toque Artesano de Sofi | Pastelería artesanal</title>
        <meta
          name="description"
          content="Alfajores, churros rellenos y otras delicias artesanales hechas a mano. Explorá el catálogo y hacé tu pedido online."
        />
      </Helmet>
      <section className="seccion bienvenida">
        <div>
          <h1>Toque Artesano de Sofi</h1>
          <p>Repostería casera hecha con dedicación, todos los días para vos.</p>
          <Link to="/productos" className="item-boton">
            <FaStore aria-hidden="true" /> Ver catálogo completo
          </Link>
        </div>
      </section>

      <section className="ofertas">
        <h2 className="ofertas-titulo">Ofertas de la semana</h2>
        <Container>
  <Row xs={1} sm={2} lg={4} className="g-4 justify-content-center">
    {ofertas.map((producto) => (
      <Col key={producto.id}>
        <Item {...producto} />
      </Col>
    ))}
  </Row>
</Container>
      </section>

      <section className="resenas">
        <h2 className="resenas-titulo">Lo que dicen nuestros clientes</h2>
        <div className="resenas-grid">
          {resenas.map((resena) => (
            <div className="resena-card" key={resena.autor}>
              <p className="resena-texto">&ldquo;{resena.texto}&rdquo;</p>
              <p className="resena-autor">{resena.autor}</p>
              <p className="resena-estrellas">
                {"★".repeat(resena.estrellas)}
                {"☆".repeat(5 - resena.estrellas)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
