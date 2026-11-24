import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { obtenerProducto } from "../../services/productosService";
import { Helmet } from "react-helmet-async";
import { FaMinus, FaPlus, FaCartPlus } from "react-icons/fa";

function ItemDetail() {
  const { id } = useParams();
  const { addToCart, getAvailableStock } = useContext(CartContext);

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);
  const [cantidadAgregada, setCantidadAgregada] = useState(0);
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    setCargando(true);
    setAgregado(false);
    setError("");
    setAviso("");
    obtenerProducto(id)
      .then((data) => {
        setProducto(data);
        setCantidad(1);
      })
      .catch((err) => {
        console.error("Error al cargar el producto:", err);
        setError("No pudimos cargar el producto. Intentá de nuevo más tarde.");
      })
      .finally(() => setCargando(false));
  }, [id]);

  // Unidades que todavía se pueden agregar (stock menos lo que ya está en el carrito)
  const disponible = producto ? getAvailableStock(producto) : 0;

  const restar = () => {
    setAviso("");
    setCantidad((c) => Math.max(1, c - 1));
  };

  const sumar = () => {
    if (cantidad >= disponible) {
      setAviso(`Llegaste al máximo: solo hay ${disponible} unidad(es) disponible(s).`);
      return;
    }
    setAviso("");
    setCantidad((c) => c + 1);
  };

  const handleAgregar = () => {
    if (!producto) return;
    const resultado = addToCart(producto, cantidad);

    if (resultado.ok) {
      setCantidadAgregada(cantidad);
      setAgregado(true);
      setAviso("");
      setCantidad(1);
    } else {
      setAgregado(false);
      setAviso(`Solo quedan ${resultado.disponible} unidad(es) disponible(s).`);
    }
  };

  if (error) {
    return <p className="cargando-mensaje">{error}</p>;
  }

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
      <Helmet>
  <title>{producto.nombre} | Toque Artesano de Sofi</title>
  <meta
    name="description"
    content={`${producto.nombre}: pastelería artesanal hecha a mano. Agregalo a tu pedido.`}
  />
</Helmet>
      <div className="item-detalle-info">
        <h2>{producto.nombre}</h2>
        <p className="item-detalle-categoria">{producto.categoria}</p>
        <p className="item-detalle-precio">
          {producto.precio > 0
            ? `$${producto.precio.toLocaleString("es-AR")}`
            : "Consultar precio"}
        </p>
        <p className="item-detalle-stock">Stock disponible: {disponible}</p>

        {disponible > 0 ? (
          <>
            <div className="cantidad-selector">
              <button
                type="button"
                onClick={restar}
                disabled={cantidad <= 1}
                aria-label="Restar cantidad"
              >
                <FaMinus aria-hidden="true" />
              </button>
              <span>{cantidad}</span>
              <button
                type="button"
                onClick={sumar}
                disabled={cantidad >= disponible}
                aria-label="Sumar cantidad"
              >
                <FaPlus aria-hidden="true" />
              </button>
            </div>

            <button type="button" className="item-boton" onClick={handleAgregar}>
              <FaCartPlus aria-hidden="true" /> Agregar al carrito
            </button>
          </>
        ) : (
          <p className="item-detalle-sin-stock">Sin stock disponible</p>
        )}

        {aviso && <p className="item-detalle-aviso">{aviso}</p>}

        {agregado && (
          <p className="item-detalle-confirmacion">
            ¡Se agregó {cantidadAgregada} unidad(es) al carrito!{" "}
            <Link to="/carrito">Ver carrito</Link>
          </p>
        )}
      </div>
    </section>
  );
}

export default ItemDetail;