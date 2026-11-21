import { createContext, useContext, useEffect, useState } from "react";

// Se exporta el Context para poder usar useContext(CartContext) directamente
// (por ejemplo en ItemDetail.jsx / Cart.jsx), además del hook useCart().
export const CartContext = createContext();

const CARRITO_KEY = "carrito_toque_artesano";

export function CartProvider({ children }) {
  // cart: array de { id, nombre, precio, imagen, stock, cantidad }
  const [cart, setCart] = useState(() => {
    try {
      const guardado = localStorage.getItem(CARRITO_KEY);
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CARRITO_KEY, JSON.stringify(cart));
    } catch {
      // localStorage no disponible, se ignora
    }
  }, [cart]);

  // Cuántas unidades de este producto ya hay en el carrito
  const getQuantityInCart = (id) =>
    cart.find((item) => item.id === id)?.cantidad ?? 0;

  // Cuántas unidades más se pueden agregar de este producto
  const getAvailableStock = (producto) =>
    Math.max(0, producto.stock - getQuantityInCart(producto.id));

  // Agrega un producto al carrito. Si ya existe, suma la cantidad.
  // Devuelve { ok: true } o { ok: false, disponible } si supera el stock.
  const addToCart = (producto, cantidad) => {
    const disponible = getAvailableStock(producto);

    if (cantidad <= 0 || cantidad > disponible) {
      return { ok: false, disponible };
    }

    setCart((prevCart) => {
      const existente = prevCart.find((item) => item.id === producto.id);
      if (existente) {
        return prevCart.map((item) =>
          item.id === producto.id
            ? { ...item, stock: producto.stock, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [
        ...prevCart,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          stock: producto.stock,
          cantidad,
        },
      ];
    });

    return { ok: true };
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Cambia la cantidad de un item sin pasarse del stock.
  const updateQuantity = (id, cantidad) => {
    if (cantidad <= 0) {
      removeItem(id);
      return { ok: true };
    }

    const item = cart.find((i) => i.id === id);
    // Si el item viene de un carrito viejo sin "stock", no se puede validar
    const limite = item?.stock ?? Infinity;

    if (cantidad > limite) {
      return { ok: false, disponible: limite };
    }

    setCart((prevCart) =>
      prevCart.map((i) => (i.id === id ? { ...i, cantidad } : i))
    );
    return { ok: true };
  };

  const clear = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const isInCart = (id) => cart.some((item) => item.id === id);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        updateQuantity,
        clear,
        totalItems,
        totalPrice,
        isInCart,
        getQuantityInCart,
        getAvailableStock,
        // Alias para no romper componentes que ya usaban estos nombres
        removeFromCart: removeItem,
        clearCart: clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}