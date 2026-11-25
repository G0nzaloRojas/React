import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Spinner, Alert } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { getProductById } from "../../services/productService";

export const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    getProductById(id)
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando producto...</span>
        </Spinner>
      </div>
    );
  }

  if (error) return <Alert variant="danger" className="m-4">{error}</Alert>;

  return (
    <Container className="my-4">
      {product ? (
        <>
          <Helmet>
            <title>Mi Tienda | {product.nombre}</title>
            <meta name="description" content={`Detalles y precio de ${product.nombre}`} />
          </Helmet>
          <ItemDetail product={product} />
        </>
      ) : (
        <Alert variant="warning">No se encontró el producto.</Alert>
      )}
    </Container>
  );
};