import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Spinner, Alert, Badge } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { getProducts, deleteProduct } from "../../services/productService";

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id, nombre) => {
    const confirmar = window.confirm(`¿Seguro que querés eliminar "${nombre}"?`);
    if (!confirmar) return;

    try {
      await deleteProduct(id);
      toast.success("Producto eliminado correctamente");
      setProducts((prev) => prev.filter((prod) => prod.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Error al eliminar el producto");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando panel...</span>
        </Spinner>
      </div>
    );
  }

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Productos</h2>
        <Button as={Link} to="/admin/products/new" variant="success">
          <FaPlus className="me-1" /> Nuevo Producto
        </Button>
      </div>

      {products.length === 0 ? (
        <Alert variant="info">No hay productos cargados todavía.</Alert>
      ) : (
        <Table striped bordered hover responsive className="bg-white shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} className="align-middle">
                <td>
                  <img
                    src={prod.imagen}
                    alt={prod.nombre}
                    style={{ width: "55px", height: "55px", objectFit: "cover", borderRadius: "6px" }}
                  />
                </td>
                <td className="fw-semibold">{prod.nombre}</td>
                <td>
                  <Badge bg="secondary" className="text-capitalize">
                    {prod.categoria}
                  </Badge>
                </td>
                <td>${prod.precio}</td>
                <td>{prod.stock} u.</td>
                <td className="text-center">
                  <div className="d-flex justify-content-center gap-2">
                    <Button
                      as={Link}
                      to={`/admin/products/edit/${prod.id}`}
                      variant="warning"
                      size="sm"
                      title="Editar"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(prod.id, prod.nombre)}
                      title="Eliminar"
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};