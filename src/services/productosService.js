import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const productosRef = collection(db, "productos");

// Leer todos los productos
export async function obtenerProductos() {
  const snapshot = await getDocs(productosRef);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Leer un producto por id
export async function obtenerProducto(id) {
  const snapshot = await getDoc(doc(db, "productos", id));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

// Agregar un producto nuevo
export async function agregarProducto(producto) {
  const nuevo = await addDoc(productosRef, producto);
  return nuevo.id;
}

// Editar un producto existente
export async function editarProducto(id, cambios) {
  await updateDoc(doc(db, "productos", id), cambios);
}

// Borrar un producto
export async function eliminarProducto(id) {
  await deleteDoc(doc(db, "productos", id));
}