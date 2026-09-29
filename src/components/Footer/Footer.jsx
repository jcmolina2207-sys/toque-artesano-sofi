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
