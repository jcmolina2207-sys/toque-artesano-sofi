import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

// Barra de búsqueda reutilizable. El filtrado en tiempo real lo hace el
// componente padre: acá solo avisamos cada vez que cambia el texto.
function SearchBar({
  value,
  onChange,
  placeholder = "Buscar producto…",
  maxLength = 50,
}) {
  return (
    <InputGroup>
      <InputGroup.Text>
        <FaSearch aria-hidden="true" />
      </InputGroup.Text>
      <Form.Control
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Buscar producto"
        maxLength={maxLength}
      />
    </InputGroup>
  );
}

export default SearchBar;
