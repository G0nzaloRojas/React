import { Link } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";
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
    <Card className="p-4 shadow-sm product-form-card">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>{isEditing ? "Editar Producto" : "Crear Nuevo Producto"}</h3>
        <Button as={Link} to="/admin/dashboard" variant="outline-secondary" size="sm">
          <FaArrowLeft className="me-1" /> Volver
        </Button>
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

        <Button type="submit" variant="primary" className="w-100" disabled={submitting}>
          <FaSave className="me-1" />
          {submitting ? "Guardando..." : isEditing ? "Guardar Cambios" : "Crear Producto"}
        </Button>
      </Form>
    </Card>
  );
};