import { Modal, Button } from "react-bootstrap";

function ConfirmarEliminarModal({ producto, eliminando, onConfirmar, onCancelar }) {
  return (
    <Modal show={!!producto} onHide={onCancelar} centered>
      <Modal.Header closeButton={!eliminando}>
        <Modal.Title>Eliminar producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Seguro que querés eliminar <strong>{producto?.nombre}</strong>? Esta
        acción no se puede deshacer.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancelar} disabled={eliminando}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirmar} disabled={eliminando}>
          {eliminando ? "Eliminando..." : "Eliminar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmarEliminarModal;