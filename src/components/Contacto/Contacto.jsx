import { useState } from "react";
import "./Contacto.css";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/maqvlnvj";

function Contacto() {
  const [valores, setValores] = useState({
    nombre: localStorage.getItem("contacto_nombre") || "",
    email: localStorage.getItem("contacto_email") || "",
    telefono: "",
    mensaje: "",
  });
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);
  const [avisoError, setAvisoError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    const nuevosErrores = {};
    if (valores.nombre.trim() === "") {
      nuevosErrores.nombre = "Por favor ingresá tu nombre.";
    }
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoEmail.test(valores.email.trim())) {
      nuevosErrores.email = "Ingresá un correo electrónico válido.";
    }
    const soloNumeros = /^\d+$/;
    if (valores.telefono.trim() !== "" && !soloNumeros.test(valores.telefono.trim())) {
      nuevosErrores.telefono = "El teléfono solo puede contener números.";
    }
    if (valores.mensaje.trim() === "") {
      nuevosErrores.mensaje = "Por favor escribí tu mensaje.";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAvisoError("");
    if (!validar()) return;

    setEnviando(true);
    try {
      const formData = new FormData();
      formData.append("nombre", valores.nombre);
      formData.append("email", valores.email);
      formData.append("telefono", valores.telefono);
      formData.append("mensaje", valores.mensaje);
      formData.append("_subject", "Nuevo contacto - Toque Artesano de Sofi");

      const respuesta = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (respuesta.ok) {
        localStorage.setItem("contacto_nombre", valores.nombre);
        localStorage.setItem("contacto_email", valores.email);
        setExito(true);
        setValores((prev) => ({ ...prev, telefono: "", mensaje: "" }));
      } else {
        setAvisoError("Hubo un error al enviar el mensaje. Intentá de nuevo.");
      }
    } catch {
      setAvisoError("Error de conexión. Verificá tu internet e intentá de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="contacto-container">
      <h2>Contactanos</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="campo">
          <label htmlFor="nombre">Nombre completo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Tu nombre"
            value={valores.nombre}
            onChange={handleChange}
            className={errores.nombre ? "error" : ""}
          />
          {errores.nombre && <span className="mensaje-error">{errores.nombre}</span>}
        </div>

        <div className="campo">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="tucorreo@ejemplo.com"
            value={valores.email}
            onChange={handleChange}
            className={errores.email ? "error" : ""}
          />
          {errores.email && <span className="mensaje-error">{errores.email}</span>}
        </div>

        <div className="campo">
          <label htmlFor="telefono">Teléfono (opcional)</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            placeholder="Ej: 1123456789"
            value={valores.telefono}
            onChange={handleChange}
            className={errores.telefono ? "error" : ""}
          />
          {errores.telefono && <span className="mensaje-error">{errores.telefono}</span>}
        </div>

        <div className="campo">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            placeholder="Escribí tu consulta acá..."
            value={valores.mensaje}
            onChange={handleChange}
            className={errores.mensaje ? "error" : ""}
          />
          {errores.mensaje && <span className="mensaje-error">{errores.mensaje}</span>}
        </div>

        <button type="submit" className="btn-enviar" disabled={enviando}>
          {enviando ? "Enviando..." : "Enviar mensaje"}
        </button>

        {avisoError && <p className="aviso-envio-error">{avisoError}</p>}
        {exito && (
          <div className="exito">¡Mensaje enviado! Te respondemos a la brevedad.</div>
        )}
      </form>
    </div>
  );
}

export default Contacto;
