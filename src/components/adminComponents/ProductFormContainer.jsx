import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { createProduct, getProductById, updateProduct } from "../../services/productService";

export const ProductFormContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    stock: "",
    imagen: "",
    descripcion: "",
  });

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    getProductById(id)
      .then((prod) => {
        if (prod) {
          setFormData({
            nombre: prod.nombre || "",
            precio: prod.precio ?? "",
            categoria: prod.categoria || "",
            stock: prod.stock ?? "",
            imagen: prod.imagen || "",
            descripcion: prod.descripcion || "",
          });
        } else {
          setError("No se encontró el producto a editar.");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.nombre.trim() || !formData.categoria.trim() || Number(formData.precio) <= 0) {
      setError("Completá nombre, categoría y un precio mayor a 0.");
      return;
    }

    setSubmitting(true);

    const payload = {
      nombre: formData.nombre.trim(),
      precio: Number(formData.precio),
      categoria: formData.categoria.trim().toLowerCase(),
      stock: Number(formData.stock) || 0,
      imagen: formData.imagen.trim(),
      descripcion: formData.descripcion.trim(),
    };

    try {
      if (isEditing) {
        await updateProduct(id, payload);
        toast.success("Producto actualizado con éxito");
      } else {
        await createProduct(payload);
        toast.success("Producto creado con éxito");
      }
      navigate("/admin/products/success", { state: { isEditing, nombre: payload.nombre } });
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al guardar el producto.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <Card className="p-4 shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>{isEditing ? "Editar Producto" : "Crear Nuevo Producto"}</h3>
        <Button as={Link} to="/admin/dashboard" variant="outline-secondary" size="sm">
          <FaArrowLeft className="me-1" /> Volver
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre del producto</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            type="text"
            name="categoria"
            placeholder="Ej: electronica, ropa, accesorios"
            value={formData.categoria}
            onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
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