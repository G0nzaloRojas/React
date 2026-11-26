import { Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import "./ProductFormContainer.css";

export const ProductFormUI = ({
  formData,
  isEditing,
  submitting,
  error,
  onChange,
  onSubmit,
}) => {
  return (
    <section className="dashboard" style={{ maxWidth: "680px" }}>
      <div className="dashboard-header">
        <h2>{isEditing ? "Editar Producto" : "Nuevo Producto"}</h2>
        <div className="header-actions">
          <Link to="/admin/dashboard" className="btn btn-secondary">
            <FaArrowLeft className="me-1" /> Volver
          </Link>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre del producto</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            type="text"
            name="categoria"
            placeholder="Ej: hogar, electronica, ropa"
            value={formData.categoria}
            onChange={onChange}
            required
          />
        </Form.Group>

        <div className="row">
          <div className="col-md-6 mb-3">
            <Form.Label>Precio ($)</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              min="1"
              value={formData.precio}
              onChange={onChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <Form.Label>Stock disponible</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              min="0"
              value={formData.stock}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>URL de la imagen</Form.Label>
          <Form.Control
            type="url"
            name="imagen"
            placeholder="https://..."
            value={formData.imagen}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="descripcion"
            value={formData.descripcion}
            onChange={onChange}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="w-100"
          style={{ marginLeft: 0 }}
          disabled={submitting}
        >
          <FaSave className="me-1" />
          {submitting ? "Guardando..." : isEditing ? "Guardar Cambios" : "Crear Producto"}
        </Button>
      </Form>
    </section>
  );
};