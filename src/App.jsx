import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetail from "./components/ItemDetail/ItemDetail";
import Cart from "./components/Cart/Cart";
import Contacto from "./components/Contacto/Contacto";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Admin from "./components/Admin/Admin";
import { Helmet } from "react-helmet-async";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#1a3a4a" }}>
      <Helmet>
        <title>Página no encontrada | Toque Artesano de Sofi</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <h2>404 - Página no encontrada</h2>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="productos" element={<ItemListContainer />} />
              <Route path="categoria/:categoriaId" element={<ItemListContainer />} />
              <Route path="producto/:id" element={<ItemDetail />} />
              <Route path="carrito" element={<Cart />} />
              <Route path="contacto" element={<Contacto />} />
              <Route path="login" element={<Login />} />
              <Route
                path="admin"
                element={
                  <PrivateRoute soloAdmin>
                    <Admin />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
