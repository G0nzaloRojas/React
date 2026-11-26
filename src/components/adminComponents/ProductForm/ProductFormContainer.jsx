import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { createProduct, getProductById, updateProduct } from "../../../services/productService";
import { ProductFormUI } from "./ProductFormUI";

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
      let productId = id;

      if (isEditing) {
        await updateProduct(id, payload);
        toast.success("Producto actualizado con éxito");
      } else {
        productId = await createProduct(payload);
        toast.success("Producto creado con éxito");
      }

      navigate(`/admin/products/success/${productId}`, {
        state: { isEditing, nombre: payload.nombre },
      });
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
    <ProductFormUI
      formData={formData}
      isEditing={isEditing}
      submitting={submitting}
      error={error}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};