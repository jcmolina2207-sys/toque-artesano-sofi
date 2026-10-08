# Toque Artesano de Sofi — Pre-entrega React

Migración del sitio estático de **Toque Artesano de Sofi** a una SPA con **React + Vite**, `react-router-dom` y **Context API** para el carrito de compras.

- **Sitio online:** https://toque-artesano-sofi-ten.vercel.app
- **Repositorio:** https://github.com/jcmolina2207-sys/toque-artesano-sofi

## Imágenes

Las imágenes están en `public/img/` y se referencian desde `public/productos.json` y desde los componentes (`Header.jsx`, `Footer.jsx`, `Home.jsx`).

**Convención de nombres:** todo en minúsculas, sin espacios, con guiones (kebab-case), por ejemplo `churro-chocolate-ddl.png`. Vercel corre sobre Linux, donde las rutas distinguen mayúsculas y los espacios pueden fallar, así que conviene respetar esta regla al agregar archivos nuevos.

Las tarjetas del equipo del footer usan `equipo-sofia.jpg`, `equipo-juan.jpg` y `equipo-adrian.jpg`. Si el archivo no existe en `public/img/`, se muestra un avatar con las iniciales en lugar de una imagen rota.

## Instalación y uso

```bash
npm install
npm run dev       # entorno de desarrollo (http://localhost:5173)
npm run build     # build de producción en /dist
npm run preview   # sirve el build de /dist localmente
```

## Estructura de carpetas

```
src/
├── components/
│   ├── Layout/              # Layout.jsx -> Header + <Outlet/> + Footer
│   ├── Header/              # Logo + NavBar
│   ├── NavBar/              # Links con react-router-dom + CartWidget
│   ├── Footer/              # Info de la empresa + tarjetas del equipo
│   ├── CartWidget/          # Ícono de carrito con contador (usa CartContext)
│   ├── Home/                # Vista de bienvenida ("/")
│   ├── ItemListContainer/   # Trae productos.json con fetch + useEffect ("/productos")
│   ├── Item/                # Tarjeta de producto (recibe datos por props)
│   ├── ItemDetail/          # Detalle de un producto ("/producto/:id")
│   ├── Cart/                # Vista del carrito ("/carrito")
│   └── Contacto/            # Formulario de contacto (Formspree)
├── context/
│   └── CartContext.jsx      # Estado global del carrito (addToCart, removeFromCart, etc.)
├── style.css                # Hoja de estilos original del sitio (paleta azul pastel)
├── index.css                # Ajustes complementarios de layout
├── App.jsx                  # Rutas (BrowserRouter + Routes)
└── main.jsx                 # Punto de entrada

public/
├── img/                     # Imágenes del sitio (nombres en kebab-case)
└── productos.json           # Catálogo, leído con fetch("/productos.json")
```

> **Fuente única de datos:** el catálogo vive solo en `public/productos.json`. Todos los componentes lo leen con `fetch`, por lo que no hay copias que mantener sincronizadas.

## Rutas

| Ruta                      | Componente          | Descripción                                   |
|---------------------------|---------------------|-----------------------------------------------|
| `/`                       | `Home`              | Bienvenida + ofertas + reseñas                |
| `/productos`              | `ItemListContainer` | Catálogo completo                             |
| `/categoria/:categoriaId` | `ItemListContainer` | Catálogo filtrado por categoría               |
| `/producto/:id`           | `ItemDetail`        | Detalle de un producto + agregar al carrito   |
| `/carrito`                | `Cart`              | Carrito de compras                            |
| `/contacto`               | `Contacto`          | Formulario de contacto                        |

## Carrito (Context API)

`CartContext` expone: `cart`, `addToCart(producto, cantidad)`, `removeFromCart(id)`, `updateQuantity(id, cantidad)`, `clearCart()`, `totalItems`, `totalPrice`, `isInCart(id)`. Persiste en `localStorage` bajo la clave `carrito_toque_artesano`.

## Formato de `productos.json`

Array plano de objetos:

```json
{ "id": 1, "nombre": "...", "precio": 8000, "categoria": "🥐 Alfajores", "imagen": "/img/alfajor-de-maicena.jpg", "stock": 13 }
```

- `precio`: número (sin `$` ni puntos de miles). Un producto con precio `0` se muestra como "Consultar".
- `stock`: cantidad disponible de cada producto (por ahora valores de prueba, a actualizar con el stock real).
- Los churros tienen un campo extra `subcategoria` ("Por unidad", "Por media docena", "Por docena").

## Deploy

El proyecto incluye `netlify.toml` y `vercel.json` con las reglas de redirect necesarias para que las rutas de React Router funcionen al abrirlas directamente (fallback a `index.html`).

- **Vercel (usado actualmente):** repo conectado, framework detectado automáticamente como Vite.
- **Netlify:** build command `npm run build`, publish directory `dist`.
