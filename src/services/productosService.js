// Los productos se leen del archivo local public/productos.json con fetch.
const URL_PRODUCTOS = "/productos.json";

// Leer todos los productos
export async function obtenerProductos() {
  const respuesta = await fetch(URL_PRODUCTOS);
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar productos.json (${respuesta.status})`);
  }
  return respuesta.json();
}

// Leer un producto por id.
// useParams devuelve el id como string y en el JSON es número,
// por eso se convierte con Number().
export async function obtenerProducto(id) {
  const productos = await obtenerProductos();
  return productos.find((p) => p.id === Number(id)) ?? null;
}

// Las funciones del panel admin quedan como "stubs" para que los imports
// de /admin no rompan la app. La versión con Firestore está en la rama
// version-firebase.
const NO_DISPONIBLE = "El panel admin no está disponible en esta versión.";

export async function agregarProducto() {
  throw new Error(NO_DISPONIBLE);
}

export async function editarProducto() {
  throw new Error(NO_DISPONIBLE);
}

export async function eliminarProducto() {
  throw new Error(NO_DISPONIBLE);
}