import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function PrivateRoute({ children }) {
  const { user, cargandoAuth } = useAuth();

  // Mientras Firebase revisa si hay sesión, no decidimos nada todavía
  if (cargandoAuth) {
    return <p className="cargando-mensaje">Cargando...</p>;
  }

  // Sin sesión: lo mandamos a login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Con sesión: mostramos la página protegida
  return children;
}

export default PrivateRoute;