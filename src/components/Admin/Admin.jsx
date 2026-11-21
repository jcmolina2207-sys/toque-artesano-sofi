import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ProductoForm from "../ProductoForm/ProductoForm";
import {
  obtenerProductos,
  agregarProducto,
  editarProducto,
  eliminarProducto,
} from "../../services/productosService";
import "./Admin.css";

function Admin() {
  const { user } = useAuth();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [editando, setEditando] = useState(null); // null | "nuevo" | producto
  const [guardando, setGuardando] = useState(false);
  const [aviso, setAviso] = useState(null); // { texto, error }

  useEffect(() => {
    obtenerProductos()
      .then((data) => setProductos(data))
      .catch((err) => {
        console.error(err);
        setError("No pudimos cargar los productos.");
      })
      .finally(() => setCargando(false));
  }, []);
  // Al abrir el formulario (agregar o editar), subimos al principio de la página
useEffect(() => {
  if (editando) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}, [editando]);

  const categorias = [...new Set(productos.map((p) => p.categoria))];

  const handleGuardar = async (datos) => {
    setGuardando(true);
    setAviso(null);
    try {
      if (editando === "nuevo") {
        const id = await agregarProducto(datos);
        setProductos((prev) => [...prev, { id, ...datos }]);
        setAviso({ texto: "Producto agregado.", error: false });
      } else {
        await editarProducto(editando.id, datos);
        setProductos((prev) =>
          prev.map((p) => (p.id === editando.id ? { id: p.id, ...datos } : p))
        );
        setAviso({ texto: "Producto actualizado.", error: false });
      }
      setEditando(null);
    } catch (err) {
      console.error(err);
      setAviso({ texto: "No se pudo guardar el producto.", error: true });
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminar = async (producto) => {
    const confirmado = window.confirm(
      `¿Seguro que querés eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`
    );
    if (!confirmado) return;

    setAviso(null);
    try {
      await eliminarProducto(producto.id);
      setProductos((prev) => prev.filter((p) => p.id !== producto.id));
      setAviso({ texto: "Producto eliminado.", error: false });
    } catch (err) {
      console.error(err);
      setAviso({ texto: "No se pudo eliminar el producto.", error: true });
    }
  };

  if (cargando) {
    return <p className="cargando-mensaje">Cargando productos...</p>;
  }

  if (error) {
    return <p className="cargando-mensaje">{error}</p>;
  }

  return (
    <section className="admin">
      <h2 className="catalogo-titulo">Panel de administración</h2>
      <p className="admin-sesion">Sesión iniciada como: {user.email}</p>

      {aviso && (
        <p className={aviso.error ? "admin-error" : "admin-ok"}>{aviso.texto}</p>
      )}

      {editando ? (
        <>
          <h3>{editando === "nuevo" ? "Agregar producto" : "Editar producto"}</h3>
          <ProductoForm
            key={editando === "nuevo" ? "nuevo" : editando.id}
            inicial={editando === "nuevo" ? null : editando}
            categorias={categorias}
            onGuardar={handleGuardar}
            onCancelar={() => setEditando(null)}
            guardando={guardando}
          />
        </>
      ) : (
        <button
          type="button"
          className="item-boton"
          onClick={() => {
            setAviso(null);
            setEditando("nuevo");
          }}
        >
          Agregar producto
        </button>
      )}

      <div className="admin-tabla-wrap">
        <table className="admin-tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>${p.precio.toLocaleString("es-AR")}</td>
                <td>{p.stock}</td>
                <td className="admin-acciones">
                  <button
                    type="button"
                    className="admin-btn-secundario"
                    onClick={() => {
                      setAviso(null);
                      setEditando(p);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="admin-btn-peligro"
                    onClick={() => handleEliminar(p)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Admin;