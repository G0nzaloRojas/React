import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { ItemList } from "../ItemList/ItemList";
import { getByCategory } from "../../services/productService";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { category } = useParams();

  useEffect(() => {
    getByCategory(category)
      .then((data) => {
        setProducts(data);
        setErrors(null);
      })
      .catch((error) => setErrors(error.message))
      .finally(() => setLoading(false));
  }, [category]);

  const filteredProducts = products.filter((prod) =>
    prod.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  if (errors) return <Alert variant="danger" className="m-4">{errors}</Alert>;

  return (
    <Container className="my-4">
      <h1 className="mb-4 text-capitalize">{category ? category : "Productos"}</h1>

      <Row className="mb-4">
        <Col xs={12} md={6}>
          <div className="input-group">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar productos por nombre"
            />
          </div>
        </Col>
      </Row>

      <ItemList products={filteredProducts} />
    </Container>
  );
};
