import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Nav = styled.nav`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin: 2rem 0;
`;

const PageButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.9rem;
  border: 1px solid #072f42;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  background: ${({ $active }) => ($active ? "#072f42" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#072f42")};

  &:hover:not(:disabled) {
    background: ${({ $active }) => ($active ? "#072f42" : "#d4dee2")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid #0a66ff;
    outline-offset: 2px;
  }

  @media (max-width: 480px) {
    padding: 0.45rem 0.7rem;
    font-size: 0.9rem;
  }
`;

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Nav aria-label="Paginación de productos">
      <PageButton
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Página anterior"
      >
        <FaChevronLeft aria-hidden="true" /> Anterior
      </PageButton>

      {pages.map((n) => (
        <PageButton
          key={n}
          type="button"
          onClick={() => onPageChange(n)}
          aria-current={n === page ? "page" : undefined}
          aria-label={`Ir a la página ${n}`}
          $active={n === page}
        >
          {n}
        </PageButton>
      ))}

      <PageButton
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Página siguiente"
      >
        Siguiente <FaChevronRight aria-hidden="true" />
      </PageButton>
    </Nav>
  );
}
