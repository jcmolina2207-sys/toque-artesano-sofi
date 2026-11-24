import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { esAdmin } from "../../utils/admin";

// Protege una ruta. Con la prop "soloAdmin" además exige que el usuario
// sea la administradora del catálogo (ver utils/admin.js).
function PrivateRoute({ children, soloAdmin = false }) {
  const { user, cargandoAuth } = useAuth();

  // Mientras Firebase revisa si hay sesión, no decidimos nada todavía
  if (cargandoAuth) {
    return <p className="cargando-mensaje">Cargando...</p>;
  }

  // Sin sesión: lo mandamos a login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Con sesión pero sin permisos de administración: lo mandamos al inicio
  if (soloAdmin && !esAdmin(user)) {
    return <Navigate to="/" replace />;
  }

  // Con sesión (y permisos, si hacen falta): mostramos la página protegida
  return children;
}

export default PrivateRoute;
