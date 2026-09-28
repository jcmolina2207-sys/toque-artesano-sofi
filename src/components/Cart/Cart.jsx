import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

// TODO: reemplazar por el número real de WhatsApp del negocio
const NUMERO_WHATSAPP = "+5491124075797";

function Cart() {
  const { cart, removeItem, updateQuantity, totalItems, totalPrice, clear } =
    useContext(CartContext);

  const armarMensajeWhatsapp = () => {
    const lineas = cart.map((item) => {
      const subtotal =
        item.precio > 0
          ? `$${(item.precio * item.cantidad).toLocaleString("es-AR")}`
          : "a consultar";
      return `- ${item.nombre} x${item.cantidad} (${subtotal})`;
    });
    const totalTexto =
      totalPrice > 0
        ? `\n\nTotal: $${totalPrice.toLocaleString("es-AR")}`
        : "";
    return `¡Hola! Quiero hacer este pedido:\n${lineas.join(
      "\n"
    )}${totalTexto}`;
  };

  const handleFinalizarPedido = () => {
    if (cart.length === 0) return;
    const mensaje = encodeURIComponent(armarMensajeWhatsapp());
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${mensaje}`, "_blank");
    clear();
  };

  if (cart.length === 0) {
    return (
      <section className="carrito-vacio">
        <p>Tu carrito está vacío.</p>
        <Link to="/productos" className="item-boton">
          Ver productos
        </Link>
      </section>
    );
  }

  return (
    <section className="carrito">
      <h2 className="catalogo-titulo">Tu carrito ({totalItems})</h2>

      <div className="carrito-lista">
        {cart.map((item) => (
          <div className="carrito-item" key={item.id}>
            {item.imagen && (
              <img
                src={item.imagen}
                alt={item.nombre}
                className="carrito-item-imagen"
              />
            )}

            <div className="carrito-item-info">
              <p className="carrito-item-nombre">{item.nombre}</p>
              <p className="carrito-item-precio">
                {item.precio > 0
                  ? `$${item.precio.toLocaleString("es-AR")} c/u`
                  : "Consultar"}
              </p>

              <div className="cantidad-selector">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                  aria-label="Restar cantidad"
                >
                  −
                </button>
                <span>{item.cantidad}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                  aria-label="Sumar cantidad"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              className="carrito-item-eliminar"
              onClick={() => removeItem(item.id)}
              aria-label={`Eliminar ${item.nombre} del carrito`}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="carrito-resumen">
        {totalPrice > 0 && (
          <p className="carrito-total">
            Total: ${totalPrice.toLocaleString("es-AR")}
          </p>
        )}
        <button
          type="button"
          className="item-boton"
          onClick={handleFinalizarPedido}
        >
          Finalizar pedido por WhatsApp
        </button>
      </div>
    </section>
  );
}

export default Cart;
