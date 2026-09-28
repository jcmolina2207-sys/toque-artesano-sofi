import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Item from "../Item/Item";

function ItemListContainer() {
  const { categoriaId } = useParams();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setCargando(true);
    fetch("/productos.json")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al cargar productos:", error))
      .finally(() => setCargando(false));
  }, []);

  const productosMostrados = categoriaId
    ? productos.filter((p) => p.categoria === categoriaId)
    : productos;

  if (cargando) {
    return <p className="cargando-mensaje">Cargando productos...</p>;
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
