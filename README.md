# Toque Artesano de Sofi — Pre-entrega React

Migración del sitio estático de **Toque Artesano de Sofi** a una SPA con **React + Vite**, `react-router-dom` y **Context API** para el carrito de compras.

## ⚠️ Antes de correrlo: falta cargar las imágenes

Este proyecto se generó sin acceso a las imágenes originales del sitio (`Logo.jpg`, `logo2.png`, `Logoico.ico` y las fotos de cada producto). Tenés que copiarlas a `public/img/` **con los mismos nombres** que aparecen en `src/data/productos.json` y en los componentes (`Header.jsx`, `Home.jsx`, `Footer.jsx`). Mientras tanto vas a ver los `alt` de las imágenes rotas — es esperado.

También agregué 3 tarjetas de "equipo" en el footer con fotos de ejemplo (`equipo-sofia.jpg`, `equipo-juan.jpg`, `equipo-adrian.jpg`) que tenés que reemplazar o quitar según corresponda.

## Instalación y uso

```bash
npm install
npm run dev       # entorno de desarrollo (http://localhost:5173)
npm run build      # build de producción en /dist
npm run preview    # sirve el build de /dist localmente
```

## Estructura de carpetas

```
src/
├── components/
│   ├── Layout/            # Layout.jsx -> Header + <Outlet/> + Footer
│   ├── Header/             # Logo + NavBar
│   ├── NavBar/              # Links con react-router-dom + CartWidget
│   ├── Footer/               # Info de la empresa + tarjetas del equipo
│   ├── CartWidget/            # Ícono de carrito con contador (usa CartContext)
│   ├── Home/                   # Vista de bienvenida ("/")
│   ├── ItemListContainer/       # Trae productos.json con fetch + useEffect ("/productos")
│   ├── Item/                     # Tarjeta de producto (recibe datos por props)
│   ├── ItemDetail/                # Detalle de un producto ("/producto/:id")
│   ├── Cart/                       # Vista del carrito ("/carrito")
│   └── Contacto/                    # Formulario de contacto (Formspree)
├── context/
│   └── CartContext.jsx    # Estado global del carrito (addToCart, removeFromCart, etc.)
├── data/
│   └── productos.json     # Catálogo (array plano) — fuente de datos original
├── style.css               # Hoja de estilos original del sitio (paleta azul pastel)
├── index.css                # Ajustes complementarios de layout
├── App.jsx                   # Rutas (BrowserRouter + Routes)
└── main.jsx                   # Punto de entrada

public/
├── img/                # Colocá acá las imágenes (ver aviso arriba)
└── productos.json      # Copia de src/data/productos.json para que funcione fetch()
```

> **Nota sobre `productos.json` duplicado:** `fetch()` en el navegador necesita un archivo servido como estático, por eso hay una copia en `public/productos.json`. `src/data/productos.json` es la fuente "canónica" pedida en la consigna. Si editás el catálogo, actualizá ambos (o cambiá `ItemListContainer`/`ItemDetail` para hacer `import productos from "../../data/productos.json"` en vez de `fetch`, si preferís evitar la duplicación).

## Rutas

| Ruta                       | Componente            | Descripción                                  |
|-----------------------------|------------------------|-----------------------------------------------|
| `/`                          | `Home`                  | Bienvenida + ofertas + reseñas                  |
| `/productos`                  | `ItemListContainer`      | Catálogo completo                                |
| `/categoria/:categoriaId`       | `ItemListContainer`      | Catálogo filtrado por categoría                    |
| `/producto/:id`                  | `ItemDetail`              | Detalle de un producto + agregar al carrito          |
| `/carrito`                         | `Cart`                     | Carrito de compras                                     |
| `/contacto`                          | `Contacto`                   | Formulario de contacto                                    |

## Carrito (Context API)

`CartContext` expone: `cart`, `addToCart(producto, cantidad)`, `removeFromCart(id)`, `updateQuantity(id, cantidad)`, `clearCart()`, `totalItems`, `totalPrice`, `isInCart(id)`. Persiste en `localStorage` bajo la clave `carrito_toque_artesano`.

## Conversión de `productos.json`

El JSON original agrupaba productos por categoría (y los churros además por subcategoría). Se aplanó a un array de objetos con:

```json
{ "id": 1, "nombre": "...", "precio": 8000, "categoria": "🥐 Alfajores", "imagen": "/img/...", "stock": 13 }
```

- `precio`: convertido a número (se quitaron `$` y puntos de miles). Los productos que en el original tenían solo `"$"` (sin precio definido) quedaron en `0` — en la UI se muestran como "Consultar".
- `stock`: no existía en el original, se generó aleatoriamente (3 a 15 unidades) para poder mostrar disponibilidad. **Reemplazalo por los valores reales** cuando los tengas.
- Los productos que estaban dentro de "Churros" (con subcategorías "Por unidad" / "Por media docena" / "Por docena") quedaron con un campo extra `subcategoria`.

## Deploy

Incluye `netlify.toml` y `vercel.json` con las reglas de redirect necesarias para que las rutas de React Router funcionen en producción (SPA fallback a `index.html`).

- **Netlify:** conectar el repo, build command `npm run build`, publish directory `dist`.
- **Vercel:** conectar el repo, framework detectado automáticamente como Vite.

Después de desplegar, compartí la URL pública junto con el link al repositorio de GitHub.
