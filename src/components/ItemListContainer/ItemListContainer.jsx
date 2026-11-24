import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Item from "../Item/Item";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import { ITEMS_PER_PAGE, parsePage, normalize } from "../../utils/catalog";
import { Row, Col, Form } from "react-bootstrap";
import { obtenerProductos } from "../../services/productosService";
import { Helmet } from "react-helmet-async";

export default function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const catParam = searchParams.get("cat") ?? "todas";
  const requestedPage = parsePage(searchParams.get("page"));

    useEffect(() => {
    obtenerProductos()
      .then((data) => setProductos(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error(err);
        setError("No pudimos cargar los productos. Intentá nuevamente.");
      })
      .finally(() => setLoading(false));
  }, []);

  const categorias = useMemo(
    () => ["todas", ...new Set(productos.map((p) => p.categoria).filter(Boolean))],
    [productos]
  );

  const cat = categorias.includes(catParam) ? catParam : "todas";

    const filtrados = useMemo(() => {
    const term = normalize(q);
    return productos.filter((p) => {
      const coincideCat = cat === "todas" || p.categoria === cat;
      const textoBusqueda = normalize(
        `${p.nombre} ${p.categoria ?? ""} ${p.subcategoria ?? ""}`
      );
      const coincideTexto = !term || textoBusqueda.includes(term);
      return coincideCat && coincideTexto;
    });
  }, [productos, q, cat]);

  const totalPages = Math.max(1, Math.ceil(filtrados.length / ITEMS_PER_PAGE));
  const page = Math.min(requestedPage, totalPages);

  const productosPagina = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtrados.slice(start, start + ITEMS_PER_PAGE);
  }, [filtrados, page]);

  const updateParams = (changes, options) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      const vacio =
        value === "" ||
        value == null ||
        (key === "cat" && value === "todas") ||
        (key === "page" && value === 1);
      if (vacio) next.delete(key);
      else next.set(key, String(value));
    });
    setSearchParams(next, options);
  };

  const handleSearch = (texto) =>
    updateParams({ q: texto, page: 1 }, { replace: true });
  const handleCategory = (e) => updateParams({ cat: e.target.value, page: 1 });
  const handlePage = (n) => {
    const safe = Math.min(Math.max(1, n), totalPages);
    updateParams({ page: safe });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <p role="status">Cargando productos…</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <section>
      <Helmet>
    <title>Productos | Toque Artesano de Sofi</title>
    <meta
      name="description"
      content="Catálogo de alfajores, churros rellenos y delicias artesanales. Buscá por nombre o filtrá por categoría."
    />
  </Helmet>
      <Row className="g-2 mb-3 mx-auto justify-content-center" style={{ maxWidth: "700px" }}>
  <Col xs={12} md={8}>
    <SearchBar value={q} onChange={handleSearch} />
  </Col>
  <Col xs={12} md={4}>
    <Form.Select
      value={cat}
      onChange={handleCategory}
      aria-label="Filtrar por categoría"
    >
      {categorias.map((c) => (
        <option key={c} value={c}>
          {c === "todas" ? "Todas las categorías" : c}
        </option>
      ))}
    </Form.Select>
  </Col>
</Row>

      <p aria-live="polite">
        {filtrados.length} producto{filtrados.length !== 1 && "s"} · Página {page} de {totalPages}
      </p>

      {productosPagina.length === 0 ? (
        <p>No encontramos productos con esos filtros.</p>
      ) : (
        <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
  {productosPagina.map((p) => (
    <Col key={p.id}>
      <Item {...p} />
    </Col>
  ))}
</Row>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={handlePage} />
    </section>
  );
}