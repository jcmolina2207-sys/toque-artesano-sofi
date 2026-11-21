import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

// Traduce los códigos de error de Firebase a mensajes claros
function traducirError(codigo) {
  switch (codigo) {
    case "auth/invalid-credential":
      return "Email o contraseña incorrectos.";
    case "auth/email-already-in-use":
      return "Ya existe una cuenta con ese email.";
    case "auth/weak-password":
      return "La contraseña debe tener al menos 6 caracteres.";
    case "auth/invalid-email":
      return "El email no es válido.";
    case "auth/network-request-failed":
      return "Error de conexión. Revisá tu internet.";
    default:
      return "Ocurrió un error. Intentá de nuevo.";
  }
}

function Login() {
  const { login, registrar } = useAuth();
  const navigate = useNavigate();

  const [modoRegistro, setModoRegistro] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("El email es obligatorio.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setEnviando(true);
    try {
      if (modoRegistro) {
        await registrar(email, password);
      } else {
        await login(email, password);
      }
      navigate("/");
    } catch (err) {
      setError(traducirError(err.code));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="login">
      <h2 className="catalogo-titulo">
        {modoRegistro ? "Crear cuenta" : "Iniciar sesión"}
      </h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo 6 caracteres"
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="item-boton" disabled={enviando}>
          {enviando
            ? "Enviando..."
            : modoRegistro
            ? "Registrarme"
            : "Entrar"}
        </button>
      </form>

      <p className="login-cambiar">
        {modoRegistro ? "¿Ya tenés cuenta?" : "¿No tenés cuenta?"}{" "}
        <button
          type="button"
          className="login-link"
          onClick={() => {
            setModoRegistro(!modoRegistro);
            setError("");
          }}
        >
          {modoRegistro ? "Iniciá sesión" : "Registrate"}
        </button>
      </p>
    </section>
  );
}

export default Login;