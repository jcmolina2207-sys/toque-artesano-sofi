# Toque Artesano de Sofi

eCommerce de productos de pastelería artesanal (alfajores, churros, tortas, pastafrolas y más). Permite explorar el catálogo, buscar productos, armar un carrito y, para usuarios autenticados, administrar el catálogo desde un panel con operaciones CRUD.

**Demo online:** [https://toque-artesano-sofi-ten.vercel.app/](https://toque-artesano-sofi-ten.vercel.app/)

## Tecnologías

- React + Vite
- React Router
- Context API (carrito y autenticación)
- Firebase Authentication y Firestore
- React-Bootstrap (grilla y componentes responsivos)
- styled-components
- React Icons
- React Helmet Async (título y metas por página)

## Funcionalidades

- **Catálogo** con filtro por categoría, búsqueda en tiempo real y paginación.
- **Detalle de producto** con selección de cantidad.
- **Carrito de compras** (`CartContext`): agregar, eliminar y vaciar.
- **Autenticación** (`AuthContext`): login y registro con Firebase Authentication.
- **Rutas protegidas**: el panel de administración solo es accesible con sesión iniciada.
- **Panel de administración**: crear, editar y eliminar productos, con validaciones y modal de confirmación antes de eliminar.
- **Estados de carga y error**: spinners y mensajes si falla la comunicación con Firebase.
- **Diseño responsivo** para móvil, tablet y escritorio.
- **SEO básico** con título y metaetiquetas dinámicas por página.

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- npm
- Un proyecto de Firebase con **Authentication** (Email/Contraseña) y **Firestore** habilitados

## Instalación y ejecución local

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/jcmolina2207-sys/toque-artesano-sofi.git
   cd toque-artesano-sofi
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Crear el archivo de variables de entorno a partir del ejemplo:

   ```bash
   cp .env.example .env
   ```

   En Windows (PowerShell): `copy .env.example .env`

4. Completar el `.env` con los datos de tu proyecto de Firebase (ver la sección siguiente).

5. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   La app queda disponible en `http://localhost:5173`.

## Variables de entorno

Los valores se obtienen en la consola de Firebase, en **Configuración del proyecto > Tus apps > Configuración del SDK**.

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

> El archivo `.env` no se sube al repositorio. Solo se incluye `.env.example`, con las claves vacías.

## Configuración de Firebase

1. **Authentication:** habilitar el proveedor **Email/Contraseña**.
2. **Firestore:** crear la colección `productos` con documentos que tengan los campos `nombre`, `precio`, `categoria`, `imagen` y `stock`.
3. **Dominios autorizados:** si se despliega en otro dominio, agregarlo en *Authentication > Configuración > Dominios autorizados*. Sin esto el login no funciona online.

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Analiza el código con oxlint |

## Estructura del proyecto

```
src/
├── components/   Componentes de interfaz (Admin, Cart, Item, NavBar, etc.)
├── context/      AuthContext y CartContext
├── services/     Acceso a datos de Firestore
├── styles/       Estilos globales
├── utils/        Funciones auxiliares
├── firebase.js   Configuración de Firebase
└── main.jsx      Punto de entrada
```

## Despliegue

El proyecto está desplegado en Vercel. Para desplegar una copia propia:

1. Importar el repositorio en Vercel.
2. Cargar las variables de entorno `VITE_FIREBASE_*` en la configuración del proyecto.
3. Autorizar el dominio de Vercel en Firebase Authentication.

## Autor

Juan Molina - Proyecto final del curso de React, Talento Tech.
