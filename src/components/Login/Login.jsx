import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Helmet } from "react-helmet-async";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

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

const Contenedor = styled.section`
  max-width: 400px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  label {
    font-weight: 600;
    color: #1a3a4a;
  }

  input {
    padding: 0.6rem;
    border: 1px solid #b7cfe0;
    border-radius: 8px;
    font-size: 1rem;
  }

  input:focus-visible {
    outline: 2px solid #072f42;
    outline-offset: 2px;
  }

  .item-boton {
    justify-content: center;
    border: none;
    cursor: pointer;
  }

  .item-boton:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const MensajeError = styled.p`
  color: #c0392b;
  font-size: 0.9rem;
  margin: 0.3rem 0 0;
`;

const Cambiar = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #1a3a4a;
`;

const LinkBoton = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: #2f6f9f;
  font-size: inherit;
  text-decoration: underline;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #072f42;
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

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
    <Contenedor>
      <Helmet>
        <title>Ingresar | Toque Artesano de Sofi</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <h2 className="catalogo-titulo">
        {modoRegistro ? "Crear cuenta" : "Iniciar sesión"}
      </h2>

      <Formulario onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          autoComplete={modoRegistro ? "new-password" : "current-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo 6 caracteres"
        />

        {error && <MensajeError role="alert">{error}</MensajeError>}

        <button type="submit" className="item-boton" disabled={enviando}>
          {enviando ? (
            "Enviando..."
          ) : modoRegistro ? (
            <>
              <FaUserPlus aria-hidden="true" /> Registrarme
            </>
          ) : (
            <>
              <FaSignInAlt aria-hidden="true" /> Entrar
            </>
          )}
        </button>
      </Formulario>

      <Cambiar>
        {modoRegistro ? "¿Ya tenés cuenta?" : "¿No tenés cuenta?"}{" "}
        <LinkBoton
          type="button"
          onClick={() => {
            setModoRegistro(!modoRegistro);
            setError("");
          }}
        >
          {modoRegistro ? "Iniciá sesión" : "Registrate"}
        </LinkBoton>
      </Cambiar>
    </Contenedor>
  );
}

export default Login;