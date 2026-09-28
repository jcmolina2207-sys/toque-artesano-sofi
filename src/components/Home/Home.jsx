import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Item from "../Item/Item";

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
    fetch("/productos.json")
      .then((res) => res.json())
      .then((data) => {
        const destacados = data.filter((p) => p.precio > 0).slice(0, 4);
        setOfertas(destacados);
      })
      .catch((error) => console.error("Error al cargar ofertas:", error));
  }, []);

  return (
    <>
      <section className="seccion bienvenida">
        <div>
          <h1>Toque Artesano de Sofi</h1>
          <p>Repostería casera hecha con dedicación, todos los días para vos.</p>
          <Link to="/productos" className="item-boton">
            Ver catálogo completo
          </Link>
        </div>
      </section>

      <section className="ofertas">
        <h2 className="ofertas-titulo">Ofertas de la semana</h2>
        <div className="catalogo-grid">
          {ofertas.map((producto) => (
            <Item key={producto.id} {...producto} />
          ))}
        </div>
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
