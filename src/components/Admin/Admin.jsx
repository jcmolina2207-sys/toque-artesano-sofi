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
import ConfirmarEliminarModal from "../ConfirmarEliminarModal/ConfirmarEliminarModal";
import { Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { FaPlus, FaEdit, FaTrash, FaRedo } from "react-icons/fa";


// Tabla responsiva: en celular cada fila se convierte en una tarjeta
const TablaWrap = styled.div`
  margin-top: 1.5rem;
  overflow-x: auto;
`;

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;

  th,
  td {
    padding: 0.6rem;
    border-bottom: 1px solid #d7e5ef;
    text-align: left;
  }

  @media (max-width: 640px) {
    thead {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
    }

    table,
    tbody,
    tr,
    td {
      display: block;
    }

    tr {
      border: 1px solid #d7e5ef;
      border-radius: 10px;
      margin-bottom: 0.8rem;
      padding: 0.3rem 0;
    }

    td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      border-bottom: none;
      text-align: right;
    }

    td::before {
      content: attr(data-label);
      font-weight: 700;
      color: #072f42;
      text-align: left;
    }
  }
`;

const Acciones = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

function Admin() {
  const { user } = useAuth();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [editando, setEditando] = useState(null); // null | "nuevo" | producto
  const [guardando, setGuardando] = useState(false);
  const [aviso, setAviso] = useState(null); // { texto, error }
  const [aEliminar, setAEliminar] = useState(null); // producto pendiente de confirmar
  const [eliminando, setEliminando] = useState(false);

  const cargarProductos = () => {
  setCargando(true);
  setError("");
  obtenerProductos()
    .then((data) => setProductos(data))
    .catch((err) => {
      console.error(err);
      setError("No pudimos cargar los productos.");
    })
    .finally(() => setCargando(false));
};

useEffect(() => {
  cargarProductos();
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

  const confirmarEliminar = async () => {
  setEliminando(true);
  setAviso(null);
  try {
    await eliminarProducto(aEliminar.id);
    setProductos((prev) => prev.filter((p) => p.id !== aEliminar.id));
    setAviso({ texto: "Producto eliminado.", error: false });
  } catch (err) {
    console.error(err);
    setAviso({ texto: "No se pudo eliminar el producto.", error: true });
  } finally {
    setEliminando(false);
    setAEliminar(null);
  }
};

  if (cargando) {
  return (
    <div className="text-center my-5" role="status" aria-live="polite">
      <Spinner animation="border" variant="primary" />
      <p className="mt-2 mb-0">Cargando productos...</p>
    </div>
  );
}

  if (error) {
  return (
    <div className="text-center my-5" role="alert">
      <p>{error}</p>
      <button type="button" className="item-boton" onClick={cargarProductos}>
        <FaRedo aria-hidden="true" /> Reintentar
      </button>
    </div>
  );
}

  return (
    <section className="admin">
      <Helmet>
        <title>Panel de administración | Toque Artesano de Sofi</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <h2 className="catalogo-titulo">Panel de administración</h2>
      <p className="admin-sesion">Sesión iniciada como: {user.email}</p>

{aviso && (
  <p
    role="alert"
    className={aviso.error ? "admin-error" : "admin-ok"}
  >
    {aviso.texto}
  </p>
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
          <FaPlus aria-hidden="true" /> Agregar producto
        </button>
      )}

      <TablaWrap>
        <Tabla>
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
                <td data-label="Nombre">{p.nombre}</td>
                <td data-label="Categoría">{p.categoria}</td>
                <td data-label="Precio">${Number(p.precio ?? 0).toLocaleString("es-AR")}</td>
                <td data-label="Stock">{p.stock}</td>
                <td data-label="Acciones">
                  <Acciones>
                  <button
                    type="button"
                    className="admin-btn-secundario"
                    onClick={() => {
                      setAviso(null);
                      setEditando(p);
                    }}
                  >
                    <FaEdit aria-hidden="true" /> Editar
                  </button>
                  <button
                    type="button"
                    className="admin-btn-peligro"
                    onClick={() => setAEliminar(p)}
                  >
                    <FaTrash aria-hidden="true" /> Eliminar
                  </button>
                  </Acciones>
                </td>
              </tr>
            ))}
          </tbody>
        </Tabla>
      </TablaWrap>
      <ConfirmarEliminarModal
  producto={aEliminar}
  eliminando={eliminando}
  onConfirmar={confirmarEliminar}
  onCancelar={() => !eliminando && setAEliminar(null)}
/>
    </section>
  );
}

export default Admin;