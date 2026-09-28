import { createContext, useContext, useEffect, useState } from "react";

// Se exporta el Context para poder usar useContext(CartContext) directamente
// (por ejemplo en ItemDetail.jsx / Cart.jsx), además del hook useCart().
export const CartContext = createContext();

const CARRITO_KEY = "carrito_toque_artesano";

export function CartProvider({ children }) {
  // cart: array de { id, nombre, precio, imagen, cantidad }
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

  // Agrega un producto al carrito. Si ya existe, suma la cantidad.
  const addToCart = (producto, cantidad) => {
    setCart((prevCart) => {
      const existente = prevCart.find((item) => item.id === producto.id);
      if (existente) {
        return prevCart.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
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
          cantidad,
        },
      ];
    });
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, cantidad) => {
    if (cantidad <= 0) {
      removeItem(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, cantidad } : item))
    );
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
