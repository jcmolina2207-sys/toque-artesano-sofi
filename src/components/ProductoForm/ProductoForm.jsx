import { useState } from "react";
import { Spinner } from "react-bootstrap";

const VACIO = { nombre: "", precio: "", categoria: "", imagen: "", stock: "" };

function ProductoForm({ inicial, categorias, onGuardar, onCancelar, guardando }) {
  const [valores, setValores] = useState(
    inicial
      ? {
          nombre: inicial.nombre,
          precio: String(inicial.precio),
          categoria: inicial.categoria,
          imagen: inicial.imagen,
          stock: String(inicial.stock ?? ""),
        }
      : VACIO
  );
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    const nuevos = {};
    const precio = Number(valores.precio);
    const stock = Number(valores.stock);

    if (!valores.nombre.trim()) {
      nuevos.nombre = "El nombre es obligatorio.";
    }
    if (valores.precio === "" || isNaN(precio) || precio <= 0) {
      nuevos.precio = "El precio debe ser mayor que cero.";
    }
    if (!valores.categoria.trim()) {
      nuevos.categoria = "La categoría es obligatoria.";
    }
    if (!valores.imagen.trim()) {
      nuevos.imagen = "La imagen es obligatoria.";
    }
    if (valores.stock === "" || !Number.isInteger(stock) || stock < 0) {
      nuevos.stock = "El stock debe ser un número entero, 0 o más.";
    }
    return nuevos;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    onGuardar({
      nombre: valores.nombre.trim(),
      precio: Number(valores.precio),
      categoria: valores.categoria.trim(),
      imagen: valores.imagen.trim(),
      stock: Number(valores.stock),
    });
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="nombre">Nombre</label>
      <input
        id="nombre"
        name="nombre"
        value={valores.nombre}
        onChange={handleChange}
      />
      {errores.nombre && <p className="admin-error">{errores.nombre}</p>}

      <label htmlFor="precio">Precio</label>
      <input
        id="precio"
        name="precio"
        type="number"
        value={valores.precio}
        onChange={handleChange}
      />
      {errores.precio && <p className="admin-error">{errores.precio}</p>}

      <label htmlFor="categoria">Categoría</label>
      <input
        id="categoria"
        name="categoria"
        list="lista-categorias"
        value={valores.categoria}
        onChange={handleChange}
      />
      <datalist id="lista-categorias">
        {categorias.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
      {errores.categoria && <p className="admin-error">{errores.categoria}</p>}

      <label htmlFor="imagen">Imagen (ruta, ej: /img/alfajor.jpg)</label>
      <input
        id="imagen"
        name="imagen"
        value={valores.imagen}
        onChange={handleChange}
      />
      {errores.imagen && <p className="admin-error">{errores.imagen}</p>}

      <label htmlFor="stock">Stock</label>
      <input
        id="stock"
        name="stock"
        type="number"
        value={valores.stock}
        onChange={handleChange}
      />
      {errores.stock && <p className="admin-error">{errores.stock}</p>}

      <div className="admin-form-botones">
        <button type="submit" className="item-boton" disabled={guardando}>
          {guardando ? (
            <>
              <Spinner as="span" animation="border" size="sm" className="me-2" />
              Guardando...
            </>
          ) : (
            "Guardar"
          )}
        </button>

        {onCancelar && (
          <button
            type="button"
            className="admin-btn-secundario"
            onClick={onCancelar}
            disabled={guardando}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductoForm;
