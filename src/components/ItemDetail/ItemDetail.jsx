import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

function ItemDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    setCargando(true);
    setAgregado(false);
    fetch("/productos.json")
      .then((res) => res.json())
      .then((data) => {
        const encontrado = data.find((p) => String(p.id) === id);
        setProducto(encontrado ?? null);
        setCantidad(1);
      })
      .catch((error) => console.error("Error al cargar el producto:", error))
      .finally(() => setCargando(false));
  }, [id]);

  const restar = () => setCantidad((c) => Math.max(1, c - 1));
  const sumar = () =>
    setCantidad((c) =>
      producto?.stock ? Math.min(producto.stock, c + 1) : c + 1
    );

  const handleAgregar = () => {
    if (!producto) return;
    addToCart(producto, cantidad);
    setAgregado(true);
  };

  if (cargando) {
    return <p className="cargando-mensaje">Cargando producto...</p>;
  }

  if (!producto) {
    return (
      <div className="item-detalle-no-encontrado">
        <p>No encontramos ese producto.</p>
        <Link to="/productos" className="item-boton">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <section className="item-detalle">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="item-detalle-imagen"
      />

      <div className="item-detalle-info">
        <h2>{producto.nombre}</h2>
        <p className="item-detalle-categoria">{producto.categoria}</p>
        <p className="item-detalle-precio">
          {producto.precio > 0
            ? `$${producto.precio.toLocaleString("es-AR")}`
            : "Consultar precio"}
        </p>
        {typeof producto.stock === "number" && (
          <p className="item-detalle-stock">
            Stock disponible: {producto.stock}
          </p>
        )}

        <div className="cantidad-selector">
          <button type="button" onClick={restar} aria-label="Restar cantidad">
            −
          </button>
          <span>{cantidad}</span>
          <button type="button" onClick={sumar} aria-label="Sumar cantidad">
            +
          </button>
        </div>

        <button type="button" className="item-boton" onClick={handleAgregar}>
          Agregar al carrito
        </button>

        {agregado && (
          <p className="item-detalle-confirmacion">
            ¡Se agregó {cantidad} unidad(es) al carrito!{" "}
            <Link to="/carrito">Ver carrito</Link>
          </p>
        )}
      </div>
    </section>
  );
}

export default ItemDetail;
