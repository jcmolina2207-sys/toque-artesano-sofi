# 🧁 Toque Artesano de Sofi

Tienda online de **pastelería artesanal**: alfajores, churros rellenos y otras delicias hechas a mano. El sitio permite explorar el catálogo, ver el detalle de cada producto, agregarlo al carrito y contactar a la pastelería.

Es una SPA (Single Page Application) desarrollada con **React + Vite**, con navegación por `react-router-dom` y estado global del carrito mediante **Context API**. Corresponde a la **pre-entrega** del proyecto del curso de React.

## 🔗 Links

- **Sitio online (Vercel):** https://toque-artesano-sofi-ten.vercel.app/
- **Repositorio (GitHub):** https://github.com/jcmolina2207-sys/toque-artesano-sofi

## 🛠️ Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| [React](https://react.dev/) | ^19.2.8 | Librería principal de UI |
| [React DOM](https://react.dev/) | ^19.2.8 | Renderizado en el navegador |
| [React Router DOM](https://reactrouter.com/) | ^7.18.4 | Ruteo y navegación sin recargas |
| [Vite](https://vite.dev/) | ^8.3.0 | Bundler y servidor de desarrollo |
| [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) | ^6.1.1 | Soporte de React en Vite |
| [oxlint](https://oxc.rs/docs/guide/usage/linter) | ^1.81.0 | Linter |
| Context API | — | Estado global del carrito |
| CSS | — | Estilos (paleta azul pastel) |

## 🧭 Rutas disponibles

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Home` | Vista de bienvenida, ofertas y reseñas |
| `/productos` | `ItemListContainer` | Catálogo completo de productos |
| `/categoria/:categoriaId` | `ItemListContainer` | Catálogo filtrado por categoría |
| `/producto/:id` | `ItemDetail` | Detalle de un producto y botón para agregar al carrito |
| `/carrito` | `Cart` | Detalle del carrito de compras |
| `/contacto` | `Contacto` | Formulario de contacto (Formspree) |
| `*` | `NotFound` | Página 404 para rutas inexistentes |

Todas las rutas se renderizan dentro de `Layout` (Header + NavBar + contenido + Footer) y la app completa está envuelta en `CartProvider`.

## 🚀 Cómo correrlo localmente

**Requisitos:** [Node.js](https://nodejs.org/) (versión LTS reciente) y npm.

```bash
# 1. Clonar el repositorio
git clone https://github.com/jcmolina2207-sys/toque-artesano-sofi.git
cd toque-artesano-sofi

# 2. Instalar dependencias
npm install

# 3. Levantar el entorno de desarrollo
npm run dev
```

Luego abrí http://localhost:5173 en el navegador.

### Otros scripts

```bash
npm run build     # build de producción en /dist
npm run preview   # sirve el build de /dist localmente
npm run lint      # analiza el código con oxlint
```

## 📁 Estructura de carpetas

```
src/
├── components/
│   ├── Layout/              # Layout.jsx -> Header + <Outlet/> + Footer
│   ├── Header/              # Logo + NavBar
│   ├── NavBar/              # Links con react-router-dom + CartWidget
│   ├── Footer/              # Info de la empresa + tarjetas del equipo
│   ├── CartWidget/          # Ícono de carrito con contador (usa CartContext)
│   ├── Home/                # Vista de bienvenida ("/")
│   ├── ItemListContainer/   # Trae productos.json con fetch + useEffect
│   ├── Item/                # Tarjeta de producto (recibe datos por props)
│   ├── ItemDetail/          # Detalle de un producto ("/producto/:id")
│   ├── Cart/                # Vista del carrito ("/carrito")
│   └── Contacto/            # Formulario de contacto (Formspree)
├── context/
│   └── CartContext.jsx      # Estado global del carrito
├── style.css                # Hoja de estilos original del sitio
├── index.css                # Ajustes complementarios de layout
├── App.jsx                  # Rutas (BrowserRouter + Routes)
└── main.jsx                 # Punto de entrada

public/
├── img/                     # Imágenes del sitio (nombres en kebab-case)
└── productos.json           # Catálogo, leído con fetch("/productos.json")
```

> **Fuente única de datos:** el catálogo vive solo en `public/productos.json`. Todos los componentes lo leen con `fetch`, por lo que no hay copias que mantener sincronizadas.

## 🛒 Carrito (Context API)

`CartContext` expone:

- `cart`: lista de productos agregados
- `addToCart(producto, cantidad)`
- `removeFromCart(id)`
- `updateQuantity(id, cantidad)`
- `clearCart()`
- `totalItems`: cantidad total (se muestra en el `CartWidget` del NavBar, en tiempo real)
- `totalPrice`: precio total
- `isInCart(id)`

El carrito se persiste en `localStorage` bajo la clave `carrito_toque_artesano`.

## 📦 Formato de `productos.json`

Array plano de objetos:

```json
{
  "id": 1,
  "nombre": "...",
  "precio": 8000,
  "categoria": "🥐 Alfajores",
  "imagen": "/img/alfajor-de-maicena.jpg",
  "stock": 13
}
```

- `precio`: número (sin `$` ni puntos de miles). Un producto con precio `0` se muestra como "Consultar".
- `stock`: cantidad disponible (por ahora valores de prueba, a actualizar con el stock real).
- Los churros tienen un campo extra `subcategoria` ("Por unidad", "Por media docena", "Por docena").

## 🖼️ Imágenes

Las imágenes están en `public/img/` y se referencian desde `public/productos.json` y desde los componentes (`Header.jsx`, `Footer.jsx`, `Home.jsx`).

**Convención de nombres:** todo en minúsculas, sin espacios, con guiones (kebab-case), por ejemplo `churro-chocolate-ddl.png`. Vercel corre sobre Linux, donde las rutas distinguen mayúsculas y los espacios pueden fallar, así que conviene respetar esta regla al agregar archivos nuevos.

Las tarjetas del equipo del footer usan `equipo-sofia.jpg`, `equipo-juan.jpg` y `equipo-adrian.jpg`. Si el archivo no existe en `public/img/`, se muestra un avatar con las iniciales en lugar de una imagen rota.

## ☁️ Deploy

El proyecto incluye `netlify.toml` y `vercel.json` con las reglas de redirect necesarias para que las rutas de React Router funcionen al abrirlas directamente (fallback a `index.html`).

- **Vercel (usado actualmente):** repo conectado, framework detectado automáticamente como Vite.
- **Netlify:** build command `npm run build`, publish directory `dist`.

---

**Pre-entrega de Proyecto** — Juan Molina — 08/10/2026
