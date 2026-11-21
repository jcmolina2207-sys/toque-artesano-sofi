import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Item from "../Item/Item";
import { obtenerProductos } from "../../services/productosService";

function ItemListContainer() {
  const { categoriaId } = useParams();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setCargando(true);
    setError("");
    obtenerProductos()
      .then((data) => setProductos(data))
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setError("No pudimos cargar los productos. Intentá de nuevo más tarde.");
      })
      .finally(() => setCargando(false));
  }, []);

  const productosMostrados = categoriaId
    ? productos.filter((p) => p.categoria === categoriaId)
    : productos;

  if (cargando) {
    return <p className="cargando-mensaje">Cargando productos...</p>;
  }

  if (error) {
    return <p className="cargando-mensaje">{error}</p>;
  }

  return (
    <section className="catalogo">
      <h2 className="catalogo-titulo">
        {categoriaId ?? "Nuestros productos"}
      </h2>
      <div className="catalogo-grid">
        {productosMostrados.map((producto) => (
          <Item key={producto.id} {...producto} />
        ))}
      </div>
    </section>
  );
}

export default ItemListContainer;