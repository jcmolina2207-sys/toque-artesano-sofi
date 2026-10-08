import { useState } from "react";

const equipo = [
  { nombre: "Sofía", rol: "Fundadora & Pastelera", foto: "/img/equipo-sofia.jpg" },
  { nombre: "Juan", rol: "Producción", foto: "/img/equipo-juan.jpg" },
  { nombre: "Adrián", rol: "Atención al cliente", foto: "/img/equipo-adrian.jpg" },
];

// Devuelve las iniciales de un nombre (ej: "Sofía" -> "S")
function getIniciales(nombre) {
  return nombre
    .split(" ")
    .map((palabra) => palabra[0])
    .join("")
    .toUpperCase();
}

// Muestra la foto de la persona; si no carga (falta el archivo en /public/img)
// cae en un avatar-placeholder con las iniciales, en vez de un ícono roto.
function FotoEquipo({ nombre, foto }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="equipo-foto equipo-avatar-placeholder" aria-label={nombre}>
        {getIniciales(nombre)}
      </div>
    );
  }

  return (
    <img
      src={foto}
      alt={nombre}
      className="equipo-foto"
      onError={() => setError(true)}
    />
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  // null | { texto: string, tipo: "ok" | "error" }
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      setMensaje({ texto: "Ingresá tu email para suscribirte.", tipo: "error" });
      return;
    }

    // Sin backend: solo mostramos la confirmación y limpiamos el campo.
    setMensaje({ texto: "¡Gracias por suscribirte!", tipo: "ok" });
    setEmail("");
  };

  return (
    <footer className="footer-container">
      <div className="footer">
        <div className="footer-logo">
          <img src="/img/logo2.png" alt="Toque Artesano de Sofi" />
        </div>

        <div className="footer-contacto">
          <a
            href="https://wa.me/+5491124075797"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/img/whatsapp.svg" alt="WhatsApp" />
            WhatsApp
          </a>
          <a
            href="https://instagram.com/toqueartesanodesofi"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/img/instagram.svg" alt="Instagram" />
            Instagram
          </a>
        </div>

        <div className="footer-mercadopago">
          <img src="/img/mercadopago.svg" alt="Mercado Pago" />
        </div>
      </div>

      <section className="equipo">
        <h3 className="equipo-titulo">Nuestro equipo</h3>
        <div className="equipo-grid">
          {equipo.map((persona) => (
            <div className="equipo-card" key={persona.nombre}>
              <FotoEquipo nombre={persona.nombre} foto={persona.foto} />
              <p className="equipo-nombre">{persona.nombre}</p>
              <p className="equipo-rol">{persona.rol}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="footer-newsletter">
        <h3 className="footer-newsletter-titulo">Newsletter</h3>
        <p className="footer-newsletter-texto">
          Enterate primero de las novedades y promos de la pastelería.
        </p>

        <form className="footer-newsletter-form" onSubmit={handleSubmit}>
          <label htmlFor="footer-newsletter-email" className="footer-sr-only">
            Tu email
          </label>
          <input
            id="footer-newsletter-email"
            className="footer-newsletter-input"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="footer-newsletter-boton">
            Suscribirme
          </button>
        </form>

        {mensaje && (
          <p
            className={`footer-newsletter-mensaje footer-newsletter-mensaje--${mensaje.tipo}`}
            role="status"
          >
            {mensaje.texto}
          </p>
        )}

        <p className="footer-privacidad">
          <strong>Política de privacidad:</strong> usamos tu email solo para
          enviarte novedades de Toque Artesano de Sofi. No lo compartimos con
          terceros y podés darte de baja cuando quieras.
        </p>
      </section>

      <div className="footer-derechos">
        <p>
          © {new Date().getFullYear()} Toque Artesano de Sofi. Todos los
          derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
